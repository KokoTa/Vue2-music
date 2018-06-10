<template>
  <div class="search-history-list">
    <ul>
      <li
        class="history-item"
        v-for="(item, index) in historyData"
        :key="index"
        @click="selectItem(item)">
        {{ item.name }} - {{ item.singer }}
        <span
          class="delete-item"
          @click.stop="deleteItem(item)">
          X
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'search-history-list',
  props: {
    historyData: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item);
    },
    deleteItem(item) {
      this.$emit('delete', item);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-history-list {
  height: calc(100% - 2.933333rem);
  overflow: scroll;
  & .history-item {
    padding: .266667rem 0;
    @include font-dpr($font-size-medium);
    color: $color-text-d;
    & .delete-item {
      float: right;
    }
  }
}
</style>

