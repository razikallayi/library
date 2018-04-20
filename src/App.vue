<template>
  <div class="wrapper">
      <side-bar></side-bar>
    <div class="main-panel">
    <top-nav></top-nav>
      <div class="content">
        <div class="container-fluid">
          <vue-alert></vue-alert>
             <router-view></router-view>
        </div>
      </div>
    <footer-content></footer-content>
    </div>
  </div>
</template>

<script>
import TopNav from './components/general/TopNav.vue'
import SideBar from './components/general/SideBar.vue'
import FooterContent from './components/general/FooterContent.vue'
import VueAlert from './components/general/VueAlert.vue'
export default {
  components: {
    TopNav,
    SideBar,
    FooterContent,
    VueAlert
  },
  name: 'App'
}
</script>