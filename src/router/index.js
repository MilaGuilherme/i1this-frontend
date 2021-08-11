import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Products from '../views/Products.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import CreateProductForm from '../components/CreateProductForm.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: "/signin",
        component: SignIn,
      },
      {
        path: "/signup",
        component: SignUp,
      },
      {
        path: "/newproduct",
        component: CreateProductForm,
      }
    ]
  }, {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: "/products/:id",
    component: Product,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
