const c1 = () => import(/* webpackChunkName: "page--src-pages-ruimte-huren-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\ruimte-huren.vue")
const c2 = () => import(/* webpackChunkName: "page--src-pages-privacy-beleid-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\privacy-beleid.vue")
const c3 = () => import(/* webpackChunkName: "page--src-pages-over-ons-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\over-ons.vue")
const c4 = () => import(/* webpackChunkName: "page--src-pages-membership-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\membership.vue")
const c5 = () => import(/* webpackChunkName: "page--src-pages-eten-drinken-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\eten-drinken.vue")
const c6 = () => import(/* webpackChunkName: "page--src-pages-flexwerken-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\flexwerken.vue")
const c7 = () => import(/* webpackChunkName: "page--src-pages-disclaimer-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\disclaimer.vue")
const c8 = () => import(/* webpackChunkName: "page--src-pages-colofon-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\colofon.vue")
const c9 = () => import(/* webpackChunkName: "page--src-pages-community-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\community.vue")
const c10 = () => import(/* webpackChunkName: "page--src-pages-contact-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\Contact.vue")
const c11 = () => import(/* webpackChunkName: "page--src-pages-algemene-voorwaarden-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\algemene-voorwaarden.vue")
const c12 = () => import(/* webpackChunkName: "page--src-pages-404-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\404.vue")
const c13 = () => import(/* webpackChunkName: "page--src-pages-index-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\Index.vue")

export default [
  {
    path: "/ruimte-huren/",
    component: c1
  },
  {
    path: "/privacy-beleid/",
    component: c2
  },
  {
    path: "/over-ons/",
    component: c3
  },
  {
    path: "/membership/",
    component: c4
  },
  {
    path: "/eten-drinken/",
    component: c5
  },
  {
    path: "/flexwerken/",
    component: c6
  },
  {
    path: "/disclaimer/",
    component: c7
  },
  {
    path: "/colofon/",
    component: c8
  },
  {
    path: "/community/",
    component: c9
  },
  {
    path: "/contact/",
    component: c10
  },
  {
    path: "/algemene-voorwaarden/",
    component: c11
  },
  {
    name: "404",
    path: "/404/",
    component: c12
  },
  {
    name: "home",
    path: "/",
    component: c13
  },
  {
    name: "*",
    path: "*",
    component: c12
  }
]
