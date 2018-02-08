// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import fastclick from 'fastclick';
import axios from 'axios';
import infiniteScroll from 'vue-infinite-scroll';
import App from './App';
import router from './router';
import './common/style/base.scss';

fastclick.attach(document.body); // 取消移动端点击的300ms延迟
Vue.prototype.axios = axios; // 挂载axios到Vue上
Vue.use(infiniteScroll); // 下拉加载插件

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
