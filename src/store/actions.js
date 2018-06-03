import api from '@/api/api';
import playMode from '@/common/js/config';
import shuffle from '@/common/js/shuffle';
import axios from 'axios';
import type from './mutation-type';

const actions = {
  // 获得歌手 -> 获得歌手热歌信息 -> 获得歌曲播放地址 -> 返回整合后的对象（繁琐= =）
  // 歌手歌曲获取/排行榜歌曲获取
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
            url: null,
            id,
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
  // 歌单歌曲获取
  getDiscSongsPlay({ commit }, dictInfo) {
    const tracks = dictInfo.tracks; // 歌单每首音乐的信息
    return Promise.all(tracks.map((item) => {
      const id = item.id;
      return axios.get(api.songInfo + id)
        .then((res) => {
          const obj = {
            singerName: item.artists[0].name,
            singerPic: item.artists[0].img1v1Url,
            songName: item.name,
            alName: item.album.name,
            alPic: item.album.picUrl,
            url: null,
            id: item.id,
          };
          if (res.data.code === 200) {
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
  // 设置播放器参数
  setPlayInfo({ commit, state }, { list, index }) {
    commit(type.SET_SEQUENCELIST, list); // 设置顺序列表

    if (state.mode === playMode.random) { // 是否随机播放
      const randomList = shuffle(list);
      commit(type.SET_PLAYLIST, randomList); // 设置播放列表

      const curSong = list[index]; // 当前歌曲
      const newIndex = randomList.findIndex((item) => { // 找到新列表中歌曲的索引
        const b = item.songName === curSong.songName;
        return b;
      });
      commit(type.SET_CURRENT_INDEX, newIndex); // 设置歌曲索引
    } else {
      commit(type.SET_PLAYLIST, list);
      commit(type.SET_CURRENT_INDEX, index);
    }

    commit(type.SET_FULL_SCREEN, true); // 设置是否
    commit(type.SET_PLAYING_STATE, true); // 设置播放/暂停
  },
  // 随机播放时的参数
  setRandomPlayInfo({ commit }, { list }) {
    commit(type.SET_PLAY_MODE, playMode.random); // 设置播放模式
    commit(type.SET_SEQUENCELIST, list); // 设置顺序列表
    commit(type.SET_PLAYLIST, shuffle(list)); // 设置播放列表
    commit(type.SET_CURRENT_INDEX, 0); // 设置歌曲索引
    commit(type.SET_FULL_SCREEN, true); // 设置是否全屏
    commit(type.SET_PLAYING_STATE, true); // 设置播放/暂停
  },
};

export default actions;
