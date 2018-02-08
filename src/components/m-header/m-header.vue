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
@import '~@/common/style/variable.scss'; // 不加~会以这个文件夹作为相对路径，加了之后会当作模块路径处理（也就是以项目根目录作为相对路径）
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
