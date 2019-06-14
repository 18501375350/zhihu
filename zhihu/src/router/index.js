import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '../components/pages/index'
import detail from '../components/pages/detail'
import collect from '../components/pages/collect'
import pinglun from '../components/pages/pinglun'

export default new Router({
  routes: [
    {
      path: '/index',
      component: index
    },
    {
      path: '/detail/:id',
      component: detail
    },
    {
      path: '/collect',
      component: collect
    },
    {
      path: '/pinglun/:id',
      component: pinglun
    },
    {
      path:'*',
      redirect:'/index'
    }
  ]
})
