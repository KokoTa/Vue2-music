import Vue from 'vue';
import Router from 'vue-router';

const Recommend = () => import('@/components/recommend/recommend');
const Singer = () => import('@/components/singer/singer');
const SingerDetail = () => import('@/components/singer-detail/singer-detail');

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
