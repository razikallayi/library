<template>
	<div class="card">
		<div class="header">
			<h3 class="text-center lead">{{decodedMessage}}</h3>
		</div>
		<div class="content"></div>
	</div>
</template>
<script>
export default {
	name: 'ErrorPage',
	props: {
		message:{default:'404! Page Not Found'},
	},
	mounted(){
		this.$nextTick(function () {
			this.$store.dispatch('setSidebar', true)
			this.$store.dispatch('setTopnav', true)
		})
	},
	computed:{
		decodedMessage(){
			try {
				return window.atob(this.message);
			} catch(e) {
			return this.message
			}
		}
	}
}
</script>
