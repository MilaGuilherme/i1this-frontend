import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VuelidatePlugin from '@vuelidate/core'


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
import Password from 'primevue/password'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Toolbar from 'primevue/toolbar'
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';
import Divider from 'primevue/divider';
import Tag from 'primevue/tag';
import Carousel from 'primevue/carousel';
import Badge from 'primevue/badge';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Chip from 'primevue/chip';

createApp(App)
    .use(store)
    .use(router)
    .use(PrimeVue)
    .use(PrimeVue)
    .use(ToastService)
    .use(VuelidatePlugin)
    .component("InputText", InputText)
    .component("DataTable", DataTable)
    .component("Column", Column)
    .component("Password", Password)
    .component("Chip", Chip)
    .component("Checkbox", Checkbox)
    .component("Tag", Tag)
    .component("Card", Card)
    .component("Toast", Toast)
    .component("Divider", Divider)
    .component("Menubar", Menubar)
    .component("Badge", Badge)
    .component("Menu", Menu)
    .component("Dialog", Dialog)
    .component("Carousel", Carousel)
    .component("Toolbar", Toolbar)
    .component("Button", Button)
    .mount('#app')
