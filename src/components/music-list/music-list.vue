<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="fas fa-angle-left fa-3x icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgStyle">
      <div class="play-wrapper">
        <div class="play-content">
          <i class="fas fa-play fa-lg icon-play"></i>
          <span class="play-text">随机播放</span>
        </div>
      </div>
      <div class="mask"></div>
    </div>
    <div class="list-wrapper"></div>
  </div>
</template>

<script>
// music-list在多个地方复用，比如点击专辑/歌手/歌单，都是跳转到这个组件
export default {
  name: 'music-list',
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
      this.$router.push('/singer');
    },
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
    z-index: 10;
  }
  .title {
    line-height: 42px;
    @include font-dpr(18px);
    color: $color-text;
    position: absolute;
    width: 80%;
    left: 10%;
    right: 10%;
    text-align: center;
    z-index: 5;
    @include no-wrap;
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%; // 注意padding-top的使用，百分比是相对于块的宽度
    background-size: cover;
    background-origin: center;
    .play-wrapper {
      position: absolute;
      bottom: .533333rem;
      z-index: 10;
      width: 100%;
      .play-content {
        width: 3.2rem;
        line-height: .533333rem;
        margin: 0 auto;
        border: 1px solid $color-theme;
        border-radius: .266667rem;
        color: $color-theme;
        padding: .186667rem 0 .133333rem;
        @include font-dpr(14px);
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
}
</style>

