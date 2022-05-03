import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
/* add font awesome icon component */
createApp(App)
.use(router)
.mount('#app')
