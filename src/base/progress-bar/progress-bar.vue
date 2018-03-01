<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="progress-content">
      <div class="progress" ref="progress"></div>
      <!-- 加prevent防止拖动浏览器 -->
      <div class="progress-btn-wrapper"
      ref="progressBtnWrapper"
      @touchstart.prevent="touchStart"
      @touchmove.prevent="touchMove"
      @touchend.prevent="touchEnd">
        <div class="progress-btn" ref="progressBtn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import prefixStyle from '@/common/js/prefix';

const transform = prefixStyle('transform');

export default {
  name: 'process-bar',
  props: {
    percent: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      touch: {}, // 记录touch状态
      actualWidth: 0, // 实际进度条总宽度（由于会多次引用，所以取出来）
    };
  },
  methods: {
    touchStart(e) {
      this.touch.init = true; // 是否开始touch
      this.touch.startX = e.touches[0].pageX; // 偏移起始点
      this.touch.width = this.$refs.progress.clientWidth; // 当前进度条宽度
    },
    touchMove(e) {
      if (!this.touch.init) {
        return false;
      }
      const diffX = e.touches[0].pageX - this.touch.startX;
      const offsetX = Math.min(Math.max(0, this.touch.width + diffX), this.actualWidth);

      this.setOffset(offsetX);

      return true;
    },
    touchEnd() {
      this.touch.init = false;
      this.percentChange();
    },
    setOffset(width) { // 改变进度条宽度
      this.$refs.progress.style.width = `${width}px`;
      this.$refs.progressBtnWrapper.style[transform] = `translateX(${width}px)`;
    },
    percentChange() { // 拖动放开或者点击音乐进度时,更新进度百分比
      // 由于是基础组件，所以不参与业务逻辑
      const newPercent = this.$refs.progress.clientWidth / this.actualWidth;
      this.$emit('percentChange', newPercent);
    },
    progressClick(e) { // 点击进度条
      this.setOffset(e.offsetX);
      this.percentChange();
    },
  },
  mounted() {
    const barWidth = this.$refs.progressBar.clientWidth;
    const btnWidth = this.$refs.progressBtn.offsetWidth;
    // 实际进度条总宽度要容器宽度减掉按钮宽度
    this.actualWidth = barWidth - btnWidth;
  },
  watch: {
    percent(newVal) {
      // 改变进度条和按钮位置
      // 注意：当拖动时如果音乐还在播放，会出现鬼畜现象
      // 因为音乐时间变化触发了percent变化，会触发改变宽度的操作
      // 导致和touchmove事件产生冲突，因此在拖动时要阻止改变宽度的操作
      // 所以使用了 this.touch.init
      if (newVal >= 0 && !this.touch.init) {
        const offsetX = this.actualWidth * newVal;
        this.setOffset(offsetX);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  line-height: .533333rem;
  .progress-content {
    position: relative;
    height: .106667rem;
    background: $color-background-d;
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress-btn-wrapper {
      position: absolute;
      height: .8rem;
      width: .8rem;
      top: -.4rem;
      left: -.2rem;
      .progress-btn {
        position: relative;
        width: .426667rem;
        height: .426667rem;
        top: .24rem;
        left: .2rem;
        box-sizing: border-box;
        border-radius: 50%;
        background: $color-theme;
        border: 4px solid $color-text;
      }
    }
  }
}
</style>
