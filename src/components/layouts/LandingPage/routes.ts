import * as views from './views'

export default [
  {
    path: '/',
    name: 'Início',
    component: views.Inicio,
    meta: { layout: 'LandingLayout' },
  },
  {
    path: '/info',
    name: 'Info',
    beforeEnter() {
      window.location.href = 'https://infos.pwblackstar.com/'
    },
    component: views.Info,
    // meta: {
    //   layout: 'LandingLayout',
    // },
  },
  {
    path: '/download',
    name: 'Download',
    component: views.Download,
    meta: { layout: 'LandingLayout' },
  },
  {
    path: '/donation',
    name: 'Doação',
    component: views.Inicio,
    meta: { layout: 'LandingLayout' },
  },
  {
    path: '/register',
    name: 'Registro',
    component: () => import('@/components/layouts/AuthPage/views/Register.vue'),
    meta: { layout: 'AuthLayout' },
  },
]
