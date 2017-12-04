import Vue from 'vue'
import Router from 'vue-router'
import EVPI from '@/views/EVPI'
import PersonalCenter from '@/views/PersonalCenter'
import CreacteRoom from '@/views/CreacteRoom'
import Login from '@/views/Login'
import JoinTeam from '@/views/JoinTeam'
import Rule from '@/views/Rule'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/EVPI',
      name: 'EVPI',
      component: EVPI
    },
    {
      path: '/PersonalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter
    },
    {
      path: '/CreacteRoom',
      name: 'CreacteRoom',
      component: CreacteRoom
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/JoinTeam',
      name: 'JoinTeam',
      component: JoinTeam
    },
    {
      path: '/Rule',
      name: 'Rule',
      component: Rule
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
  ]
})
