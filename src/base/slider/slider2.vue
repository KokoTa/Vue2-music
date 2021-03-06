<template>
  <!-- Base by better-scroll -->
  <section class="slider" ref="slider">
    <div class="slider-group" ref="slider-group">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot"
      v-for="(item, index) in dots"
      :key="index"
      :class="{ active: currentPageIndex === index }">
      </span>
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
      dots: [], // 点集合
      currentPageIndex: 0, // 当前页
      children: [], // 子元素集合
      slider: null, // slider实例
      childLength: 0, // 一开始的子元素长度
      timer: null, // 定时器
    };
  },
  methods: {
    setSliderWidth(isResize) { // 初始化或更新slider-group的宽度；isResize判断是否更改了分辨率
      this.children = this.$refs['slider-group'].children;
      this.childLength = this.children.length;

      let width = 0;
      const sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i += 1) {
        const child = this.children[i];
        child.classList.add('slider-item'); // 注意这里我们是在这个组件里给分配的内容添加样式，而不是在外组件中
        child.style.width = `${sliderWidth}px`;
        width += sliderWidth;
      }

      if (this.loop && !isResize) { // 如果是循环播放，则需要多两个dom来存放视差图（轮播原理）; resize的时候不需要添加dom
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
          loop: this.loop,
          threshold: 0.3,
          speed: 1000,
        },
      });

      this.slider.on('scrollEnd', () => {
        const pageIndex = this.slider.getCurrentPage().pageX;
        this.currentPageIndex = pageIndex;

        if (this.autoPlay) {
          this.play();
        }
      });

      this.slider.on('beforeScrollStart', () => { // 滚动开始前清除定时器，比如设置的1000ms后滚动，但我在500ms就手动滚动时
        if (this.autoPlay) {
          clearTimeout(this.timer);
        }
      });
    },
    initDots() {
      this.dots = new Array(this.childLength);
    },
    play() {
      this.timer = setTimeout(() => { // 最好别用setInterval
        this.slider.next();
      }, this.interval);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setSliderWidth();
      this.initSlider();
      this.initDots();

      if (this.autoPlay) {
        this.play();
      }
    });

    window.addEventListener('resize', () => { // 监听页面是否改变，更新slider组件
      if (!this.slider) { // 如果还未初始化，就跳过
        return false;
      }
      this.setSliderWidth(true);
      this.slider.refresh();
      return true;
    });
  },
  activated() { // keep-alive情况下进入组件时清理定时器
    clearTimeout(this.timer);
    if (this.autoPlay) {
      this.play();
    }
  },
  deactivated() { // 同理
    clearTimeout(this.timer);
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
  .dots {
    position: absolute;
    left: 0;
    right: 0;
    bottom: .32rem;
    text-align: center;
    .dot {
      display: inline-block;
      height: .266667rem;
      width: .266667rem;
      margin: 0 .106667rem;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: .4rem;
        border-radius: 25%;
        background: $color-text-ll;
      }
    }
  }
}
</style>

