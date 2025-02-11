import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Elections from './components/Elections'
import Home from './components/Home'
import AddElection from './components/AddElection'
import ElectionDetails from './components/ElectionDetails'

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'electionsList',
    path: '/elections',
    component: Elections
  },
  {
    name: 'createElection',
    path: '/elections/create',
    component: AddElection
  },
  {
    name: 'electionDetails',
    path: '/elections/:id',
    component: ElectionDetails, props: true
  },
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
