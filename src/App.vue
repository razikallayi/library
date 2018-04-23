<template>
  <div class="wrapper">
    <side-bar v-if="sidebar" :menuItems="getMenuItems" :background="sidebarBackground"></side-bar>
    <div class="main-panel" :style="sidebar?'':{width:'100%'}">
      <top-nav v-if="topnav" 
      :menuItems="getMenuItems"
      :title="pageTitle"></top-nav>
      <div class="content">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </div>
      <footer-content v-if="footer"></footer-content>
    </div>
  </div>
</template>

<script>
import TopNav from './components/general/TopNav.vue'
import SideBar from './components/general/SideBar.vue'
import FooterContent from './components/general/FooterContent.vue'
import { db } from './main'
export default {
  components: {
    TopNav,
    SideBar,
    FooterContent,
  },
  data(){
    return{
      authMenuItems:[
      { title: 'Home', path: '/home', icon: 'ti-home',roles:['reader','librarian','_admin'] },
      { title: 'Books', path: '/books', icon: 'ti-book',roles:['librarian','_admin'] },
      { title: 'Users', path: '/users', icon: 'ti-user' ,roles:['_admin']},
      { title: 'Logout', path: '/logout', icon: 'ti-lock',roles:['reader','librarian','_admin'] },
      ],
      noAuthMenuItems:[
      { title: 'Login', path: '/login', icon: 'ti-key' },
      { title: 'Register', path: '/register', icon: 'ti-user' },
      ],
    }
  },
  computed: {
    sidebar () {
      return this.$store.state.sidebar
    },
    sidebarBackground () {
      return this.$store.state.sidebarBackground
    },
    topnav () {
      return this.$store.state.topnav
    },
    footer () {
      return this.$store.state.footer
    },
    pageTitle () {
      return this.$store.state.pageTitle
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    menuItems () {
      if (this.isAuthenticated) {
        return [
        { title: 'Home', path: '/home', icon: 'ti-home' },
        { title: 'Books', path: '/books', icon: 'ti-book' },
        { title: 'Users', path: '/users', icon: 'ti-user' },
        { title: 'Logout', path: '/logout', icon: 'ti-lock' },
        ]
      } else {
        return [
        { title: 'Login', path: '/login', icon: 'ti-key' },
        { title: 'Register', path: '/register', icon: 'ti-user' },
        ]
      }
    },
     getMenuItems () {
      const requiresAuth = this.$router.app._route.matched.some(record => record.meta.requiresAuth)
      var vue= this
      var menuItems=[];
      if(requiresAuth) {
        var ajaxData ={
         url: 'http://localhost:5984/_session',
         async:false,
         xhrFields: {
          withCredentials: true
        },
        success:function (response) {
          if (!response.userCtx.name) {
            menuItems = vue.noAuthMenuItems;
          } else {
            var userRole = response.userCtx.roles[0];
            var roleCheck =  vue.authMenuItems.forEach((menuItem)=>{
              var check = menuItem.roles.some((auth,a,b)=>{
                return auth===userRole
              })
              if(check){
                menuItems.push(menuItem)
              }
            })
          }
        },error:function (argument) {
          menuItems = vue.noAuthMenuItems;
        }
      }
        $.ajax(ajaxData)
      }else{
        menuItems = vue.noAuthMenuItems;
      }
      return menuItems
    }
  },
  name: 'App'
}
</script>