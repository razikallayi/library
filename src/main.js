// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import PouchDBAuth from 'pouchdb-authentication'
import { store } from './store/store';

PouchDB.plugin(PouchDBFind);
PouchDB.plugin(PouchDBAuth);
// const baseUrl = 'http://127.0.0.1:5984'
// const baseUrl = 'https://library.smileupps.com'
// const baseUrl = 'https://6abf0a2a-f0d4-4418-9401-1a1db0e33f60-bluemix.cloudant.com'
const baseUrl = 'https://6abf0a2a-f0d4-4418-9401-1a1db0e33f60-bluemix.cloudantnosqldb.appdomain.cloud/'
export const db = new PouchDB(baseUrl + '/library', { skip_setup: true });
export const usersDB = new PouchDB(baseUrl + '/_users', { skip_setup: true });

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})