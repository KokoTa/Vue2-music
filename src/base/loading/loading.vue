<template>
  <div class="loading-wrap">
    <div class="loading-content">
      <img class="loading-img" src="/static/loading/loading.gif" alt="#">
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
};
</script>

<style lang="scss" scoped>
.loading-wrap {
  position: absolute;
  background: $color-background;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 999;
  .loading-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .loading-img {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
