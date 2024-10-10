import createPersistedState from 'pinia-plugin-persistedstate'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import axios from 'axios'
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

//inicio vuetify
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import { es } from 'vuetify/locale';

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: 'es',
    fallback: 'sv', // Cambia esto si deseas un idioma de respaldo diferente
    messages: { es }, // Usa el idioma español aquí
  },
 
})
//fin vuetify 
//Configuraciones de axios
const baseBackend = import.meta.env.VITE_BACKEND_API;
window.axios = axios
window.axios.defaults.baseURL = baseBackend
window.axios.defaults.headers.common['Accept'] = 'application/json'
window.axios.defaults.headers.common['Content-Type'] = 'application/json'
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.withCredentials = true

//Persistencia de credenciales en el sistema web
const pinia = createPinia()
pinia.use(({store}) => {
    store.router = markRaw(router)
})
pinia.use(createPersistedState)


const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify) //vutify
app.mount('#app')
