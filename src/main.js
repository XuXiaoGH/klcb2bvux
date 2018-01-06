// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import VCharts from 'v-charts'//图表
import router from './router/index'

Vue.use(VueRouter);
/* const router = new VueRouter({
  routes
}) */
Vue.use(VCharts);//图表

FastClick.attach(document.body)

Vue.config.productionTip = false


/* 公告列表时间过滤器 | 格式2017-7-20 10:29:16 */
Vue.filter('time_data', function (value) {
	let d = new Date(parseInt(value) * 1000)
	let arr = d.getFullYear() + "-" + ((d.getMonth()+1)<10?"0":"") + (d.getMonth() + 1) + "-" + (d.getDate()<10?"0":"") + d.getDate() + " " + (d.getHours()<10?"0":"") + d.getHours() + ":" + (d.getMinutes()<10?"0":"") + d.getMinutes() + ":" + (d.getSeconds()<10?"0":"") + d.getSeconds()
	return arr
})


/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
 