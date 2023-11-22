import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/widgets'
    },
    {
      path: '/widgets',
      name: 'widgets',
      component: () => import('../views/WidgetView.vue')
    }
  ]
})

export default router
