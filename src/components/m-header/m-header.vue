<template>
  <header class="m-header">
    <h1 class="m-header-text">Music Player</h1>
    <router-link
      tag="div"
      class="m-header-icon"
      to="/user">
      <i class="fa fa-user"></i>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'm-header',
};
</script>

<style lang="scss" scoped>
// style中以 ~ 开头，其后的部分将会被看作模块依赖。这意味着你可以用该特性来引用一个 node 依赖中的资源
// style中以 @ 开头，报错
// style中以 ~@ 开头， 与 script 中用 @ 等价
@import '~@/common/style/variable.scss';
@import '~@/common/style/mixin.scss';

.m-header {
  position: relative;
  line-height: 1.066667rem; // 80px
  text-align: center;
  color: $color-text;
  border-bottom: 1px solid gray;
  @include font-dpr($font-size-large-x);
  .m-header-text {
    display: inline-block;
  }
  .m-header-icon {
    position: absolute;
    top: 0;
    right: .266667rem;
    color: $color-theme;
  }
}
</style>
