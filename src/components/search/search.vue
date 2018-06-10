<template>
  <div class="search">
    <search-box ref="searchBox" placeholder="搜索歌曲、歌手" @searchInfo="search"></search-box>
    <div class="hot-singer">
      <h1 class="title">热门歌手</h1>
      <div class="content">
        <span
          class="item"
          v-for="(item, index) in singers"
          :key="index"
          @click="selectItem(item)">
          {{ item.name }}
        </span>
      </div>
    </div>
    <div class="search-detail" v-show="searchInfo" ref="searchDetail">
      <search-result
        :searchInfo="searchInfo"
        @blurSearchBox="getBlurOrder"
        @selectSong="setSearchHistory">
      </search-result>
    </div>
    <div class="search-history-detail" v-show="searchHistory">
      <h1 class="title">
        <span>搜索历史</span>
        <i
          class="fas fa-trash-alt fa-sm delete-icon"
          @click="deleteAllHistory">
        </i>
      </h1>
      <search-history-list
        :historyData="searchHistory"
        @select="selectHistory"
        @delete="deleteHistory"
        ref="searchHistoryList">
      </search-history-list>
    </div>
  </div>
</template>

<script>
import api from '@/api/api';
import SearchBox from '@/base/search-box/search-box';
import SearchResult from '@/base/search-result/search-result';
import SearchHistoryList from '@/base/search-history-list/search-history-list';
import mixin from '@/common/js/mixin';
import cache from '@/common/js/cache';
import { mapGetters, mapMutations } from 'vuex';


// 点击歌手 -> 触发selectItem事件 -> 触发search事件
export default {
  mixins: [mixin],
  name: 'search',
  components: {
    SearchBox,
    SearchResult,
    SearchHistoryList,
  },
  computed: {
    ...mapGetters(['searchHistory']),
  },
  data() {
    return {
      singers: [], // 热门歌手
      searchInfo: '', // 搜索信息
    };
  },
  methods: {
    ...mapMutations(['SET_SEARCH_HISTORY']),
    handlePlayList(playList) { // 有迷你播放器时，设置视图与底部之间的距离
      const bottom = playList.length > 0 ? '1.6rem' : '';
      this.$refs.searchDetail.style.bottom = bottom;
      this.$refs.searchHistoryList.$el.style.height = `calc(100% - 2.933333rem - ${bottom})`;
    },
    search(info) { // 改变搜索信息
      // 改变信息后触发search-result的请求事件
      this.searchInfo = info;
    },
    hotSinger() { // 获取热门歌手
      this.axios.get(api.hotSinger)
        .then((res) => {
          if (res.data.code === 200) {
            this.singers = res.data.artists;
          }
        });
    },
    selectItem(item) { // 选择歌手或歌曲
      // 调用search-box组件里的方法
      this.$refs.searchBox.setSearchInfo(item.name);
    },
    getBlurOrder(boolean) { // 获得清除焦点命令
      if (boolean) {
        this.$refs.searchBox.blurInput();
      }
    },
    setSearchHistory(song) { // 缓存搜索历史
      // 缓存到浏览器
      cache.setHistory(song);
      // 获取新缓存到Vuex
      this.SET_SEARCH_HISTORY(cache.getHistory());
    },
    selectHistory(item) { // 选择某条搜索历史时
      this.selectItem(item);
    },
    deleteHistory(item) { // 删除某条搜索历史时
      // 删除某条缓存
      cache.deleteHistory(item);
      // 获取新缓存到Vuex
      this.SET_SEARCH_HISTORY(cache.getHistory());
    },
    deleteAllHistory() {
      // 删除所有缓存
      cache.deleteAllHistroy();
      // 获取新缓存到Vuex
      this.SET_SEARCH_HISTORY(cache.getHistory());
    },
  },
  created() {
    this.hotSinger();
  },
};
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  top: 2.133333rem;
  bottom: 0;

  .hot-singer, .search-history-detail {
    margin: 0 .533333rem;
    & .title {
      @include font-dpr($font-size-medium);
      color: $color-text-d;
      margin: .4rem 0 .266667rem 0;
    }
    & .content {
      .item {
        @include font-dpr($font-size-medium);
        color: $color-text-d;
        background: $color-highlight-background;
        padding: .133333rem;
        display: inline-block;
        margin: .133333rem;
      }
    }
  }

  .search-detail {
    position: fixed;
    z-index: 100;
    top: 3.733333rem;
    left: .266667rem;
    right: .266667rem;
    bottom: 0;
  }

  .search-history-detail {
    height: calc(100% - 2.666667rem);
    & .delete-icon {
      float: right;
      cursor: pointer;
      padding: .133333rem;
      padding-right: 0;
    }
  }
}
</style>

