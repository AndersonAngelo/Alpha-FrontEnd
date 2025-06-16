// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/components/HomePage.vue' 
import DetailPage from '@/components/DetailPage.vue'
import RegistrationPage from '@/components/RegistrationPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProductList
  },
  {
    path: '/edit/:id',
    name: 'EditProduct',
    component: DetailPage,
    props: true
  },
  {
    path: '/registrate',
    name: 'RegistrationPage',
    component: RegistrationPage,
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
