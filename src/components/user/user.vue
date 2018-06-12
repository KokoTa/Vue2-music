<template>
  <transition name="user">
    <div class="user" ref="user">
      <!-- 头 -->
      <div class="back" @click="back">
        <i class="fas fa-angle-left fa-3x icon-back"></i>
        <h1 class="title">我喜欢的歌曲</h1>
      </div>
      <!-- 歌曲列表 -->
      <scroll class="list" ref="scroll" :data="favoriteSongs">
        <ul>
          <li
            v-for="(item, index) in favoriteSongs"
            :key="index"
            class="list-item"
            @click="selectFavorite(item)">
            {{ item.name }} - {{ item.singer }}
            <i class="delete" @click.stop="deleteFavorite(item)">X</i>
          </li>
        </ul>
      </scroll>
    </div>
  </transition>
</template>

<script>
import Scroll from '@/base/scroll/scroll';
import cache from '@/common/js/cache';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import mixin from '@/common/js/mixin';

export default {
  mixins: [mixin],
  name: 'user',
  components: {
    Scroll,
  },
  computed: {
    ...mapGetters(['favoriteSongs']),
  },
  methods: {
    ...mapMutations(['SET_FAVORITE_SONG']),
    ...mapActions(['insertPlay']),
    handlePlayList(playList) { // 有迷你播放器时，设置视图与底部之间的距离
      const bottom = playList.length > 0 ? '1.2rem' : '';
      this.$refs.user.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    back() { // 回退
      this.$router.go(-1);
    },
    selectFavorite(song) { // 选择某喜欢的歌曲并插入播放
      this.insertPlay(song);
    },
    deleteFavorite(song) { // 删除某喜欢的歌曲，记得更新Vuex
      cache.deleteHistory(song, 'favoriteSongs');
      this.SET_FAVORITE_SONG(cache.getHistory('favoriteSongs'));
    },
  },
};
</script>

<style lang="scss" scoped>
.user-enter, .user-leave-to {
  transform: translateX(100%);
}
.user-enter-active, .user-leave-active {
  transition: all .3s;
}

.user {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
  z-index: 999;
  .back {
    color: $color-theme;
    .icon-back {
      width: 1.12rem;
      text-align: center;
      line-height: 1.12rem;
    }
    .title {
      line-height: 1.12rem;
      @include font-dpr($font-size-large);
      color: $color-text;
      position: absolute;
      width: 80%;
      left: 10%;
      right: 10%;
      top: 0;
      text-align: center;
      @include no-wrap;
      z-index: 20;
    }
  }

  .list {
    padding: 0 .266667rem;
    height: calc(100% - 1.653333rem);
    overflow: hidden;
    .list-item {
      padding: .133333rem;
      @include font-dpr($font-size-medium-x);
      color: $color-text-l;
      .delete {
        float: right;
      }
    }
  }
}
</style>

