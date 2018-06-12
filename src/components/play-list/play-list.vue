<template>
  <div class="play-list" @click="close" ref="playList" style="visibility: hidden;">
    <div class="wrapper put-down" ref="wrapper" @click.stop>
      <div class="header">
        <i class="mode-icon fas fa-2x" :class="modeIcon" @click="changeMode"></i>
        <span class="mode-name">
          {{ modeName }}
        </span>
        <i class="fas fa-trash-alt fa-mx delete-icon" @click="deleteAll"></i>
      </div>
      <div class="content">
        <ul>
          <li
            class="play-item"
            v-for="(item, index) in playList"
            :key="index"
            @click="selectItem(item)">
            <i class="item item-playing" v-show="isPlaying(item)">playing</i>
            <span class="item-name">{{ item.songName }} - {{ item.singerName }}</span>
            <i class="item far fa-heart"></i>
            <i class="item" @click="deleteOne(item)">X</i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import playMode from '@/common/js/config'; // 播放模式
import { mapGetters, mapMutations, mapActions } from 'vuex';
import shuffle from '@/common/js/shuffle';

export default {
  name: 'play-list',
  computed: {
    ...mapGetters(['mode', 'playList', 'currentIndex', 'sequenceList']),
    modeIcon() {
      if (this.mode === playMode.sequence) return 'fa-exchange-alt';
      if (this.mode === playMode.loop) return 'fa-sync-alt';
      return 'fa-random';
    },
    modeName() {
      if (this.mode === playMode.sequence) return '顺序播放';
      if (this.mode === playMode.loop) return '循环播放';
      return '随机播放';
    },
  },
  methods: {
    ...mapMutations(['SET_PLAY_MODE', 'SET_PLAYLIST', 'SET_CURRENT_INDEX']),
    ...mapActions(['deletePlay', 'deleteAllPlay', 'playOneSong']),
    isPlaying(item) { // 正在播放
      // 当前歌曲的索引
      const b = this.playList.findIndex(song => song.id === item.id);

      if (b === this.currentIndex) {
        return true;
      }

      return false;
    },
    hidden() { // 关闭弹窗的函数
      this.$refs.playList.style.visibility = 'hidden';
    },
    close() { // 关闭弹窗
      this.$refs.wrapper.classList.toggle('put-down');
      this.$refs.wrapper.addEventListener('transitionend', this.hidden, false);
    },
    open() { // 打开弹窗
      this.$refs.wrapper.removeEventListener('transitionend', this.hidden, false); // 删除时传入具名函数，匿名函数无效
      this.$refs.playList.style.visibility = 'visible';
      this.$refs.wrapper.classList.toggle('put-down');
    },
    deleteOne(item) { // 删除一首歌
      this.deletePlay(item);
      if (!this.playList.length) {
        this.close();
      }
    },
    changeMode() { // 改变播放模式
      const mode = (this.mode + 1) % 3;
      this.SET_PLAY_MODE(mode);

      let list = [];
      if (this.mode === playMode.sequence || this.mode === playMode.loop) {
        list = this.sequenceList;
      } else {
        list = shuffle(this.sequenceList);
      }

      this.resetCurrentIndex(list);
      this.SET_PLAYLIST(list);
    },
    resetCurrentIndex(list) { // 更新新播放列表下当前歌曲的索引
      const nowSong = this.playList[this.currentIndex];
      const index = list.findIndex((item) => {
        const b = item.songName === nowSong.songName;
        return b;
      });
      this.SET_CURRENT_INDEX(index);
    },
    deleteAll() { // 清空播放列表
      this.deleteAllPlay();
    },
    selectItem(item) { // 选择播放某歌曲
      this.playOneSong(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.play-list {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $color-background-d;
  .wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: $color-background;
    box-sizing: border-box;
    padding: .266667rem;
    color: $color-text-l;
    transition: all .5s;
    & .header {
      margin-bottom: .266667rem;
      @include font-dpr($font-size-medium);
      .mode-icon {
        color: $color-theme;
        padding-right: .133333rem;
        vertical-align: middle;
      }
      .delete-icon {
        float: right;
        line-height: 2;
      }
    }
    & .content {
      height: 8rem;
      overflow: scroll;
      & .play-item {
        @include font-dpr($font-size-medium);
        box-sizing: border-box;
        padding: .266667rem 0;
        display: flex;
        & .item-name {
          flex: 1;
        }
        & .item {
          padding: 0 .133333rem;
        }
        & .item-playing {
          color: $color-theme-d;
        }
      }
    }
  }

  .put-down {
    transform: translateY(100%);
  }
}
</style>
