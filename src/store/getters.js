const getters = {
  singer(state) {
    return state.singer;
  },
  songs(state) {
    return state.songs;
  },
  playing(state) {
    return state.playing;
  },
  fullScreen(state) {
    return state.fullScreen;
  },
  playList(state) {
    return state.playList;
  },
  sequenceList(state) {
    return state.sequenceList;
  },
  mode(state) {
    return state.mode;
  },
  currentIndex(state) {
    return state.currentIndex;
  },
  currentSong(state) {
    return state.playList[state.currentIndex];
  },
};

export default getters;
