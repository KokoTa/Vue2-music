// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Fastclick from 'fastclick';
import Axios from 'axios';
import InfiniteScroll from 'vue-infinite-scroll';
import VueLazyload from 'vue-lazyload';
import App from './App';
import router from './router';
import './common/style/base.scss';

Fastclick.attach(document.body); // 取消移动端点击的300ms延迟
Vue.prototype.axios = Axios; // 挂载axios到Vue上
Vue.use(InfiniteScroll); // 下拉加载插件
Vue.use(VueLazyload, { // 懒加载图片插件
  loading: 'http://via.placeholder.com/350x150',
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
