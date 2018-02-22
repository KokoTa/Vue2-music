<template>
  <article class="recommend">
    <!-- scroll作为总内容的外部包裹层, :data监听数据变化来刷新scroll高度 -->
    <scroll class="scroll" ref="scroll" :data="recommends">
      <!-- scroll-conetnt作为总内容 -->
      <div class="scroll-content">
        <!-- swiper -->
        <!-- 不要用v-lazy加载，会产生样式错位，原因未知 -->
        <!-- <slider :sliderUpdate="sliderUpdate">
          <div class="swiper-slide"
            v-for="(item, index) in banners"
            :key="index">
            <img class="banner-img" :src="item.pic" alt="#">
          </div>
        </slider> -->
        <!-- better-scroll -->
        <div v-if="banners.length" class="slider-wrapper">
          <slider>
            <div v-for="(item, index) in banners" :key="index">
              <img :src="item.pic" alt="#">
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1>歌单推荐</h1>
          <ul class="list-content">
            <li class="list-item"
              v-for="(item, index) in recommends"
              :key="index">
              <div class="item-icon">
                <img v-lazy="item.coverImgUrl" alt="#">
              </div>
              <div class="item-text">
                <h2 class="name">{{ item.name }}</h2>
                <p class="desc">{{ item.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <loading v-show="loading"></loading>
  </article>
</template>

<script>
import api from '@/api/api';
// import Slider from '@/base/slider/slider';
import Slider from '@/base/slider/slider2';
import Loading from '@/base/loading/loading';
import Scroll from '@/base/scroll/scroll';

export default {
  name: 'recommend',
  components: {
    Slider,
    Loading,
    Scroll,
  },
  data() {
    return {
      banners: [],
      sliderUpdate: false, // 这个值用于swiper的走马灯中
      recommends: [],
    };
  },
  computed: {
    loading() {
      if (!this.banners.length && !this.recommends.length) {
        return true;
      }
      return false;
    },
  },
  methods: {
    getBanner() {
      this.axios.get(api.banner)
        .then((res) => {
          if (res.data.code === 200) {
            this.banners = res.data.banners;
            this.sliderUpdate = true;
          }
        });
    },
    getRecommend() {
      this.axios.get(api.recommend)
        .then((res) => {
          if (res.data.code === 200) {
            this.recommends = res.data.playlists;
            this.$nextTick(() => {
              this.$refs.scroll.refresh(); // 更新scroll组件高度
            });
          }
        });
    },
  },
  created() {
    this.getBanner();
    this.getRecommend();
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  // 调用fixed可以通过top/bottom来调整高度，relative和absolute不行
  position: fixed;
  width: 100%;
  top: 2.133333rem;
  bottom: 0;
  .scroll {
    height: 100%;
    overflow: hidden;
    // .banner-img {
    //   width: 100%;
    // }
    .recommend-list {
      h1 {
        @include font-dpr($font-size-medium);
        color: $color-theme;
        text-align: center;
        line-height: 1.333333rem;
      }
      .list-content {
        .list-item {
          display: flex;
          padding: 0 .533333rem .533333rem .533333rem;
          .item-icon {
            width: 1.6rem;
            height: 1.6rem;
            padding-right: .533333rem;
            img {
              height: 100%;
              width: 100%;
            }
          }
          .item-text {
            flex: 1;
            width: 1px; // flex：1将分配剩余空间，在此之前需要设定一个任意的width值
            .name {
              @include font-dpr($font-size-medium);
              line-height: 1.066667rem;
              color: $color-text;
              @include no-wrap();
            }
            .desc {
              @include font-dpr($font-size-small-s);
              color: $color-text-d;
              @include no-wrap();
            }
          }
        }
      }
    }
    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
  }

  .loading {
    height: 20px;
    width: 20px;
  }
}
</style>
