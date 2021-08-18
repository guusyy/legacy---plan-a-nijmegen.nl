const c1 = () => import(/* webpackChunkName: "page--src-templates-article-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\templates\\Article.vue")
const c2 = () => import(/* webpackChunkName: "page--src-templates-category-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\templates\\Category.vue")
const c3 = () => import(/* webpackChunkName: "page--src-pages-flexwerken-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\flexwerken.vue")
const c4 = () => import(/* webpackChunkName: "page--src-pages-bar-restaurant-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\bar-restaurant.vue")
const c5 = () => import(/* webpackChunkName: "page--node-modules-gridsome-app-pages-404-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\node_modules\\gridsome\\app\\pages\\404.vue")
const c6 = () => import(/* webpackChunkName: "page--src-pages-index-vue" */ "C:\\Users\\guusn\\Documents\\projects\\plan-a-nijmegen.nl\\frontend\\src\\pages\\Index.vue")

export default [
  {
    path: "/article/what-s-inside-a-black-hole/",
    component: c1
  },
  {
    path: "/article/we-love-pizza/",
    component: c1
  },
  {
    path: "/article/the-internet-s-own-boy/",
    component: c1
  },
  {
    path: "/article/this-shrimp-is-awesome/",
    component: c1
  },
  {
    path: "/category/tech/",
    component: c2
  },
  {
    path: "/category/story/",
    component: c2
  },
  {
    path: "/category/nature/",
    component: c2
  },
  {
    path: "/category/news/",
    component: c2
  },
  {
    path: "/article/a-bug-is-becoming-a-meme-on-the-internet/",
    component: c1
  },
  {
    path: "/category/food/",
    component: c2
  },
  {
    path: "/article/beautiful-picture/",
    component: c1
  },
  {
    path: "/flexwerken/",
    component: c3
  },
  {
    path: "/bar-restaurant/",
    component: c4
  },
  {
    name: "404",
    path: "/404/",
    component: c5
  },
  {
    name: "home",
    path: "/",
    component: c6
  },
  {
    name: "*",
    path: "*",
    component: c5
  }
]
