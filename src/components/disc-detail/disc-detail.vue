<template>
  <transition name="disc-detail-slide">
    <music-list :title="disc.name" :songs="songs" :bgImage="disc.coverImgUrl"></music-list>
  </transition>
</template>

<script>
import api from '@/api/api';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import musicList from '../music-list/music-list';

export default {
  name: 'disc-detail',
  components: {
    musicList,
  },
  computed: {
    ...mapGetters(['songs']),
  },
  data() {
    return {
      disc: {},
    };
  },
  methods: {
    ...mapMutations(['SET_SONGS']),
    ...mapActions(['getDiscSongsPlay']),
    getSongs() {
      this.SET_SONGS([]); // 清空音乐播放列表
      this.axios.get(api.getRecommendDetail + this.$route.params.id)
        .then((res) => {
          if (res.data.code === 200) {
            this.disc = res.data.playlist;
            this.getDiscSongsPlay(this.disc); // 获取音乐播放地址
          }
        });
    },
  },
  created() {
    this.getSongs();
  },
};
</script>


<style lang="scss" scoped>
.disc-detail-slide-enter, .disc-detail-slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
.disc-detail-slide-enter-active, .disc-detail-slide-leave-active {
  transition: all .3s;
}
</style>

