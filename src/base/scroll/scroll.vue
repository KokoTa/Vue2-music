<template>
  <div ref="BS">
    <!-- slot里面需要放一个大于父元素(BS)的内容容器 -->
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
      if (!this.$refs.BS) { // 是否已初始化
        return;
      }
      this.scroll = new BScroll(this.$refs.BS, {
        probeType: this.probeType,
        click: true, // 解决安卓无法点击的问题
      });

      if (this.listenScroll) { // 是否监听滚动事件
        const me = this;
        this.scroll.on('scroll', (pos) => {
          // 切换时总是有机率出现无法滑动的BUG，此时的hasVerticalScroll为false，scrollHeight等值都为0
          // 原因可能是：http://blog.csdn.net/ohradiance/article/details/78509542，我们让其强制刷新
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
    refresh() { // 刷新
      if (this.scroll.refresh) this.scroll.refresh();
    },
    scrollToElement(dom, time) { // 滚动到某个DOM元素
      if (this.scroll.scrollToElement) this.scroll.scrollToElement(dom, time);
    },
    scrollTo(x, y, time, easing) { // 滚动到某个位置
      if (this.scroll.scrollTo) this.scroll.scrollTo(x, y, time, easing);
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
