import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Nav.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/UserHome.vue')
      },
      {
        path: 'allProducts',
        component: () => import('../views/UserAllProducts.vue'),
      },
      {
        path: 'product/:productId',
        component: () => import('../views/UserProduct.vue'),
      }
    ]
  },
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
