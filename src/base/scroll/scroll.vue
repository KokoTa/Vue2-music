<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
// https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#probetype
import BScroll from 'better-scroll';

export default {
  props: {
    probeType: {
      type: Number,
      default: 1,
    },
    click: {
      type: Boolean,
      default: true,
    },
    listenScroll: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: null,
    },
    pullup: {
      type: Boolean,
      default: false,
    },
    beforeScroll: {
      type: Boolean,
      default: false,
    },
    refreshDelay: {
      type: Number,
      default: 20,
    },
  },
  mounted() {
    this.initScroll();
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
      });

      if (this.listenScroll) { // 是否允许监听scroll事件
        const me = this;
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos);
        });
      }
    },
    refresh() {
      if (this.scroll.refresh) this.scroll.refresh();
    },
    scrollToElement(dom) {
      if (this.scroll.scrollToElement) this.scroll.scrollToElement(dom);
    },
    scrollTo(dom) {
      if (this.scroll.scrollTo) this.scroll.scrollTo(dom);
    },
  },
  watch: {
    data() {
      this.$nextTick(() => { // 等待DOM更新后刷新scroll
        this.refresh();
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
