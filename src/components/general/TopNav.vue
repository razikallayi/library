<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar bar1"></span>
                    <span class="icon-bar bar2"></span>
                    <span class="icon-bar bar3"></span>
                </button>
                <!-- <a @click="toggleSidebar" class="navbar-brand"><i :class="sidebar?'ti-angle-left':'ti-angle-right'"></i></a> -->
                <a @click="$router.go(-1)" class="navbar-brand"><i class="ti-arrow-left"></i></a>
                <router-link to="/home" class="navbar-brand"><small class="text-success lead small"> {{title}}</small> </router-link>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li v-for="menuItem in menuItems">
                        <router-link :to="menuItem.path" >
                            <i :class="menuItem.icon"></i>
                            <p>{{menuItem.title}}</p>
                        </router-link>
                    </li>
                </ul>

            </div>
        </div>
    </nav>
</template>
<script>
export default{
    name: 'TopNav',
    props: {
        title:{
            default: ''
        },
        menuItems:{default:()=>[]}
    },
    computed: {
        sidebar () {//Used to change arrow according to sidebar
          return this.$store.state.sidebar
      }
  },
  methods:{
    toggleSidebar(){
       // this.sidebar = !this.$store.state.sidebar
       this.$store.dispatch('setSidebar',!this.$store.state.sidebar)
   }
}
}
</script>
