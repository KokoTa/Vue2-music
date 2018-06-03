<template>
  <scroll class="list-scroll"
  :data="data"
  ref="scroll"
  :listen-scroll="true"
  @scroll="scroll"
  :probe-type="3">
    <!-- 分组 -->
    <ul>
      <li class="list-group"
      v-for="(group, index) in data"
      :key="index"
      :data-flag="index"
      ref="groups">
        <h2 class="group-title">分组 - {{ index }}</h2>
        <!-- 分组里的项 -->
        <ul>
          <li class="group-item"
          v-for="(item, index) in group"
          :key="index"
          @click="selectItem(item)">
            <img class="avatar" v-lazy="item.img1v1Url" alt="#">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 侧边栏 -->
    <ul class="list-nav"
    @touchstart="jump"
    @touchmove.stop.prevent="move">
      <li class="nav-item"
      v-for="(item, index) in data"
      :key="index"
      :data-flag="index"
      :class="{'nav-item-current': currentIndex === Number(index)}">
        {{ index }}
      </li>
    </ul>
    <!-- 固定栏 -->
    <h2 class="fixed-title" ref="fixed" v-show="fixShow">分组 - {{ currentIndex }}</h2>
    <loading v-show="loading"></loading>
  </scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll';
import Loading from '@/base/loading/loading';

export default {
  name: 'listview',
  components: {
    Scroll,
    Loading,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentIndex: 0, // 当前组
      groupsOffsetTop: [], // 组的offset集合
      fixShow: false, // 固定栏是否显示
    };
  },
  computed: {
    loading() {
      if (!this.data.length) {
        return true;
      }
      return false;
    },
  },
  methods: {
    refresh() { // 这个方法是给父组件调用来更新的
      this.$refs.scroll.refresh();
    },
    jump(e) {
      const index = e.target.dataset.flag;
      this.scrollToElement(this.$refs.groups[index]);
      this.currentIndex = Number(index);
    },
    move(e) {
      // 通过 elementFromPoint 获得目标元素
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const dom = document.elementFromPoint(x, y);
      // 是否得到一个dom，且这个dom是否包含某个样式类
      if (dom && dom.classList.contains('nav-item')) {
        const index = dom.dataset.flag;
        this.scrollToElement(this.$refs.groups[index]);
        this.currentIndex = Number(index);
      }
    },
    scrollToElement(...args) {
      this.$refs.scroll.scrollToElement(...args);
    },
    getGroupsOffsetTop() { // 获得每个分组相对于父元素最顶的距离
      this.$refs.groups.forEach((item) => {
        this.groupsOffsetTop.push(item.offsetTop);
      });
    },
    scroll(pos) {
      const offsetTop = -pos.y; // 滚动距离，返回值是负值
      const arr = this.groupsOffsetTop;
      for (let i = 0; i < arr.length; i += 1) {
        const now = arr[i];
        const next = arr[i + 1];
        // 判断是否在两个分组之间，最后一个组要特殊处理
        if ((offsetTop >= now && offsetTop <= next) || offsetTop > arr[arr.length - 1]) {
          // 同步右边导航栏高亮
          this.currentIndex = i;
          // 固定栏位移逻辑
          const fixed = this.$refs.fixed;
          const fixedHeight = fixed.offsetHeight;
          if (offsetTop >= next - fixedHeight && offsetTop <= next) { // 滚动的范围在固定栏高度中时
            const transY = fixedHeight - (next - offsetTop);
            fixed.style.transform = `translate3d(0, -${transY}px, 0)`;
          } else {
            fixed.style.transform = 'translate3d(0, 0, 0)';
          }
        }
      }
      // 固定栏显示逻辑
      if (offsetTop <= 0) {
        this.fixShow = false;
      } else {
        this.fixShow = true;
      }
    },
    selectItem(item) { // listview是基础组件，不参与业务逻辑（比如点击后发生的事情）
      this.$emit('select', item);
    },
  },
  watch: {
    data() { // 数据改变且DOM更新后获得offsetTop
      this.$nextTick(() => {
        this.getGroupsOffsetTop();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.list-scroll {
  position: relative;
  height: 100%;
  overflow: hidden;
  color: $color-text;
  .list-group {
    padding-bottom: .533333rem;
    .group-title {
      line-height: .8rem;
      padding-left: .533333rem;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .group-item {
      padding: .533333rem 0 0 .533333rem;
      display: flex;
      align-items: center;
      .avatar {
        width: 1.333333rem;
        height: 1.333333rem;
        border-radius: 50%;
      }
      .name {
        color: $color-text-l;
        padding-left: .533333rem;
      }
    }
  }
  .list-nav {
    color: $color-text;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    color: $color-text-d;
    background: $color-background;
    .nav-item {
      padding: .266667rem;
    }
    .nav-item-current {
      color: $color-theme;
    }
  }
  .fixed-title {
    width: 100%;
    line-height: .8rem;
    padding-left: .533333rem;
    color: $color-text-l;
    background: $color-highlight-background;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
