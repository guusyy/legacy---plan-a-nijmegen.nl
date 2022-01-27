const c1 = () => import(/* webpackChunkName: "page--src-pages-ruimte-huren-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\ruimte-huren.vue")
const c2 = () => import(/* webpackChunkName: "page--src-pages-over-ons-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\over-ons.vue")
const c3 = () => import(/* webpackChunkName: "page--src-pages-eten-drinken-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\eten-drinken.vue")
const c4 = () => import(/* webpackChunkName: "page--src-pages-flexwerken-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\flexwerken.vue")
const c5 = () => import(/* webpackChunkName: "page--src-pages-community-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\community.vue")
const c6 = () => import(/* webpackChunkName: "page--src-pages-contact-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\Contact.vue")
const c7 = () => import(/* webpackChunkName: "page--src-pages-abonnementen-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\Abonnementen.vue")
const c8 = () => import(/* webpackChunkName: "page--src-pages-404-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\404.vue")
const c9 = () => import(/* webpackChunkName: "page--src-pages-index-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\Index.vue")

export default [
  {
    path: "/ruimte-huren/",
    component: c1
  },
  {
    path: "/over-ons/",
    component: c2
  },
  {
    path: "/eten-drinken/",
    component: c3
  },
  {
    path: "/flexwerken/",
    component: c4
  },
  {
    path: "/community/",
    component: c5
  },
  {
    path: "/contact/",
    component: c6
  },
  {
    path: "/abonnementen/",
    component: c7
  },
  {
    name: "404",
    path: "/404/",
    component: c8
  },
  {
    name: "home",
    path: "/",
    component: c9
  },
  {
    name: "*",
    path: "*",
    component: c8
  }
]
