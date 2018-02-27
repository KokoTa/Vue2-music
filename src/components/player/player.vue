<template>
  <div class="player" v-if="playList.length">
    <!-- 全屏播放器 -->
    <div class="player-full" v-show="fullScreen">
      <!-- 背景 -->
      <div class="background">
        <img class="background-img" :src="currentSong.alPic" alt="#">
      </div>
      <!-- 顶部 -->
      <div class="top">
        <div class="back" @click="back">
          <i class="fas fa-angle-left fa-3x icon-back"></i>
        </div>
        <h1 class="title">{{ currentSong.songName }}</h1>
        <h2 class="subtitle">{{ currentSong.singerName }}</h2>
      </div>
      <!-- 中部 -->
      <div class="middle">
        <div class="rotate-img">
          <img :src="currentSong.alPic" alt="#">
        </div>
        <div class="lyric-wrapper">
          <p class="lyric">awoeof naowenf eo dasd</p>
        </div>
      </div>
      <!-- 底部 -->
      <div class="bottom">
        <div class="dot-wrapper">
          <span class="dot active"></span>
          <span class="dot"></span>
        </div>
        <div class="process-wrapper">
          <div></div>
        </div>
        <div class="operation-wrapper">
          <div class="icon right">
            <i class="fas fa-backward fa-2x"></i>
          </div>
          <div class="icon right">
            <i class="fas fa-backward fa-2x"></i>
          </div>
          <div class="icon">
            <i class="fas fa-play-circle fa-3x"></i>
          </div>
          <div class="icon left">
            <i class="fas fa-forward fa-2x"></i>
          </div>
          <div class="icon left">
            <i class="far fa-heart fa-2x"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'player',
  computed: {
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong',
    ]),
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.player {
  .player-full {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background;
    z-index: 999;
    color: $color-text;
    .background {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      .background-img {
        height: 100%;
        width: 100%;
        filter: blur(20px);
      }
    }
    .top {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .back {
        position: absolute;
        top: 0;
        left: 0;
        .icon-back {
          width: 1.12rem;
          line-height: 1.12rem;
          text-align: center;
          color: $color-theme;
        }
      }
      .title {
        line-height: 1.12rem;
        @include font-dpr($font-size-large);
        width: 80%;
        margin: 0 auto;
        text-align: center;
        @include no-wrap;
      }
      .subtitle {
        line-height: .56rem;
        @include font-dpr($font-size-medium);
        text-align: center;
      }
    }
    .middle {
      position: absolute;
      width: 100%;
      top: 2.133333rem;
      bottom: 4rem;
      .rotate-img {
        position: relative;
        width: 80%;
        margin: 0 auto;
        img {
          box-sizing: border-box;
          width: 100%;
          border-radius: 50%;
          border: .266667rem solid rgba(255, 255, 255, .1);
        }
      }
      .lyric-wrapper {
        text-align: center;
        margin: .8rem .533333rem;
        .lyric {
          line-height: .48rem;
          @include font-dpr($font-size-large);
          @include no-wrap;
          color: $color-text-l;
        }
      }
    }
    .bottom {
      position: absolute;
      width: 100%;
      bottom: .8rem;
      .dot-wrapper {
        text-align: center;
        .dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: $color-text-d;
          border-radius: 50%;
          margin: 0 .133333rem;
          &.active {
            width: .533333rem;
            border-radius: .266667rem;
            background: $color-text-l;
          }
        }
      }
      .operation-wrapper {
        display: flex;
        .icon {
          flex: 1;
          text-align: center;
          &.right {
            text-align: right;
          }
          &.left {
            text-align: left;
          }
          i {
            color: $color-theme;
            line-height: 1.066667rem;
          }
        }
      }
    }
  }
}
</style>

