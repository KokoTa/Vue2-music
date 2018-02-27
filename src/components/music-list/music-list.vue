<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="fas fa-angle-left fa-3x icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="mask"></div>
      <div class="play-wrapper" v-show="songs.length" ref="playWrapper">
        <div class="play-content">
          <i class="fas fa-play fa-lg icon-play"></i>
          <span class="play-text">随机播放</span>
        </div>
      </div>
    </div>
    <!-- 上拉时的背景层 -->
    <div class="bg-layer" ref="bgLayer"></div>
    <scroll class="scroll"
    :data="songs"
    ref="scroll"
    :probe-type="3"
    :listenScroll="true"
    @scroll="scroll">
      <div class="scroll-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
      <div v-show="!songs.length" class="loading">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
// music-list在多个地方复用，比如点击专辑/歌手/歌单，都是跳转到这个组件
import Scroll from '@/base/scroll/scroll';
import SongList from '@/base/song-list/song-list';
import prefixStyle from '@/common/js/prefix'; // 前缀判断
import Loading from '@/base/loading/loading';
import { mapActions } from 'vuex';

const transform = prefixStyle('transform');

export default {
  name: 'music-list',
  components: {
    Scroll,
    SongList,
    Loading,
  },
  props: {
    bgImage: {
      type: String,
      default: '',
    },
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: '',
    },
    rank: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
    scroll(pos) {
      const layerHeight = this.$refs.bgLayer.clientHeight;
      const scrollHeight = this.$refs.scroll.$el.clientHeight;
      const rangeTop = -(layerHeight - (scrollHeight + 42)); // 42是顶栏的高度
      // 背景移动逻辑
      if (pos.y > rangeTop) {
        // 背景的变化其实是.bg-layer层根据scroll偏移量改变位置得到的
        this.$refs.bgLayer.style[transform] = `translateY(${pos.y}px)`;
        // 改变样式使得顶栏显示并将scroll下的文字覆盖
        this.$refs.bgImage.style.paddingTop = '70%';
        this.$refs.bgImage.style.height = '0';
        this.$refs.bgImage.style.zIndex = '0';
        this.$refs.playWrapper.style.display = 'block';
      } else {
        this.$refs.bgImage.style.paddingTop = '0%';
        this.$refs.bgImage.style.height = '1.12rem';
        this.$refs.bgImage.style.zIndex = '10';
        this.$refs.playWrapper.style.display = 'none';
      }
      // 图片放大逻辑
      let scalePercent = 1;
      if (pos.y > 0) {
        scalePercent = 1 + Math.abs(pos.y / this.$refs.bgImage.clientHeight);
      }
      this.$refs.bgImage.style[transform] = `scale(${scalePercent})`;
    },
    selectItem(item, index) {
      this.setPlayInfo({
        list: this.songs,
        item,
        index,
      });
    },
    ...mapActions(['setPlayInfo']),
  },
  mounted() {
    // 控制scroll位置
    this.$refs.scroll.$el.style.top = `${this.$refs.bgImage.clientHeight}px`;
    window.addEventListener('resize', () => {
      this.$refs.scroll.$el.style.top = `${this.$refs.bgImage.clientHeight}px`;
    });
  },
};
</script>

<style lang="scss" scoped>
.music-list {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $color-background;
  z-index: 100;
  .icon-back, .icon-play {
    color: $color-theme;
  }
  .icon-back {
    line-height: 1.12rem;
    width: 1.12rem;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
  }
  .title {
    line-height: 42px;
    @include font-dpr($font-size-large);
    color: $color-text;
    position: absolute;
    width: 80%;
    left: 10%;
    right: 10%;
    text-align: center;
    @include no-wrap;
    z-index: 20;
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%; // 注意padding-top的使用，百分比是相对于块的宽度
    background-size: cover;
    background-origin: center;
    z-index: 0;
    .play-wrapper {
      position: absolute;
      bottom: .533333rem;
      width: 100%;
      .play-content {
        width: 3.2rem;
        line-height: .533333rem;
        margin: 0 auto;
        border: 1px solid $color-theme;
        border-radius: .266667rem;
        color: $color-theme;
        padding: .186667rem 0 .133333rem;
        @include font-dpr($font-size-medium);
        text-align: center;
      }
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .3);
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    width: 100%;
    background: $color-background;
  }
  .scroll {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    @include font-dpr($font-size-medium);
    .scroll-wrapper {
      padding: .533333rem;
    }
    .loading {
      height: 100%;
      width: 100%;
    }
  }
}
</style>

