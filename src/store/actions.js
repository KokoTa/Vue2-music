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
            singerName: item.ar[0].name,
            singerPic: '',
            songName: item.name,
            alName: item.al.name,
            alPic: item.al.picUrl,
            url: '',
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
  // 插入歌曲并播放
  insertPlay({ state, commit }, song) {
    // 得到歌曲播放地址
    axios.get(api.songInfo + song.id)
      .then((res) => {
        const playList = state.playList.slice(); // 新建副本
        const sequenceList = state.sequenceList.slice(); // 新建副本
        let currentIndex = state.currentIndex;
        // 初始化歌曲信息
        const obj = {
          singerName: song.artists[0].name,
          singerPic: song.artists[0].img1v1Url,
          songName: song.name,
          alName: song.album.name,
          alPic: 'https://picsum.photos/400/400',
          url: '',
          id: song.id,
        };
        if (res.data.code === 200) {
          obj.url = res.data.data[0].url;
        }
        // 播放列表中是否存在将要插入的歌曲
        const index = playList.findIndex((item) => {
          const b = item.songName === obj.songName;
          return b;
        });
        // 如果存在，就把它移到最后面；如果不存在就把这首歌加在最后面
        if (index > -1) {
          playList.splice(index, 1);
        } else {
          sequenceList.push(obj);
        }
        playList.push(obj);
        currentIndex = playList.length - 1;
        // 播放音乐
        commit(type.SET_PLAY_MODE, playMode.random); // 设置播放模式
        commit(type.SET_SEQUENCELIST, sequenceList); // 设置顺序列表
        commit(type.SET_PLAYLIST, playList); // 设置播放列表
        commit(type.SET_CURRENT_INDEX, currentIndex); // 设置歌曲索引
        commit(type.SET_FULL_SCREEN, true); // 设置是否全屏
        commit(type.SET_PLAYING_STATE, true); // 设置播放/暂停
      });
  },
  // 删除一首歌
  deletePlay({ state, commit }, song) {
    const playList = state.playList.slice(); // 新建副本
    const sequenceList = state.sequenceList.slice(); // 新建副本
    let currentIndex = state.currentIndex;

    const playListIndex = playList.findIndex(item => item.id === song.id); // 找到播放列表里这首歌的索引
    playList.splice(playListIndex, 1); // 删除
    const sequenceListIndex = sequenceList.findIndex(item => item.id === song.id); // 找到顺序列表里这首歌的索引
    sequenceList.splice(sequenceListIndex, 1); // 删除

    if (playListIndex <= currentIndex) { // 删除的索引小于当前播放索引时
      currentIndex -= 1;
    }
    if (currentIndex === -1) {
      currentIndex = 0;
    }

    commit(type.SET_SEQUENCELIST, sequenceList); // 设置顺序列表
    commit(type.SET_PLAYLIST, playList); // 设置播放列表
    commit(type.SET_CURRENT_INDEX, currentIndex); // 设置歌曲索引

    if (!playList.length) { // 播放列表为空时
      commit(type.SET_PLAYING_STATE, false); // 设置播放/暂停
    }
  },
  // 删除所有歌曲
  deleteAllPlay({ commit }) {
    commit(type.SET_SEQUENCELIST, []); // 设置顺序列表
    commit(type.SET_PLAYLIST, []); // 设置播放列表
    commit(type.SET_CURRENT_INDEX, -1); // 设置歌曲索引
  },
  // 播放某首歌曲
  playOneSong({ state, commit }, song) {
    const index = state.playList.findIndex(item => item.id === song.id);
    if (index) {
      commit(type.SET_CURRENT_INDEX, index);
    }
  },
};

export default actions;
