import Vue from 'vue';
import Router from 'vue-router';

const Recommend = () => import('@/components/recommend/recommend');
const Singer = () => import('@/components/Singer/Singer');

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
    },
  ],
});
