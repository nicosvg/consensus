import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomePage from "../views/HomePage.vue";
import Elections from "@/components/Elections.vue"
import AddElection from "@/components/AddElection.vue"
import ElectionDetails from "@/components/ElectionDetails.vue"
import VoteForm from "@/components/VoteForm.vue"

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
