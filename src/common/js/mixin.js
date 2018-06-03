// 这是一个混合器， 用来更新scroll组件的高度
// https://cn.vuejs.org/v2/guide/mixins.html
import { mapGetters } from 'vuex';

const scrollMixin = {
  computed: {
    ...mapGetters(['playList']), // 当播放列表不为空时，mini播放器会出现，此时我们要更新视图距离底部的距离，不然内容会被遮住
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
    handlePlayList() { // 这个方法需要自行实现覆盖，否则默认的实现会报错；一般来说这个方法的作用就是调用scroll的refresh
      throw new Error('component must have handlePlayList methods');
    },
  },
};

export default scrollMixin;
