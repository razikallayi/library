<template>
	<div class="card">
		<div class="content">
			<h1 class="lead">{{decodedMessage}}</h1>	
		</div>
	</div>
</template>
<script>
export default {
	name: 'ErrorPage',
	props: {
		message:{default:'404! Page Not Found'},
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
