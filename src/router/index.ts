import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProyectosView from '@/views/ProyectosView.vue'
import ProyectoDetalleView from '@/views/ProyectoDetalleView.vue'
import AvisoLegalView from '@/views/AvisoLegalView.vue'
import PoliticaCookiesView from '@/views/PoliticaCookiesView.vue'
import PoliticaPrivacidadView from '@/views/PoliticaPrivacidadView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/proyectos',
      name: 'proyectos',
      component: ProyectosView,
    },
    {
      path: '/proyectos/:slug',
      name: 'proyecto-detalle',
      component: ProyectoDetalleView,
    },
    {
      path: '/aviso-legal',
      name: 'aviso-legal',
      component: AvisoLegalView,
    },
    {
      path: '/politica-cookies',
      name: 'politica-cookies',
      component: PoliticaCookiesView,
    },
    {
      path: '/politica-privacidad',
      name: 'politica-privacidad',
      component: PoliticaPrivacidadView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth',
            top: 0,
          })
        }, 300)
      })
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router
