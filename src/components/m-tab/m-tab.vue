<template>
  <nav class="m-tab">
    <router-link tag="div" class="m-tab-item" to="/recommend">
      <span class="m-tab-span">推荐</span>
    </router-link>
    <router-link tag="div" class="m-tab-item" to="/singer">
      <span class="m-tab-span">歌手</span>
    </router-link>
    <router-link tag="div" class="m-tab-item" to="/rank">
      <span class="m-tab-span">排行</span>
    </router-link>
    <router-link tag="div" class="m-tab-item" to="/search">
      <span class="m-tab-span">搜索</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'm-tab',
};
</script>

<style lang="scss" scoped>
.m-tab {
  display: flex;
  line-height: 1.066667rem;
  @include font-dpr($font-size-medium);
  color: $color-text-d;
  .m-tab-item {
    flex: 1;
    text-align: center;
    &.router-link-active {
      .m-tab-span {
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
        padding-bottom: .133333rem;
      }
    }
  }
}
</style>
