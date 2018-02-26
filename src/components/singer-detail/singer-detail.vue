<template>
  <transition name="singer-detail-slide">
    <!-- music-list > scroll -> song-list -->
    <music-list :title="singer.name" :songs="songs" :bgImage="singer.picUrl"></music-list>
  </transition>
</template>

<script>
import api from '@/api/api';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import MusicList from '@/components/music-list/music-list';

export default {
  name: 'singer-detail',
  components: {
    MusicList,
  },
  computed: {
    ...mapGetters(['singer', 'songs']),
  },
  methods: {
    getSingerSongs(id) {
      if (!id) { // 刷新应用时得不到状态，需要重新获得状态
        this.$router.push('/singer');
        return;
      }
      this.SET_SONGS([]); // 清空数据
      this.axios.get(api.singerSongs + id) // 获得某歌手音乐的播放地址集合
        .then((res) => {
          if (res.status === 200) {
            const songsInfo = res.data.hotSongs;
            this.getSongsPlay(songsInfo, this.singer);
          }
        });
    },
    ...mapMutations(['SET_SONGS']),
    ...mapActions(['getSongsPlay']),
  },
  created() {
    this.getSingerSongs(this.singer.id);
  },
};
</script>

<style lang="scss">
.singer-detail-slide-enter, .singer-detail-slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
.singer-detail-slide-enter-active, .singer-detail-slide-leave-active {
  transition: all .3s;
}
</style>
