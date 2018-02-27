import types from './mutation-type';

const mutations = {
  [types.SET_SINGER](state, singer) { // 设置当前选中的歌手
    state.singer = singer;
  },
  [types.SET_SONGS](state, songs) { // 设置歌手的歌曲集合
    state.songs = songs;
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag;
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag;
  },
  [types.SET_PLAYLIST](state, list) {
    state.playList = list;
  },
  [types.SET_SEQUENCELIST](state, list) {
    state.sequenceList = list;
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode;
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index;
  },
};

export default mutations;
