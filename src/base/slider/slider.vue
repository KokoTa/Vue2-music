<template>
  <section class="slider">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <slot></slot>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </section>
</template>

<script>
// swiper最好作为静态资源存放
import 'swiper/dist/css/swiper.min.css';
import Swiper from 'swiper';

export default {
  name: 'slider',
  data() {
    return {
      mySwiper: null,
    };
  },
  props: {
    sliderUpdate: { // 获得动态数据后更新swiper组件
      type: Boolean,
      default: false,
    },
  },
  watch: {
    sliderUpdate() {
      this.$nextTick(() => { // 等待DOM更新后再更新swiper组件
        this.mySwiper.update();
      });
    },
  },
  mounted() {
    this.mySwiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        bulletActiveClass: 'bullet-active',
      },
      autoplay: true,
      effect: 'fade',
    });
  },
};
</script>

<style lang="scss" scoped>
.slider {
  width: 100%; // 不设置高度，让图片把它撑开
  background: $color-background;
  overflow: hidden;
  .swiper-container {
    width: 100%;
    height: 100%;
  }
}
</style>
