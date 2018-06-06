<template>
  <div class="search-box">
    <i class="icon fas fa-search fa-lg">
    </i>
    <input
      class="search-input"
      type="text"
      v-model.trim="searchInfo"
      :placeholder="placeholder">
    <i
      class="icon"
      :class="{ 'fas fa-times fa-lg': searchInfo }"
      @click="clearInfo">
    </i>
  </div>
</template>

<script>
export default {
  name: 'search-box',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchInfo: '',
    };
  },
  methods: {
    clearInfo() { // 删除搜索信息
      this.searchInfo = '';
    },
    setSearchInfo(info) { // 设置搜索信息
      this.searchInfo = info;
    },
  },
  created() {
    this.$watch('searchInfo', (info) => { // 传出搜索信息
      this.$emit('searchInfo', info);
    });
  },
};
</script>


<style lang="scss" scoped>
.search-box {
  height: 1.066667rem; // 40px
  margin: .266667rem .533333rem; // 10px 20px
  line-height: 1.066667rem;
  text-align: center;
  background: $color-highlight-background;
  display: flex;
  align-items: center;
  border-radius: 10px;
  .search-input {
    flex: 1;
    height: .666667rem;
    background: transparent;
    border: 1px solid transparent;
    outline: none;
    @include font-dpr($font-size-large);
    color: $color-text-d;
    box-sizing: border-box;
    &:focus {
      border: 1px solid $color-text-d;
    }
  }
  .icon {
    width: 40px;
  }
}
</style>

