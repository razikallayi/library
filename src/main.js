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
// const baseUrl = 'https://6abf0a2a-f0d4-4418-9401-1a1db0e33f60-bluemix.cloudantnosqldb.appdomain.cloud/'
const baseUrl = 'https://6abf0a2a-f0d4-4418-9401-1a1db0e33f60-bluemix:8f78809b20958e5c888a280f78db04241cad9e1228e6469f4abc09e714d587c0@6abf0a2a-f0d4-4418-9401-1a1db0e33f60-bluemix.cloudantnosqldb.appdomain.cloud'
// const baseUrl = 'https://0e168c5f-c3ad-4a61-bd36-c91ab4be957d-bluemix:b96f518ba54571c221e803f28f473acd68cb11c15b04d4c1f336bfb07c5289dc@0e168c5f-c3ad-4a61-bd36-c91ab4be957d-bluemix.cloudant.com/'
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



// unm:6abf0a2a-f0d4-4418-9401-1a1db0e33f60-bluemix
// pwd:8f78809b20958e5c888a280f78db04241cad9e1228e6469f4abc09e714d587c0