<template>
  <div class="song-list">
    <ul class="song-ul">
      <li class="song-item"
      v-for="(item, index) in songs"
      :key="index"
      @click="selectItem(item, index)">
        <div class="content">
          <h2 class="content-header">{{ item.songName }}</h2>
          <p class="content-desc">{{ item.singerName }} - {{ item.alName }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'song-list',
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
      rank: {
        type: Boolean,
        default: false,
      },
    },
  },
  methods: {
    selectItem(item, index) {
      this.$emit('select', item, index); // 基础组件都不会写逻辑，所以把数据外发到逻辑组件中
    },
  },
};
</script>

<style lang="scss">
.song-list {
  .song-ul {
    .song-item {
      color: $color-text;
      display: flex;
      height: 1.706667rem;
      .content {
        overflow: hidden;
        .content-header {
          @include font-dpr($font-size-medium-x);
          @include no-wrap;
        }
        .content-desc {
          color: $color-text-d;
          margin-top: .266667rem;
          @include font-dpr($font-size-medium);
          @include no-wrap;
        }
      }
    }
  }
}
</style>

