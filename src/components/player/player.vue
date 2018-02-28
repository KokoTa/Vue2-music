<template>
  <div class="player" v-if="playList.length">
    <!-- 全屏播放器 -->
    <transition name="full">
      <div class="player-full" v-show="fullScreen">
        <!-- 背景 -->
        <div class="background">
          <img class="background-img" :src="currentSong.alPic" alt="#">
        </div>
        <!-- 顶部 -->
        <div class="top">
          <div class="back" @click="toggleFullScreen">
            <i class="fas fa-angle-left fa-3x icon-back"></i>
          </div>
          <h1 class="title">{{ currentSong.songName }}</h1>
          <h2 class="subtitle">{{ currentSong.singerName }}</h2>
        </div>
        <!-- 中部 -->
        <div class="middle">
          <div class="rotate-img" :class="playRotate">
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
              <i class="fas fa-exchange-alt fa-2x"></i>
            </div>
            <div class="icon right">
              <i class="fas fa-backward fa-2x"></i>
            </div>
            <div class="icon">
              <i @click="togglePlay" class="fas fa-3x" :class="playIcon"></i>
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
    </transition>
    <transition name="mini">
      <div class="player-mini" v-show="!fullScreen" @click="toggleFullScreen">
        <div class="icon">
          <img class="icon-img" :class="playRotate" :src="currentSong.alPic" alt="#">
        </div>
        <div class="text">
          <h2 class="title">{{ currentSong.songName }}</h2>
          <h2 class="subtitle">{{ currentSong.singerName }}</h2>
        </div>
        <div class="control">
          <i @click.stop="togglePlay" class="fas fa-2x" :class="playIcon"></i>
        </div>
        <div class="control">
          <i class="fas fa-music fa-2x"></i>
        </div>
      </div>
    </transition>
    <!-- 播放器 -->
    <audio :src="currentSong.url" ref="audio"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'player',
  computed: {
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong',
      'playing',
    ]),
    playIcon() {
      if (this.playing) {
        return 'fa-pause-circle';
      }
      return 'fa-play-circle';
    },
    playRotate() {
      if (this.playing) {
        return 'rotate-animation';
      }
      return 'rotate-animation rotate-animation-pause';
    },
  },
  methods: {
    toggleFullScreen() {
      this.SET_FULL_SCREEN(!this.fullScreen);
    },
    togglePlay() {
      const audio = this.$refs.audio;
      this.SET_PLAYING_STATE(!this.playing);
      if (this.playing) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    ...mapMutations([
      'SET_FULL_SCREEN',
      'SET_PLAYING_STATE',
    ]),
  },
  watch: {
    currentSong() {
      this.$nextTick(() => { // 更新了资源，需要等待DOM更新
        this.SET_PLAYING_STATE(true);
        this.$refs.audio.play();
      });
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
    z-index: 999;
    color: $color-text;
    .background {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      background: $color-background;
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
      bottom: 1.6rem;
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
  .player-mini {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.6rem;
    background: $color-highlight-background;
    z-index: 999;
    display: flex;
    align-items: center;
    .icon {
      width: 1.066667rem;
      height: 1.066667rem;
      line-height: 1.6rem;
      padding: 0 .266667rem 0 .533333rem;
      .icon-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .text {
      flex: 1;
      .title {
        @include font-dpr($font-size-medium);
        color: $color-text;
        margin-bottom: .133333rem;
      }
      .subtitle {
        @include font-dpr($font-size-small);
        color: $color-text-d;
      }
    }
    .control {
      width: 1.066667rem;
      color: $color-theme;
    }
  }
  .rotate-animation {
    animation: rotate 10s linear infinite;
    &.rotate-animation-pause {
      animation-play-state: paused;
    }
  }
}

// 全屏播放页过渡
.full-enter-active, .full-leave-active {
  transition: all .5s;
  .top, .bottom {
    transition: all .5s;
  }
  .middle {
    transition: all .5s;
  }
}
.full-enter, .full-leave-to {
  opacity: 0;
  .top {
    transform: translateY(-100%);
  }
  .bottom {
    transform: translateY(100%);
  }
  .middle {
    transform: translate(-40%, 100%) scale(0);
  }
}

// 迷你播放器过渡
.mini-enter-active, .mini-leave-active {
  transition: all .5s;
}
.mini-enter, .mini-leave-to {
  transform: translateY(100%);
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

