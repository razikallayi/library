import Vue from 'vue'
import Router from 'vue-router'
import Books from '../components/Books'
import User from '../components/User'
import NotFound from '../components/general/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/books',
      name: 'Books',
      component: Books
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    { path: '*', component: NotFound }
  ]
})
