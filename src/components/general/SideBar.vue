<template>
    <div class="sidebar" data-background-color="black" data-active-color="danger">
        <div class="sidebar-wrapper" :style="{'background':background}">
            <div class="logo">
                <router-link to="/home" class="simple-text">Library</router-link>
            </div>
            <div class="user" v-if="$store.state.user.name">
                <p class="name"><i class="icon text-info ti-user"></i> {{this.$store.state.user.name}}</p>
                <p class="role">{{this.$store.state.user.role}}</p>
            </div>
            <ul class="nav">
                <li v-for="menuItem in menuItems">
                    <router-link :to="menuItem.path" >
                        <i :class="menuItem.icon"></i>
                        <p>{{menuItem.title}}</p>
                    </router-link>
                </li>
               <!--  <li>
                    <router-link to="/home"><i class="ti-home"></i>Home</router-link>
                </li>
                <li>
                    <router-link to="/books"  active-class="active" ><i class="ti-book"></i>Books</router-link>
                </li>
                <li>
                    <router-link to="/users"><i class="ti-user"></i>User</router-link>
                </li> -->
            </ul>
        </div>
    </div>
</template>

<script>
export default{
    name: 'SideBar',
    props: {
        menuItems:{default:()=>[]},
    },
    computed: {
        sidebar () {//Used to change arrow according to sidebar
          return this.$store.state.sidebar
      },
        background () {//Used to change arrow according to sidebar
            if(this.$store.state.user.role ==='reader')
                return 'linear-gradient(to top, #4feef8, #33166c)'
            if(this.$store.state.user.role ==='librarian')
                return 'linear-gradient(to top, #f8844f, #6c165a)'
            return 'linear-gradient(to top, #f84f4f,  #6c1630)'
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

<style>
.sidebar div.user{
    color: #FFF;
    text-align: center;
    background: rgba(0,0,0,0.2);
    padding: 10px;
    margin: 20px;
    text-transform: capitalize;
}
.sidebar div.user .name{
}
.sidebar div.user .icon{
    margin-right: 10px; 
}
.sidebar div.user .role{
    text-transform: uppercase;
    font-size: 12px;
    color: #CCC
}
/*.sidebar-wrapper{*/
    /*background-image: linear-gradient(to bottom, #6c1630,  #ee9053);*/
    /*background-image: linear-gradient(to bottom, #FFF,  #EEE);*/
    /*background-image: linear-gradient(to top, #f84f4f,  #6c1630);*/
    /*background: url('../../../static/img/banner.jpg');*/
    /*background:#FFF;*/
    /*background:rgba(0,0,0,0.4);*/
    /*background:#772036;*/
    /*}*/
    </style>