<template>
  <!-- Base by better-scroll -->
  <section class="slider" ref="slider">
    <div class="slider-group" ref="slider-group">
      <slot></slot>
    </div>
    <div class="dots">
    </div>
  </section>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name: 'slider2',
  props: {
    loop: {
      type: Boolean,
      default: true,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 4000,
    },
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0,
      isResize: false,
      children: [],
      slider: null,
    };
  },
  methods: {
    setSliderWidth() { // 初始化或更新slider-group的宽度
      this.children = this.$refs['slider-group'].children; // 获得子元素

      let width = 0;
      const sliderWidth = this.$refs.slider.clientWidth; // slider可视宽度
      for (let i = 0; i < this.children.length; i += 1) {
        const child = this.children[i];
        child.classList.add('slider-item'); // 注意这里我们是在这个组件里给分配的内容添加样式，而不是在外组件中
        child.style.width = `${sliderWidth}px`;
        width += sliderWidth;
      }

      if (this.loop && !this.isResize) { // 如果是循环播放，则需要多两个dom来存放视差图（轮播原理）
        width += 2 * sliderWidth;
      }

      this.$refs['slider-group'].style.width = `${width}px`;
    },
    initSlider() {
      // https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#momentum
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: true,
          threshold: 0.3,
          speed: 1000,
          click: true,
        },
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setSliderWidth();
      this.initSlider();
    });
  },
};
</script>

<style lang="scss" scoped>
.slider {
  min-height: 1px;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      img {
        width: 100%;
      }
    }
  }
}
</style>

