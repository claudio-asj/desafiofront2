import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const authRequired = to.meta.authRequired
  const authed = store.getters['authenticated']

  if(to.name === 'login') {
    // If the user is already logged in
    if (authed) {
      // Redirect to the home page instead
      next({ path: '/' })          
    } else {          
      // Continue to the login page
      next()
    }
  }

  if (authRequired && !authed) {
    next('/login')
  } else if (!authRequired) {
    next()
  } else {
    let userPermissions = Object.assign([], store.getters['authorities'])
    let permited = []
    for (let userPermission in userPermissions) {
      if (to.meta.permissions) {
        if (to.meta.permissions.find(x => x == userPermissions[userPermission])) {
          permited.push(userPermissions[userPermission])
        }
      } else {
        next()
      }
    }
    if (permited.length > 0) {
      next()
    } else {      
      next(false)
    }
  }
})

export default router
