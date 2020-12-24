import Vue from 'vue'
import App from './App.vue'
import echarts from 'echarts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);




import loveString from './utils/filters'
console.log(loveString.love())
import { _a,_b,_c,_d, _e } from './utils/filters'

console.log( _e + _c + _a + _d + _b)



Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false
// Vue.prototype.$echarts = window.Echarts

new Vue({
  render: h => h(App),
}).$mount('#app')
