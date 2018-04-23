import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { db } from '../main'
import PouchDB from 'pouchdb'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    pageTitle: 'Keep Reading',
    sidebar: true,
    sidebarBackground:'linear-gradient(to top, #f84f4f,  #6c1630)',
    topnav: true,
    footer: true,
    user:{}
  },
  mutations: {
    setSidebar (state, payload) {
      state.sidebar = payload
    },
    setSidebarBackground (state, payload) {
      state.sidebarBackground = payload
    },
    setTopnav (state, payload) {
      state.topnav = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
  },
  actions: {
    userSignUp ({commit}, payload) {
      var usersDB = new PouchDB('http://localhost:5984/_users',{skip_setup: true})
      var userData = payload
      userData.roles=[]
      userData.name=payload.username
      userData._id= "org.couchdb.user:"+payload.username
      userData.type= "user"
      usersDB.put(userData).then((response)=> {
        $.notify("Registration successfull.")
        router.push('/home')
      }).catch((err)=>{
        let status = 'danger'
        $.notify({message:err.message},{type:status})
      })
    },
    userSignIn ({commit}, payload) {
      db.logIn(payload.username, payload.password)
      .then(response => {
        router.push('/home')
      })
      .catch(error => {
        let status='danger'
        if (error.name === 'unauthorized' || error.name === 'forbidden') {
          let message = "Incorrect username or password";
          $.notify({message:message},{type:status})
        } else {
          let message = error;
          $.notify({message:message},{type:status})
        }
      })
    },
    userSignOut ({commit}) {
      db.logOut()
      router.replace('login')
    },
    setUser ({commit}, payload) {
      commit('setUser', payload)
    },
    setSidebar ({commit}, payload) {
      commit('setSidebar', payload)
    },
    setTopnav ({commit}, payload) {
      commit('setTopnav', payload)
    },
  },
})
