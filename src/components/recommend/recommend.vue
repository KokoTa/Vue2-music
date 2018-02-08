<template>
  <article class="recommend">
    <slider :sliderUpdate="sliderUpdate">
      <div class="swiper-slide"
        v-for="(item, index) in banners"
        :key="index">
        <img class="banner-img" :src="item.pic" alt="#">
      </div>
    </slider>
    <div class="recommend-list">
      <h1>精品歌单推荐</h1>
      <ul class="list-content">
        <li class="list-item"
          v-for="(item, index) in recommends"
          :key="index">
          <div class="item-icon">
            <img :src="item.coverImgUrl" alt="#">
          </div>
          <div class="item-text">
            <h2 class="name">{{ item.name }}</h2>
            <p class="desc">{{ item.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
import api from '@/api/api';
import Slider from '@/base/slider/slider';

export default {
  name: 'recommend',
  components: {
    Slider,
  },
  data() {
    return {
      banners: [],
      sliderUpdate: false,
      recommends: [],
    };
  },
  methods: {
    getBanner() {
      this.axios.get(api.banner)
        .then((res) => {
          if (res.data.code === 200) {
            this.banners = res.data.banners;
            this.sliderUpdate = true;
            console.log(this.banners);
          } else {
            console.log('Bad request');
          }
        });
    },
    getRecommend() {
      this.axios.get(api.recommend)
        .then((res) => {
          if (res.data.code === 200) {
            this.recommends = res.data.playlists;
            console.log(res.data);
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
  height: calc(100% - 2.133333rem);
  overflow-y: scroll;
  .banner-img {
    width: 100%;
  }
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
}
</style>
