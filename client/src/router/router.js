import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register.vue')
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('../views/layout.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/home.vue')
        },
        {
          path: 'allSays',
          name: 'allSays',
          component: () => import('../views/allSays.vue')
        },
        {
          path: 'mySays/:userId',
          name: 'mySays',
          component: () => import('../views/mySays.vue')
        }
      ]
    },
    {
      path: '/sayDetail/:sayId',
      name: 'sayDetail',
      component: () => import('../views/sayDetail.vue')
    }
  ]
})
