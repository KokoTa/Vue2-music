import playMode from '@/common/js/config';
import cache from '@/common/js/cache';

const state = {
  singer: {}, // 某歌手的信息
  songs: [], // 歌曲信息集合
  playing: false, // 播放器播放/暂停
  fullScreen: false, // 播放器是否全屏
  playList: [], // 播放列表（和顺序播放列表不同，播放模式可能是无序的）
  sequenceList: [], // 顺序播放列表（用于显示）
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放索引
  searchHistory: cache.getHistory(), // 搜索历史
};

export default state;
