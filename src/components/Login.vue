<template >
	<div class="col-md-offset-4 col-md-4">
		<div class="card card-user mt-1" slot="fullpage">
			<div class="image">
				<img src="static/img/reading.jpg" width="300px">
			</div>
			<div class="content">
				<div class="author">
					<img class="avatar border-white" src="static/img/book.png">
					<h5 class="text-center">Sign In</h5>
					<router-link to="/register" >
						<h5>Create an account here!</h5>
					</router-link>

				</div>

				<div class="content">
					<form @submit.prevent="userSignIn()">
						<div class="form-group">
							<label>Username</label>
							<input required placeholder="Username" v-model="username" class="form-control border-input" autofocus="">
						</div>

						<div class="form-group">
							<label>Password</label>
							<input required type="password" placeholder="Password" v-model="password" class="form-control border-input">
						</div>
						<br>
						<button type="submit" class="btn btn-fill btn-wd btn-info form-control">Sign In</button>
					</form>
				</div>
				<br>
			</div>
		</div>
	</div>

</template>
<style scoped>
.card-user .avatar{
	margin: auto;
}
.mt-1{
	margin-top: 3.5em;
}
</style>

<script>
import { db } from '../main'
export default {
	data (){
		return {
			username:'',
			password:'',
		}
	},
	mounted(){
		this.$nextTick(function () {
			this.$store.dispatch('setSidebar', false)
			this.$store.dispatch('setTopnav', false)
		})
	},
	methods:{
		userSignIn () {
			this.$store.dispatch('userSignIn', { username: this.username, password: this.password })
		},
	}
}

</script>
