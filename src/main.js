// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
Vue.use(VueFire)

firebase.initializeApp({
  projectId: 'YOUR_PROJECT_ID',
  databaseURL: 'YOUR_DB_URL'
})

export const db = firebase.firestore()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
