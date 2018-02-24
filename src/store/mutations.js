import types from './mutation-type';

const mutations = {
  [types.SET_SINGER](state, singer) { // 设置当前选中的歌手
    state.singer = singer;
  },
  [types.SET_SONGS](state, songs) { // 设置歌手的歌曲集合
    state.songs = songs;
  },
};

export default mutations;
