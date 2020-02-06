import BcLoginForm from '@/components/BcLoginForm.vue'
import BcSignUpForm from '@/components/BcSignUpForm.vue'
import BcHome from '@/components/BcHome.vue'
import BcBookSearch from '@/components/BcBookSearch.vue'
import BcBookForm from '@/components/BcBookForm.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: BcHome,
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    name: 'search',
    component: BcBookSearch,
    meta: { requiresAuth: true }
  },
  {
    path: '/form',
    name: 'form',
    component: BcBookForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: BcLoginForm,
    meta: { requiresNotAuth: true }
  },
  {
    path: '/sign-up',
    name: 'signUp',
    component: BcSignUpForm,
    meta: { requiresNotAuth: true }
  },
  { path: '*', redirect: '/login' }
]
