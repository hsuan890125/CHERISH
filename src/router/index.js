import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/nav',
    component: () => import('../views/Nav.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/HomeView.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  // {
  //   path: '/login',
  //   component: () => import('../views/Login.vue'),
  // },
  {
    path: '/dashboard',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'login',
        meta: {
          showfather: false
        },
        component: () => import('../views/Login.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/Orders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/Coupons.vue'),
      }
    ],
    meta: {
      showfather: true
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
