import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Elections from './components/Elections'
import Home from './components/Home'

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  {path: '/', component: Home},
  {path: '/elections', component: Elections}
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
