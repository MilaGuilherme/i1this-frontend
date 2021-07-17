import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'


import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/saga-blue/theme.css'
import './assets/style.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import Menubar from 'primevue/menubar'
import Card from 'primevue/card'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Toolbar from 'primevue/toolbar'
import Dialog from 'primevue/dialog';

createApp(App)
.use(Vuelidate)
.use(store)
.use(router)
.use(PrimeVue)
.use(PrimeVue)
.use(ToastService)
.component("InputText",InputText)
.component("Card",Card)
.component("Toast",Toast)
.component("Menubar",Menubar)
.component("Menu",Menu)
.component("Dialog",Dialog)
.component("Toolbar",Toolbar)
.component("Button",Button)
.mount('#app')
