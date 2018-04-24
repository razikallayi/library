import Vue from 'vue'
import Router from 'vue-router'
import Books from '../components/Books'
import User from '../components/User'
import Home from '../components/Home'
import Login from '../components/Login'
import ErrorPage from '../components/ErrorPage'
import BookDetails from '../components/BookDetails'
import Register from '../components/Register'
import { db } from '../main'
import { store } from '../store/store'

Vue.use(Router)

let router = new Router({
  routes: [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/books',
    name: 'books',
    component: Books,
    meta: { requiresAuth: true , roles:['librarian','_admin']}
  },
  {
    path: '/book/:id',
    name: 'book_details',
    component: BookDetails,
    props:true,
    meta: { requiresAuth: true , roles:['reader','librarian','_admin']}
  },
  {
    path: '/users',
    name: 'user',
    component: User,
    meta: { requiresAuth: true , roles:['_admin']}
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true , roles:['reader','librarian','_admin']}
  },
  {
    path: '/denied/:message',
    name: 'error',
    component: ErrorPage,
    props: true
  },
  {
    path: '/logout',
    name: 'logout',
    component: function () {
      store.dispatch('userSignOut')
    }
  },
  { 
    path: '*', 
    component: Login 
  }
  ]
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if(requiresAuth) {
    db.getSession(function (err, response) {
      if (err) {
        next({name:'login'})
      } else if (!response.userCtx.name) {
        next({name:'login'})
      } else {

        var user={};
        user.role = response.userCtx.roles[0];
        user.name = response.userCtx.name;
        if(user.role!=="_admin"){
          db.getUser(response.userCtx.name, function (err, response) {
            if (!err) {
              if(!response.active){
               store.dispatch('setUser', {})
               var reason = "Your account is not activated. Please contact admin for suppport."
               reason= btoa(reason)
               next({ name: 'error', params: { message: reason }}) 
               return response
             }
           }
         });
        }
        
        store.dispatch('setUser', user)

        var roleCheck = to.meta.roles.some((auth)=>auth===user.role);
        if(roleCheck) {
          next()
        }else{
          var reason = "You don't have permission. Please contact admin for support."
          reason= btoa(reason)
          next({ name: 'error', params: { message: reason }})
        }
      }
    }) 
  }else {
    next()
  }
})

export default router