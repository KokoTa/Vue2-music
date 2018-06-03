import Vue from 'vue';
import Router from 'vue-router';

const Recommend = () => import('@/components/recommend/recommend'); // 歌单推荐
const Singer = () => import('@/components/singer/singer'); // 歌手列表
const SingerDetail = () => import('@/components/singer-detail/singer-detail'); // 歌手详情
const Disc = () => import('@/components/disc-detail/disc-detail'); // 歌单详情

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend',
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc,
        },
      ],
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail,
        },
      ],
    },
  ],
});
