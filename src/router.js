import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/newMessage',
      name: 'newMessage',
      component: () => import('./views/NewMessage.vue')
    },
    {
      path: '/newLeave',
      name: 'newLeave',
      component: () => import('./views/NewLeave.vue')
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import('./views/Teacher.vue')
    },
    {
      path: '/approve',
      name: 'approve',
      component: () => import('./views/Approve.vue')
    },
    {
      path: '/leaveApprove',
      name: 'leaveApprove',
      component: () => import('./views/LeaveApprove.vue')
    },
    {
      path: '/approveDetail',
      name: 'approveDetail',
      component: () => import('./views/ApproveDetail.vue')
    },
    {
      path: '/teacherLeave',
      name: 'teacherLeave',
      component: () => import('./views/TeacherLeave.vue')
    },
    {
      path: '/releaseNotice',
      name: 'releaseNotice',
      component: () => import('./views/ReleaseNotice.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue')
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import('./views/Loading.vue')
    }
  ]
})
