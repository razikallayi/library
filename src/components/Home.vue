<template>
	<div class="row">
		<home-admin v-if="showUserRequests"></home-admin>
		<home-librarian v-if="showCheckouts"></home-librarian>
		<home-reader v-if="showBooks"></home-reader>
	</div>
</template>

<script>
import HomeReader from './HomeReader.vue'
import HomeAdmin from './HomeAdmin.vue'
import HomeLibrarian from './HomeLibrarian.vue'
export default {
	name: 'Home',
	data(){
		return {

		}
	},
	components:{
		HomeAdmin,
		HomeReader,
		HomeLibrarian,
	},
	computed: {
		showBooks(){
			return this.$store.state.user.role === 'reader'
					|| this.$store.state.user.role === 'librarian'
					|| this.$store.state.user.role === '_admin'
		},
		showCheckouts(){
			return this.$store.state.user.role === 'librarian'
					|| this.$store.state.user.role === '_admin'
		},
		showUserRequests(){
			return this.$store.state.user.role === '_admin'
		},
	},
	mounted() {
		this.$nextTick(function () {
			this.$store.state.pageTitle="Home"
		})
	},
	
}
</script>

<style >
	.spacing-1{
		padding: 1em;
	}
</style>