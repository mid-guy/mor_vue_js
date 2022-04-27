import { createRouter, createWebHistory } from "vue-router";

import Home from '@/views/Home/index.vue'
import SignIn from '@/views/SignIn/index.vue'
import SignUp from '@/views/SignUp/index.vue'
import Cookies from "js-cookie";

const routes = [
  { path: '/', name: 'Home', component:  Home },
  { path: '/sign-in', name: 'SignIn', component: SignIn },
  { path: '/sign-up', name: 'SignUp', component: SignUp }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  const isAuthenticated = Cookies.get('auth_token')
  if ( to.name !== 'SignIn' && !isAuthenticated ) next ({ name: 'SignIn' })
  else next()
})

export default router