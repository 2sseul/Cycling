import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VCalendar from "v-calendar";

Vue.prototype.$http = axios
Vue.use(VCalendar);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  VCalendar,
  render: h => h(App)
}).$mount('#app')
