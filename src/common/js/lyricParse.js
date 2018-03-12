// 网易云歌词解析器
// 示例如下
// [00:00.00] 作曲 : 薛之谦
// [00:01.00] 作词 : 薛之谦
// [00:04.200]
// [00:21.120]简单点说话的方式简单点
// [00:28.560]
// [00:30.200]递进的情绪请省略
// [00:33.640]你又不是个演员
// [00:36.380]别设计那些情节

// 解析时间
const timeParseReg = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

// 歌词播放的两种状态
const PAUSE = 0;
const PLAYING = 1;

function defaultHandle(obj) {
  console.log(obj);
}

export default class Lyric {
  constructor(lyr, handle = defaultHandle) {
    this.lyr = lyr; // 歌词
    this.handle = handle; // 回调
    this.state = PLAYING; // 歌词播放状态
    this.curNum = 0; // 当前行索引
    this.lines = []; // 解析后的歌词集合
    this.startStamp = 0; // 某行歌词时间戳（可能是这行歌词开始的时间，也可能是这行歌词唱了一段时间后的时间）
    this.init();
  }

  // 初始化
  init() {
    this.initLines();
  }

  // 初始化歌词
  initLines() {
    const lines = this.lyr.split('\n');
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const timeStamp = timeParseReg.exec(line); // 解析时间

      if (timeStamp) {
        const txt = line.replace(timeParseReg, '').trim(); // 单行纯歌词
        if (txt) {
          this.lines.push({
            time: (timeStamp[1] * 60 * 1000) +
              (timeStamp[2] * 1000) +
              ((timeStamp[3] || 0) * 10), // 获得时间戳
            txt,
          });
        }
      }
    }

    this.lines.sort((a, b) => a.time - b.time);
  }

  // 获得当前歌词行
  findCurNum(time) {
    for (let i = this.lines.length - 1; i >= 0; i -= 1) { // 倒着找
      if (time >= this.lines[i].time) {
        return i;
      }
    }
    return this.lines.length - 1;
  }

  // 歌词回调
  callHandle(i) {
    if (i < 0 || i > this.lines.length) {
      return false;
    }
    this.handle({
      txt: this.lines[i].txt,
      curNum: i,
    });
    return true;
  }

  // 歌词跳转
  playReset() {
    const line = this.lines[this.curNum];
    const delay = line.time - this.startStamp; // 时间差（startStamp针对的是play方法）
    this.startStamp = line.time; // 针对完play方法后"步入正轨"，按歌词集合的时间差播放

    this.timer = setTimeout(() => {
      this.callHandle(this.curNum);
      this.curNum += 1;
      if (this.curNum < this.lines.length && this.state === PLAYING) {
        this.playReset();
      }
    }, delay);
  }

  // 播放(start单位为毫秒)
  play(start = 0) {
    if (!this.lines.length) {
      return false;
    }

    this.state = PLAYING; // 执行播放
    this.curNum = this.findCurNum(start); // 找到歌词行
    this.startStamp = start; // 歌词要开始的时间戳(注意它不一定和歌词集合的时间戳完全对应，比如这条歌词我放一半暂停了，再继续播放时的时间戳肯定不对应啊)

    if (this.curNum < this.lines.length) {
      clearTimeout(this.timer);
      this.playReset();
    }

    return true;
  }

  // 播放状态切换
  togglePlay(time) {
    if (this.state === PLAYING) {
      this.stop();
    } else {
      this.state = PLAYING;
      this.play(time);
    }
  }

  // 停止
  stop() {
    this.state = PAUSE;
    clearTimeout(this.timer);
  }
}