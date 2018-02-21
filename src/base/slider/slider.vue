<template>
  <!-- Base by swiper -->
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
        // bulletActiveClass: 'bullet-active', // 无效，会被 .swiper-pagination-bullet 屏蔽
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false, // 操作后是否停止自动切换
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.slider {
  width: 100%; // 不设置高度，让图片把它撑开
}
</style>
