import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
import Profile from '@/views/ProfileView.vue'
import FileSystem from '@/views/FileSystem.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/file',
      name: 'file',
      component: FileSystem
    },
  ]
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (authStore.token || to.name === 'signin' || to.name === 'signup') {
    next()
  } else {
    next({name: 'signin'})
  }
})

export default router
