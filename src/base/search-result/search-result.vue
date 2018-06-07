<template>
  <div class="search-result" ref="list" @scroll="blurSearchBox()">
    <div class="content">
      <ul v-if="songs.length">
        <li
          class="song"
          v-for="(item, index) in songs"
          :key="index"
          @click="selectSong(item)">
          {{ item.name }} - {{ item.artists[0].name }}
        </li>
        <li
          class="song song-loading"
          v-show="!debounceFlag">
          Loading...
        </li>
      </ul>
      <loading v-else></loading>
    </div>
  </div>
</template>

<script>
import api from '@/api/api';
import Loading from '@/base/loading/loading';
import { mapActions } from 'vuex';

export default {
  name: 'search-result',
  components: {
    Loading,
  },
  props: {
    searchInfo: {
      type: String,
      default: '',
    },
    limit: {
      type: Number,
      default: 30,
    },
    type: {
      type: Number,
      default: 1,
    },
    offset: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      songs: [],
      debounceFlag: true, // 滚动事件节流：触发请求后，直到返回结果后才能进行下一次请求
    };
  },
  methods: {
    ...mapActions(['insertPlay']),
    selectSong(song) { // 选择歌曲后插入播放列表并播放
      this.insertPlay(song);
    },
    debounceFunction(func, delay) { // 搜索事件节流：每次触发就延迟执行
      let timer = null;

      return (...args) => {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    blurSearchBox() { // 滚动时使search-box组件焦点清除，关闭手机端默认的键盘
      this.$emit('blurSearchBox', true);
    },
  },
  created() {
    this.$watch('searchInfo', this.debounceFunction((info) => { // 写法原因见下
      this.songs = [];
      const url = `${api.search}${info}&limit=${this.limit}&type=${this.type}&offset=${this.offset}`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.code === 200) {
            this.songs = res.data.result.songs;
          }
        });
    }, 1000));
  },
  mounted() { // 下拉加载功能
    const list = this.$refs.list;
    let count = 1; // 自增值

    list.addEventListener('scroll', (e) => {
      const maxScrollTop = e.target.scrollHeight - e.target.clientHeight;
      const scrollTop = e.target.scrollTop;

      // 注意这里 maxScrollTop 可能会得到 0，原因是未 loading 视图出现时 scrollHeight === clientHeight
      // console.log(e.target.scrollHeight, e.target.clientHeight, e.target.scrollTop);
      if (maxScrollTop && this.debounceFlag && scrollTop >= maxScrollTop - 100) {
        this.debounceFlag = false;

        const offset = count * this.limit;
        count += 1;

        const url = `${api.search}${this.searchInfo}&limit=${this.limit}&type=${this.type}&offset=${offset}`;
        this.axios.get(url)
          .then((res) => {
            if (res.data.code === 200) {
              this.songs.push(...res.data.result.songs);
              this.debounceFlag = true;
            }
          });
      }
    });
  },
  // 不用这种方法监听，因为无法进行节流包装，直接在created时手动监听
  // watch: {
  //   searchInfo(info) { // 搜索
  //     this.songs = [];
  //     const url = `${api.search}${info}
  //                  &limit=${this.limit}
  //                  &type=${this.type}
  //                  &offset=${this.offset}`;
  //     this.axios.get(url)
  //       .then((res) => {
  //         if (res.data.code === 200) {
  //           this.songs = res.data.result.songs;
  //         }
  //       });
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.search-result {
  height: 100%;
  width: 100%;
  background: $color-background;
  overflow: scroll;
  .content {
    .song {
      padding: .266667rem;
      @include font-dpr($font-size-medium-x);
      color: $color-text-l;
    }
    .song-loading {
      @include font-dpr($font-size-large);
      text-align: center;
    }
  }
}
</style>

