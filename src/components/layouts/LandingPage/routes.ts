import * as views from './views'

export default [
  {
    path: '/',
    name: 'Início',
    component: views.Inicio,
    meta: { layout: 'LandingLayout' },
  },
  // {
  //   path: '/info',
  //   name: 'Info',
  //   component: views.Info,
  //   meta: { layout: 'LandingLayout' },
  // },
  // {
  //   path: '/download',
  //   name: 'Download',
  //   component: views.Download,
  //   meta: { layout: 'LandingLayout' },
  // },
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
