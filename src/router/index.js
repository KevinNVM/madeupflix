import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/SearchView.vue"),
  },
  {
    path: "/watch/:epsId",
    name: "watch",
    component: () => import("../views/WatchView.vue"),
  },
  {
    path: "/:animeId",
    name: "details",
    component: () => import("../views/DetailsView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (to.hash) {
          return resolve({ selector: to.hash });
        } else if (savedPosition) {
          return resolve(savedPosition);
        } else {
          resolve(
            document
              .getElementById("app")
              .scrollIntoView({ behavior: "smooth" })
          );
        }
      }, 100);
    });
  },
});

export default router;
