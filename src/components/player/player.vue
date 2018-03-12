<template>
  <div class="player" v-if="playList.length">
    <!-- 全屏播放页 -->
    <transition name="full">
      <div class="player-full" v-show="fullScreen">
        <!-- 背景 -->
        <div class="background">
          <img class="background-img" :src="currentSong.alPic" alt="#">
        </div>
        <!-- 顶部 -->
        <div class="top">
          <div class="back" @click="toggleFullScreen">
            <i class="fas fa-angle-left fa-3x icon-back"></i>
          </div>
          <h1 class="title">{{ currentSong.songName }}</h1>
          <h2 class="subtitle">{{ currentSong.singerName }}</h2>
        </div>
        <!-- 中部 -->
        <div class="middle">
          <div class="rotate-img" :class="playRotate">
            <img :src="currentSong.alPic" alt="#">
          </div>
          <div class="lyric-wrapper">
            <p class="lyric">awoeof naowenf eo dasd</p>
          </div>
        </div>
        <!-- 底部 -->
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot active"></span>
            <span class="dot"></span>
          </div>
          <div class="process-wrapper">
            <span class="time time-left">
              {{ formatTime(currentTime) }}
            </span>
            <div class="process-package">
              <progress-bar :percent="percent"
              @percentChange="percentChange">
              </progress-bar>
            </div>
            <span class="time time-right">
              {{ formatTime(totalTime) }}
            </span>
          </div>
          <div class="operation-wrapper">
            <div class="icon right">
              <i @click="changeMode" class="fas fa-2x" :class="modeIcon"></i>
            </div>
            <div class="icon">
              <i @click="prevSong" class="fas fa-backward fa-2x"></i>
            </div>
            <div class="icon">
              <i @click="togglePlay" class="fas fa-4x" :class="playIcon"></i>
            </div>
            <div class="icon">
              <i @click="nextSong" class="fas fa-forward fa-2x"></i>
            </div>
            <div class="icon left">
              <i class="far fa-heart fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 迷你播放器 -->
    <transition name="mini">
      <div class="player-mini" v-show="!fullScreen" @click="toggleFullScreen">
        <div class="icon">
          <img class="icon-img" :class="playRotate" :src="currentSong.alPic" alt="#">
        </div>
        <div class="text">
          <h2 class="title">{{ currentSong.songName }}</h2>
          <h2 class="subtitle">{{ currentSong.singerName }}</h2>
        </div>
        <div class="control">
          <progress-circle :radius="35" :percent="percent">
            <i @click.stop="togglePlay" class="fas fa-2x play-icon" :class="playIcon"></i>
          </progress-circle>
        </div>
        <div class="control">
          <i class="fas fa-music fa-2x"></i>
        </div>
      </div>
    </transition>
    <!-- 播放器 -->
    <audio :src="currentSong.url"
    ref="audio"
    @timeupdate="timeUpdate"
    @ended="songEnd"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import ProgressBar from '@/base/progress-bar/progress-bar';
import ProgressCircle from '@/base/progress-circle/progress-circle';
import playMode from '@/common/js/config'; // 播放模式
import shuffle from '@/common/js/shuffle'; // 洗牌
import getLyric from '@/common/js/getLyric'; // 获取歌词
import Lyric from '@/common/js/lyricParse'; // 解析歌词

