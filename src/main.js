// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import VueFire from 'vuefire'
// import firebase from 'firebase/app'
// import 'firebase/firestore'
// Vue.use(VueFire)
// require('bootstrap')
// var PouchDB = require('pouchdb')
import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
PouchDB.plugin(PouchDBFind);
export const db = new PouchDB('http://localhost:5984/library')
// firebase.initializeApp({
//   projectId: 'firestarter-96e46',
//   databaseURL: 'https://firestarter-96e46.firebaseio.com'
// })

// export const db = firebase.firestore()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
