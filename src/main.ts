import { createApp } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleNotch, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './assets/alerts.css'
import { useAppStore } from './stores/application'

import DashboardLayout from './components/DashboardLayout.vue'
import EmptyLayout from './components/EmptyLayout.vue'

library.add(faUserSecret, faCircleNotch)

const pinia = createPinia()
const app = createApp(App)
app.provide('pinia', pinia)
app.provide('useAppStore', useAppStore)
app.provide('storeToRefs', storeToRefs)

app.use(pinia)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)
app.use(router)
app.mount('#app')
