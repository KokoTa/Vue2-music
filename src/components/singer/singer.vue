<template>
  <article class="singer" ref="singer">
    <list-view :data="singers"></list-view>
  </article>
</template>

<script>
import api from '@/api/api';
import ListView from '@/base/listview/listview';

export default {
  name: 'singer',
  components: {
    ListView,
  },
  data() {
    return {
      singers: [],
    };
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
  position: relative;
  height: calc(100% - 2.133333rem);
  overflow: hidden;
}
</style>
