<template>
  <article class="singer" ref="singer">
    <list-view :data="singers" @select="selectSinger" ref="listView"></list-view>
    <router-view></router-view>
  </article>
</template>

<script>
import api from '@/api/api';
import ListView from '@/base/listview/listview';
import { mapMutations } from 'vuex';
import mixin from '@/common/js/mixin';

export default {
  mixins: [mixin],
  name: 'singer',
  components: {
    ListView,
  },
  data() {
    return {
      singers: [],
    };
  },
  methods: {
    handlePlayList(playList) { // 设置视图与底部之间的距离
      const bottom = playList.length > 0 ? '1.2rem' : '';
      this.$refs.singer.style.bottom = bottom;
      this.$refs.listView.refresh();
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`,
      });
      this.setSinger(singer);
    },
    ...mapMutations({
      setSinger: 'SET_SINGER',
    }),
  },
  created() {
    this.axios.get(api.singer)
      .then((res) => {
        // 数据分组
        if (res.data.code === 200) {
          const data = res.data.list.artists;
          const num = 10;
          const divide = data.length / num;
          for (let i = 0; i < divide; i += 1) {
            this.singers.push(data.splice(0, 10));
          }
        }
      });
  },
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 2.133333rem;
  bottom: 0;
}
</style>
