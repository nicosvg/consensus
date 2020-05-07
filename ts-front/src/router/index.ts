import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomePage from "../views/HomePage.vue";
import Elections from "@/views/Elections.vue"
import AddElection from "@/views/AddElection.vue"
import ElectionDetails from "@/views/ElectionDetails.vue"
import VoteForm from "@/views/VoteForm.vue"
import Results from "@/views/Results.vue"
import VoteConfirmation from "@/views/VoteConfirmation.vue"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: HomePage
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
  {
    name: 'voteForm',
    path: '/elections/:id/vote',
    component: VoteForm, props: true
  },
  {
    name: 'confirmation',
    path: '/elections/:id/confirmation',
    component: VoteConfirmation, props: true
  },
  {
    name: 'results',
    path: '/elections/:id/results',
    component: Results, props: true
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
