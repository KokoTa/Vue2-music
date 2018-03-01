<template>
  <div class="progress-circle">
    <!-- 这个组件很JBOK -->
    <!-- viewport：视图大小 r: 半径 cx/cy: 圆心 stroke-dasharray: 虚线模式 stroke-dashoffset: 虚线之间的间隔-->
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent"
      :stroke-dasharray="dashArray"
      :stroke-dashoffset="dashOffset"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'progress-circle',
  props: {
    radius: {
      type: Number,
      default: 100,
    },
    percent: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dashArray: Math.PI * 100, // 周长，100和视图相关（2r）
    };
  },
  computed: {
    dashOffset() { // 计算虚线偏移
      return (1 - this.percent) * this.dashArray;
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-circle {
  position: relative;
  circle {
    stroke-width: .213333rem;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: $color-theme-d;
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: $color-theme;
    }
  }
}
</style>
