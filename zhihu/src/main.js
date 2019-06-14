// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// animate
import 'animate.css'

// axios
import axios from 'axios'
Vue.prototype.$axios = axios;

// 公共组件
import commonCom from './components/common'
for(var i in commonCom){
  Vue.component(i,commonCom[i])
}
// filter
import filter from './filter'
for(var i in filter){
  Vue.filter(i,filter[i])
}

// mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

// jquery
import $ from 'jquery'
Vue.prototype.$=$

// evenBus
Vue.prototype.ev = new Vue();


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
