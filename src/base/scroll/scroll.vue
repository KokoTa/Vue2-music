<template>
  <div class="wrapper" ref="wrapper">
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
      });

      if (this.listenScroll) {
        const me = this;
        this.scroll.on('scroll', (pos) => {
          // 切换时总是有机率出现无法滑动的BUG，此时的hasVerticalScroll为false，scrollHeight等值都为0
          // 原因可能是：http://blog.csdn.net/ohradiance/article/details/78509542
          if (!me.scroll.hasVerticalScroll) {
            me.scroll.refresh();
          }
          me.$emit('scroll', pos);
        });
      }
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll');
        });
      }
    },
    refresh() {
      if (this.scroll.refresh) this.scroll.refresh();
    },
    scrollToElement(dom) {
      if (this.scroll.scrollToElement) this.scroll.scrollToElement(dom);
    },
  },
  watch: {
    data() {
      setTimeout(() => { // 延迟加载或者nextTick都可以
        this.refresh();
      }, this.refreshDelay);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
