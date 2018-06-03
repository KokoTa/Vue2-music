<template>
  <div class="rank" ref="rank">
    <scroll v-if="rankData.length" class="scroll" ref="scroll" :data="rankData">
      <div class="content">
        <div
          v-for="(item, index) in rankData"
          :key="index"
          class="rank-item"
          @click="selectRank(item)">
          <img class="item-img" :src="item.coverImgUrl">
          <div class="item-content">
            <p class="item-title">{{ item.name }}</p>
            <span class="item-desc">{{ item.description }}</span>
          </div>
        </div>
      </div>
    </scroll>
    <loading v-else></loading>
    <router-view :songsData="tracks" :rankInfo="rankInfo"></router-view>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll';
import Loading from '@/base/loading/loading';
import api from '@/api/api';
import mixin from '@/common/js/mixin';

export default {
  mixins: [mixin],
  name: 'rank',
  components: {
    Scroll,
    Loading,
  },
  data() {
    return {
      rankData: [],
      tracks: [],
      rankInfo: {},
    };
  },
  methods: {
    handlePlayList(playList) { // 有迷你播放器时，设置视图与底部之间的距离
      const bottom = playList.length > 0 ? '1.5rem' : '';
      this.$refs.rank.style.bottom = bottom;
      if (this.$refs.scroll) {
        this.$refs.scroll.refresh();
      }
    },
    getRankData() { // 获取排行榜信息
      // 排行榜需要单独请求，一个id得到一个排行榜，id范围为0 ~ 23
      const urls = [];
      for (let i = 0; i < 24; i += 1) {
        urls.push(api.getRankData + i);
      }

      Promise.all(urls.map((url) => {
        const u = url;
        return this.axios.get(u)
          .then((res) => {
            if (res.data.code === 200) {
              return res.data.playlist;
            }
            return false;
          });
      })).then((res) => {
        this.rankData = res;
      });
    },
    selectRank(item) { // 选择某排行歌单
      this.tracks = item.tracks; // 把歌单里的每首歌的信息传给子组件
      this.rankInfo = item; // 这个歌单的信息
      this.$router.push('/rank/' + item.id);
    },
  },
  created() {
    this.getRankData();
  },
};
</script>

<style lang="scss" scoped>
.rank {
  position: fixed;
  width: 100%;
  top: 2.133333rem;
  bottom: 0;
  .scroll {
    height: 100%;
    overflow: hidden;
    .rank-item {
      padding: .266667rem;
      display: flex;
      height: 2.666667rem;
      & .item-img {
        height: 100%;
        border: 1px solid $color-text-l;
      }
      & .item-content {
        padding-left: .266667rem;
        & .item-title {
          color: $color-text;
          @include font-dpr($font-size-large);
          line-height: 2;
        }
        & .item-desc {
          color: $color-text-l;
          @include font-dpr($font-size-medium-x);
          line-height: 1.5;
          // 超出字符省略(非标准方案)
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
    }
  }
}
</style>

