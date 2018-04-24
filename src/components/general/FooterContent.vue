<template>
	<footer class="footer">
		<div v-if="showToggleSidebarButton">
                <a @click="toggleSidebar" class="navbar-brand text-primary"><i :class="sidebar?'ti-arrows-horizontal':'ti-angle-right'"></i></a>
            </div>
		<div class="container-fluid">
			<div class="copyright pull-right">
				&copy; 2018, Made with <i class="ti-heart heart"></i> by <a href="http://www.razikallayi.com">Razi</a> 
			</div>
		</div>
	</footer>
</template>
<style scoped>
	.footer .copyright{
		margin:0px;
		/*color:#EEE;*/
		/*padding: 10px 15px;*/
	}
	.footer .navbar-brand{
		padding: 7px 15px;
		height: auto;
	}
	.heart{
		font-size: 11px;
	}
</style>

<script>
export default{
    name: 'FooterContent',
    computed: {
        sidebar () {//Used to change arrow according to sidebar
          return this.$store.state.sidebar
      },
        showToggleSidebarButton () {
          return this.$store.state.user.name !== undefined
      },
  },

  methods:{
    toggleSidebar(){
       // this.sidebar = !this.$store.state.sidebar
       this.$store.dispatch('setSidebar',!this.$store.state.sidebar)
   }
}
}
</script>