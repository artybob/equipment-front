import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "../views/auth/Login.vue";
import UserCabinet from "../views/cabinet/UserCabinet.vue";
import {TOKEN_COOKIE} from "../utils/constants";
import Equipment from "../views/cabinet/Equipment.vue";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true,
      }
    },
    {
      path: '/equipment',
      name: 'equipment',
      component: Equipment,
      meta: {
        isAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  window.previousUrl = from.path

  const isAuth = window.$cookies.get(TOKEN_COOKIE);
  const requiredAuth = to.matched.some(record => record.meta.isAuth)
  const requiredGuest = to.matched.some(record => record.meta.guest)
  if (requiredAuth && !isAuth) {
    next('/login/')
  } else if (requiredGuest && isAuth) { //если юзер уже в системе и пытается получить доступ до роутов гостя
    next('/cabinet/')
  }
  next()
})

export default router
