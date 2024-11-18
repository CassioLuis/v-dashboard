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
    meta: {
      layout: 'LandingLayout',
    },
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
  {
    path: '/vote-top-100-server',
    name: 'Vote Top-100 Servers',
    beforeEnter() {
      window.location.href = 'https://www.xtremetop100.com/in.php?site=1132376500'
    },
    component: views.Info,
    meta: {
      adcStyle: 'bg-gradient-to-r from-emerald-300 to-emerald-500',
    },
  },
]
