import api from '@/api/api';
import axios from 'axios';
import type from './mutation-type';

const actions = {
  // 获得歌手 -> 获得歌手热歌信息 -> 获得歌曲播放地址 -> 返回整合后的对象（繁琐= =）
  // 同时这个方法只针对歌手的歌曲获得，还未支持歌单或专辑的歌曲获得
  getSongsPlay({ state, commit }, songsInfo) {
    return Promise.all(songsInfo.map((item) => {
      const id = item.id;
      return axios.get(api.songInfo + id)
        .then((res) => {
          const obj = {
            singerName: state.singer.name,
            singerPic: state.singer.picUrl,
            songName: item.name,
            alName: item.al.name,
            alPic: item.al.picUrl,
            playUrl: null,
          };
          if (res.status === 200) {
            obj.url = res.data.data[0].url;
          }
          return obj;
        });
    })).then((res) => {
      const songsPlay = res;
      commit(type.SET_SONGS, songsPlay);
      return songsPlay;
    });
  },
  setPlayInfo({ commit }, { list, index }) {
    commit(type.SET_SEQUENCELIST, list);
    commit(type.SET_PLAYLIST, list);
    commit(type.SET_CURRENT_INDEX, index);
    commit(type.SET_FULL_SCREEN, true);
    commit(type.SET_PLAYING_STATE, true);
  },
};

export default actions;
