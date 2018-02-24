import api from '@/api/api';
import axios from 'axios';

const actions = {
  // 获得歌手 -> 获得歌手热歌信息 -> 获得歌曲播放地址 -> 返回整合后的对象（繁琐= =）
  // 同时这个方法只针对歌手的歌曲获得，还未支持歌单或专辑的歌曲获得
  getSongsPlay({ state, commit }, songsInfo) {
    commit('SET_SONGS', []); // 每次求值都清空数据，防止切换时加载之前的数据
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
      commit('SET_SONGS', songsPlay);
      return songsPlay;
    });
  },
};

export default actions;
