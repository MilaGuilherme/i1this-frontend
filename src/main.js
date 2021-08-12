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
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';
import Divider from 'primevue/divider';
import Carousel from 'primevue/carousel';
import Badge from 'primevue/badge';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Chip from 'primevue/chip';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import MultiSelect from 'primevue/multiselect';
import Galleria from 'primevue/galleria';
import Calendar from 'primevue/calendar';
import InputMask from 'primevue/inputmask';
import DataView from 'primevue/dataview';




createApp(App)
    .use(store)
    .use(router)
    .use(PrimeVue)
    .use(PrimeVue)
    .use(ToastService)
    .use(VuelidatePlugin)
    .component("Button", Button)
    .component("Calendar", Calendar)
    .component("Carousel", Carousel)
    .component("Galleria", Galleria)
    .component("DataView", DataView)
    .component("Checkbox", Checkbox)
    .component("Chip", Chip)
    .component("Column", Column)
    .component("DataTable", DataTable)
    .component("InputText", InputText)
    .component("InputMask", InputMask)
    .component("Textarea", Textarea)
    .component("Password", Password)
    .component("InputNumber", InputNumber)
    .component("MultiSelect", MultiSelect)
    .component("Toast", Toast)
    .component("Divider", Divider)
    .component("Menubar", Menubar)
    .component("Badge", Badge)
    .component("Menu", Menu)
    .component("Dialog", Dialog)
    .mount('#app')
