import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NewGameView from '@/views/NewGameView.vue'
import GameView from '@/views/GameView.vue'
import EntryView from '@/views/EntryView.vue'
import AboutView from '@/views/AboutView.vue'
import LogoutView from '@/views/LogoutView.vue'
import { useAuth } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    },
    {
      path: '/game/new',
      name: 'newGame',
      component: NewGameView
    },
    {
      path: '/game/:id',
      name: 'game',
      component: GameView
    },
    {
      path: '/entry/:id',
      name: 'entry',
      component: EntryView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

router.beforeEach(async (to, from) => {
  const authStore = useAuth()
  console.log(authStore.hasExpired)
  if (
    // make sure the user is authenticated
    !authStore.isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'login'
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router
