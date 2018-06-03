<template>
  <transition name="rank-detail-slide">
    <music-list :title="rank.name" :songs="songs" :bgImage="rank.coverImgUrl"></music-list>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import musicList from '../music-list/music-list';

export default {
  name: 'rank-detail',
  components: {
    musicList,
  },
  computed: {
    ...mapGetters(['songs']),
  },
  props: ['songsData', 'rankInfo'],
  data() {
    return {
      rank: this.rankInfo,
    };
  },
  methods: {
    ...mapMutations(['SET_SONGS']),
    ...mapActions(['getSongsPlay']),
    getSongs() {
      this.SET_SONGS([]); // 清空音乐播放列表
      this.getSongsPlay(this.songsData);
    },
  },
  created() {
    this.getSongs();
  },
};
</script>


<style lang="scss" scoped>
.rank-detail-slide-enter, .rank-detail-slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
.rank-detail-slide-enter-active, .rank-detail-slide-leave-active {
  transition: all .3s;
}
</style>

