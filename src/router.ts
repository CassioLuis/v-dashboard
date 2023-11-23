import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import landingLayoutRoutes from '@/components/layouts/LandingPage/routes'
import authLayoutRoutes from '@/components/layouts/AuthPage/routes'
import dashboardLayoutRoutes from '@/components/layouts/Dashboard/routes'

const routes: RouteRecordRaw[] = [
  ...landingLayoutRoutes,
  ...authLayoutRoutes,
  ...dashboardLayoutRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const token = Cookies.get('token')
  if (to.meta.requiresAuth && !token)
    return { name: 'Login' }
  if (to.name === 'Login' && token)
    return { name: 'Home' }
})

export default router
