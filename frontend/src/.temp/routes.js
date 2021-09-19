const c1 = () => import(/* webpackChunkName: "page--src-pages-membership-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\Membership.vue")
const c2 = () => import(/* webpackChunkName: "page--src-pages-flexwerken-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\flexwerken.vue")
const c3 = () => import(/* webpackChunkName: "page--src-pages-bar-restaurant-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\bar-restaurant.vue")
const c4 = () => import(/* webpackChunkName: "page--node-modules-gridsome-app-pages-404-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\node_modules\\gridsome\\app\\pages\\404.vue")
const c5 = () => import(/* webpackChunkName: "page--src-pages-index-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\Index.vue")

export default [
  {
    path: "/membership/",
    component: c1
  },
  {
    path: "/flexwerken/",
    component: c2
  },
  {
    path: "/bar-restaurant/",
    component: c3
  },
  {
    name: "404",
    path: "/404/",
    component: c4
  },
  {
    name: "home",
    path: "/",
    component: c5
  },
  {
    name: "*",
    path: "*",
    component: c4
  }
]
