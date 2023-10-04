import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faCircleNotch)

import DashboardLayout from './components/DashboardLayout.vue'
import EmptyLayout from './components/EmptyLayout.vue'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)
app.use(router)
app.mount('#app')
