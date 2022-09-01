import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=>import('../views/Home/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    component:()=>import('../views/Login/login.vue'),
    beforeEnter: (to, from, next) => {
      //如果已经登录，跳转首页
      if(localStorage.isLogin === 'true'){
        next({name: 'home'})
      }else{
        next()
      }
    }
  },

  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    component:()=>import('../views/Register/Register.vue'),
    beforeEnter: (to, from, next) => {
      //如果已经登录，跳转首页
      if(localStorage.isLogin === 'true'){
        next({name: 'home'})
      }else{
        next()
      }
    }
  },

  {
    path:'/shop/:id',
    name:'shop',
    component:()=>import('../views/shop/Shop.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  if(localStorage.isLogin === 'true' ||  to.name === 'login' || to.name === 'register'){
    next()
  }else{
    next({name:'login'})
  }
})

export default router
