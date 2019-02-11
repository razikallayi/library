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
export const db = new PouchDB('http://127.0.0.1:5984/library', { skip_setup: true });
export const usersDB = new PouchDB('http://127.0.0.1:5984/_users', { skip_setup: true });

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})