<template>
  <div ref="BS">
    <!-- slot里面需要放： 一个wrapper容器(不用设置样式，它会自适应BS的大小)，大于wrapper的内容容器 -->
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
      default() {
        return [];
      },
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
      if (!this.$refs.BS) {
        return;
      }
      this.scroll = new BScroll(this.$refs.BS, {
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
    data() { // 当有数据传入时进行刷新
      setTimeout(() => { // 延迟加载或者nextTick都可以
        this.refresh();
      }, this.refreshDelay);
    },
  },
};
</script>

<style lang="scss" scoped>
// BS的样式写在引用它的组件中
</style>
