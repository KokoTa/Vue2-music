// 这是一个混合器， 用来更新scroll组件的高度和其他共享方法
// https://cn.vuejs.org/v2/guide/mixins.html
import { mapGetters, mapMutations } from 'vuex';
import cache from '@/common/js/cache';

const scrollMixin = {
  computed: {
    ...mapGetters(['playList', 'favoriteSongs']), // 当播放列表不为空时，mini播放器会出现，此时我们要更新视图距离底部的距离，不然内容会被遮住
  },
  mounted() {
    this.handlePlayList(this.playList);
  },
  activated() { // keep-alive切换会触发
    this.handlePlayList(this.playList);
  },
  watch: {
    playList(newVal) { // 监听列表变化，同时调用方法
      this.handlePlayList(newVal);
    },
  },
  methods: {
    handlePlayList() { // 这个方法需要自行实现覆盖；一般来说这个方法的作用就是调用scroll的refresh
      console.log('component must have handlePlayList methods');
    },
    ...mapMutations(['SET_FAVORITE_SONG']),
    setFavorite(song) { // 缓存喜欢的歌曲讯息并同步到Vuex
      const songs = cache.getHistory('favoriteSongs');
      // toggle喜欢的歌曲
      if (songs) {
        const b = songs.findIndex(item => item.id === song.id);
        if (b > -1) {
          cache.deleteHistory(song, 'favoriteSongs');
        } else {
          cache.setHistory(song, 'favoriteSongs');
        }
      } else {
        cache.setHistory(song, 'favoriteSongs');
      }
      this.SET_FAVORITE_SONG(cache.getHistory('favoriteSongs'));
    },
    favoriteIcon(song) { // 设置爱心的样式，喜欢的话是实心
      if (this.favoriteSongs) {
        const b = this.favoriteSongs.findIndex(item => item.id === song.id);
        if (b > -1) {
          return 'fas';
        }
        return 'far';
      }
      return 'far';
    },
  },
};

export default scrollMixin;
