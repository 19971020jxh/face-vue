// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueQrcode from '@chenfengyuan/vue-qrcode';
import VueAMap from 'vue-amap';
import qs from 'qs'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.component(VueQrcode.name, VueQrcode);
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '03a4090b06c311bebb7c2d9cbb3b2d50',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType','AMap.Geolocation','AMap.CitySearch'],
  v: '1.4.4',
  uiVersion:'1.0.11'
});

axios.defaults.baseURL="http://127.0.0.1:8081"

Vue.prototype.$axios=axios


Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
