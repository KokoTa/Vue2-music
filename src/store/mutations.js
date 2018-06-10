import types from './mutation-type';

const mutations = {
  [types.SET_SINGER](state, singer) { // 设置当前选中的歌手
    state.singer = singer;
  },
  [types.SET_SONGS](state, songs) { // 设置歌手的歌曲集合
    state.songs = songs;
  },
  [types.SET_PLAYING_STATE](state, flag) { // 开始/暂停
    state.playing = flag;
  },
  [types.SET_FULL_SCREEN](state, flag) { // 全屏
    state.fullScreen = flag;
  },
  [types.SET_PLAYLIST](state, list) { // 播放列表
    state.playList = list;
  },
  [types.SET_SEQUENCELIST](state, list) { // 顺序列表
    state.sequenceList = list;
  },
  [types.SET_PLAY_MODE](state, mode) { // 播放模式
    state.mode = mode;
  },
  [types.SET_CURRENT_INDEX](state, index) { // 当前歌曲索引
    state.currentIndex = index;
  },
  [types.SET_SEARCH_HISTORY](state, history) { // 当前歌曲索引
    state.searchHistory = history;
  },
};

export default mutations;
