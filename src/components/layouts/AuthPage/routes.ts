import * as views from './views'
import { useAppStore } from '@/stores/application'

export default [
  {
    path: '/login',
    name: 'Login',
    component: views.Login,
    meta: { layout: 'AuthLayout', requiresAuth: false, isSideMenuOption: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: views.Register,
    meta: { layout: 'AuthLayout', requiresAuth: false, isSideMenuOption: false },
  },
  {
    path: '/recuperacao',
    name: 'ForgotPass',
    component: views.ForgotPass,
    meta: { layout: 'AuthLayout', requiresAuth: false, isSideMenuOption: false },
  },
  {
    path: '/alterar-senha/:token',
    // path: '/alterar-senha',
    name: 'ChangePass',
    component: views.ChangePass,
    meta: { layout: 'AuthLayout', requiresAuth: false, isSideMenuOption: false },
    beforeEnter(to: any) {
      const auth = useAppStore()
      const { setForgotToken } = auth
      const [, , token] = to.path.split('/')
      const encodedString = token.replace(/\%20/g, '.')
      setForgotToken(encodedString)
    },
  },
]
