import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/manifests',
    name: 'manifests',
    component: () => import('../views/manifestsList.vue')
  },
  {
    path: '/manifests/:id',
    name: 'details',
    component: () => import('../components/chartDetails.vue')
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import('../views/exampleChart.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
