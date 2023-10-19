import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'
import Dashboard from './views/Dashboard.vue'
import Forms from './views/Forms.vue'
import Tables from './views/Tables.vue'
import UIElements from './views/UIElements.vue'
import Login from './views/Login.vue'
import Modal from './views/Modal.vue'
import Card from './views/Card.vue'
import Blank from './views/Blank.vue'
import Register from './views/Register.vue'
import ForgotPass from './views/ForgotPass.vue'
import ChangePass from './views/ChangePass.vue'
import Donation from './views/Donation.vue'
import { useAppStore } from './stores/application'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty', requiresAuth: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { layout: 'empty', requiresAuth: false },
  },
  {
    path: '/recuperacao',
    name: 'ForgotPass',
    component: ForgotPass,
    meta: { layout: 'empty', requiresAuth: false },
  },
  {
    path: '/alterar-senha/:token',
    name: 'ChangePass',
    component: ChangePass,
    meta: { layout: 'empty', requiresAuth: false },
    beforeEnter(to) {
      const auth = useAppStore()
      const { setForgotToken } = auth
      const [, , token] = to.path.split('/')
      const encodedString = token.replace(/\%20/g, '.')
      setForgotToken(encodedString)
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/forms',
    name: 'Forms',
    component: Forms,
    meta: { requiresAuth: true },
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Card,
    meta: { requiresAuth: true },
  },
  {
    path: '/tables',
    name: 'Tables',
    component: Tables,
    meta: { requiresAuth: true },
  },
  {
    path: '/ui-elements',
    name: 'UIElements',
    component: UIElements,
    meta: { requiresAuth: true },
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal,
    meta: { requiresAuth: true },
  },
  {
    path: '/blank',
    name: 'Blank',
    component: Blank,
    meta: { requiresAuth: true },
  },
  {
    path: '/donation',
    name: 'Doação',
    component: Donation,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAppStore()
  const { getToken } = storeToRefs(auth)
  if (to.meta.requiresAuth && !getToken.value)
    return { name: 'Login' }
  if (to.name === 'Login' && getToken.value)
    return { name: 'Dashboard' }
  // return { name: 'Login' }
})

export default router
