import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import CreateCourse from '../components/CreateCourse'
import UserInfo from '../components/UserInfo'
import Register  from '../components/Register'
import Detail  from '../components/Detail'
import UserCourse from '../components/UserCourse'

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: '/Home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/CreateCourse',
      name: 'CreateCourse',
      component: CreateCourse
    },
    {
      path: '/UserInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/UserCourse',
      name: 'UserCourse',
      component: UserCourse
    },
  ]
})
