import { createApp } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleNotch, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import VueTheMask from 'vue-the-mask'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { useAppStore } from './stores/application'

import DashboardLayout from './components/layouts/Dashboard/DashboardLayout.vue'
import AuthLayout from './components/layouts/AuthPage/AuthLayout.vue'
import LandingLayout from './components/layouts/LandingPage/LandingLayout.vue'

library.add(faUserSecret, faCircleNotch)

const pinia = createPinia()
const app = createApp(App)
app.provide('pinia', pinia)
app.provide('useAppStore', useAppStore)
app.provide('storeToRefs', storeToRefs)

app.use(pinia)
app.use(VueTheMask)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component('DashboardLayout', DashboardLayout)
app.component('AuthLayout', AuthLayout)
app.component('LandingLayout', LandingLayout)
app.use(router)
app.mount('#app')
