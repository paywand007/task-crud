 
import App from '../App.vue'
import AddEditVue from '@/components/List/AddEdit.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:App,
    } ,  {
      path: "/AddEdit/:id",
      name: "AddEdit",
      component: AddEditVue,
    },
     {
      path: "/AddEdit/:id?",
      name: "AddEdit",
      component: AddEditVue,
    },
  ]
})

export default router