export default {
  name: 'player',
  components: {
    ProgressBar,
    ProgressCircle,
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList',
    ]),
    playIcon() {
      if (this.playing) {
        return 'fa-pause-circle';
      }
      return 'fa-play-circle';
    },
    playRotate() {
      if (this.playing) {
        return 'rotate-animation';
      }
      return 'rotate-animation rotate-animation-pause';
    },
    percent() {
      return this.currentTime / this.totalTime;
    },
    modeIcon() {
      if (this.mode === playMode.sequence) return 'fa-exchange-alt';
      if (this.mode === playMode.loop) return 'fa-sync-alt';
      return 'fa-random';
    },
  },
  data() {
    return {
      currentTime: '0:00', // 音乐当前时间
      totalTime: '0:00', // 音乐总时间
    };
  },
  methods: {
    toggleFullScreen() {
      this.SET_FULL_SCREEN(!this.fullScreen);
    },
    togglePlay() {
      const audio = this.$refs.audio;
      this.SET_PLAYING_STATE(!this.playing);
      if (this.playing) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    prevSong() {
      // 切歌太快会使audio来不及暂停并加载新音乐，导致新音乐播放时play事件报错
      // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
      const audio = this.$refs.audio;
      const play = audio.play();
      if (play !== undefined) {
        play.then(() => {
          audio.pause(); // 安全暂停

          let index = this.currentIndex - 1;
          if (index === -1) {
            index = this.playList.length - 1;
          }
          this.SET_CURRENT_INDEX(index);
        });
      }
    },
    nextSong() {
      const audio = this.$refs.audio;
      const play = audio.play();
      if (play !== undefined) {
        play.then(() => {
          audio.pause(); // 安全暂停

          let index = this.currentIndex + 1;
          if (index === this.playList.length) {
            index = 0;
          }
          this.SET_CURRENT_INDEX(index);
        });
      }
    },
    timeUpdate(e) {
      this.currentTime = e.target.currentTime; // 可读写
      this.totalTime = e.target.duration;
    },
    formatTime(t) {
      // t以秒为单位，|等于调用了Math.floor
      const x = t | 0;
      let h = x / 60 / 60 | 0;
      let m = x / 60 | 0;
      let s = x % 60 | 0;
      // 补0
      if (h > 0 && m < 10) {
        m = `0${m}:`;
      } else {
        m = `${m}:`;
      }
      h = h === 0 ? '' : `${h}:`;
      s = s < 10 ? `0${s}` : s;
      return `${h}${m}${s}`;
    },
    percentChange(newPercent) {
      this.$refs.audio.currentTime = this.totalTime * newPercent;
    },
    changeMode() {
      const mode = (this.mode + 1) % 3;
      this.SET_PLAY_MODE(mode);

      let list = [];
      if (this.mode === playMode.sequence || this.mode === playMode.loop) {
        list = this.sequenceList;
      } else {
        list = shuffle(this.sequenceList);
      }

      this.resetCurrentIndex(list);
      this.SET_PLAYLIST(list);
    },
    resetCurrentIndex(list) { // 更新索引
      const index = list.findIndex((item) => {
        const b = item.songName === this.currentSong.songName;
        return b;
      });
      this.SET_CURRENT_INDEX(index);
    },
    songEnd() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.nextSong();
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      this.SET_PLAYING_STATE(true);
    },
    ...mapMutations([
      'SET_FULL_SCREEN',
      'SET_PLAYING_STATE',
      'SET_CURRENT_INDEX',
      'SET_PLAY_MODE',
      'SET_PLAYLIST',
    ]),
  },
  watch: {
    currentSong(newSong, oldSong) {
      console.log(newSong, oldSong);
      // 插件刚开始时并没有oldSong，会报错
      // 阻止暂停后切歌会播放歌曲
      if (oldSong && (newSong.songName === oldSong.songName)) return;

      this.$nextTick(() => { // 更新了资源，需要等待DOM更新
        this.SET_PLAYING_STATE(true);
        this.$refs.audio.play();
      });

      // 获取歌词
      getLyric(newSong.id).then((res) => {
        const L = new Lyric(res);
        L.play();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.player {
  .player-full {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    color: $color-text;
    .background {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      background: $color-background;
      .background-img {
        height: 100%;
        width: 100%;
        filter: blur(20px);
      }
    }
    .top {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .back {
        position: absolute;
        top: 0;
        left: 0;
        .icon-back {
          width: 1.12rem;
          line-height: 1.12rem;
          text-align: center;
          color: $color-theme;
        }
      }
      .title {
        line-height: 1.12rem;
        @include font-dpr($font-size-large);
        width: 80%;
        margin: 0 auto;
        text-align: center;
        @include no-wrap;
      }
      .subtitle {
        line-height: .56rem;
        @include font-dpr($font-size-medium);
        text-align: center;
      }
    }
    .middle {
      position: absolute;
      width: 100%;
      top: 2.133333rem;
      bottom: 4rem;
      .rotate-img {
        position: relative;
        width: 80%;
        margin: 0 auto;
        img {
          box-sizing: border-box;
          width: 100%;
          border-radius: 50%;
          border: .266667rem solid rgba(255, 255, 255, .1);
        }
      }
      .lyric-wrapper {
        text-align: center;
        margin: .8rem .533333rem;
        .lyric {
          line-height: .48rem;
          @include font-dpr($font-size-large);
          @include no-wrap;
          color: $color-text-l;
        }
      }
    }
    .bottom {
      position: absolute;
      width: 100%;
      bottom: 1.6rem;
      .dot-wrapper {
        text-align: center;
        .dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: $color-text-d;
          border-radius: 50%;
          margin: 0 .133333rem;
          &.active {
            width: .533333rem;
            border-radius: .266667rem;
            background: $color-text-l;
          }
        }
      }
      .process-wrapper {
        width: 80%;
        margin: 0 auto;
        display: flex;
        padding: .266667rem 0;
        align-items: center;
        .time {
          display: inline-block;
          color: $color-text;
          @include font-dpr($font-size-small);
          width: .8rem;
          line-height: .533333rem;
          &.time-left {
            text-align: left;
          }
          &.time-right {
            text-align: right;
          }
        }
        .process-package {
          flex: 1;
        }
      }
      .operation-wrapper {
        display: flex;
        .icon {
          flex: 1;
          text-align: center;
          &.right {
            text-align: right;
          }
          &.left {
            text-align: left;
          }
          i {
            color: $color-theme;
            line-height: 1.066667rem;
          }
        }
      }
    }
  }
  .player-mini {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.6rem;
    background: $color-highlight-background;
    z-index: 999;
    display: flex;
    align-items: center;
    .icon {
      width: 1.066667rem;
      height: 1.066667rem;
      line-height: 1.6rem;
      padding: 0 .266667rem 0 .533333rem;
      .icon-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .text {
      flex: 1;
      .title {
        @include font-dpr($font-size-medium);
        color: $color-text;
        margin-bottom: .133333rem;
      }
      .subtitle {
        @include font-dpr($font-size-small);
        color: $color-text-d;
      }
    }
    .control {
      width: 1.066667rem;
      color: $color-theme;
      .play-icon {
        position: absolute;
        left: .14rem;
        top: .15rem;
      }
    }
  }
  .rotate-animation {
    animation: rotate 10s linear infinite;
    &.rotate-animation-pause {
      animation-play-state: paused;
    }
  }
}

// 全屏播放页过渡
.full-enter-active, .full-leave-active {
  transition: all .5s;
  .top, .bottom {
    transition: all .5s;
  }
  .middle {
    transition: all .5s;
  }
}
.full-enter, .full-leave-to {
  opacity: 0;
  .top {
    transform: translateY(-100%);
  }
  .bottom {
    transform: translateY(100%);
  }
  .middle {
    transform: translate(-40%, 100%) scale(0);
  }
}

// 迷你播放器过渡
.mini-enter-active, .mini-leave-active {
  transition: all .5s;
}
.mini-enter, .mini-leave-to {
  transform: translateY(100%);
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

