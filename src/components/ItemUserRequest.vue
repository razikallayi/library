<template>
	<div class="card" :id="'user-'+user._id" v-if="!user.active">
		<div class="content">
			<div class="row item" @click="viewUsers()">
				<div class="col-xs-3">
					<div class="icon-big icon-success text-center">
						<i class="ti-user"></i>
					</div>
				</div>
				<div class="col-xs-9">
					<div class="numbers">
						<p class="lead">{{user.first_name}} {{user.last_name}}</p>
						<h6  class="text-primary">{{user.role}}</h6>
					</div>
				</div>
			</div>
			<div class="header">
				<div class="row">
					<div class="col-xs-12">
						<button class="btn btn-block btn-info" @click="activateUser(user._id)">Activate</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {usersDB} from '../main'
export default {
	name: 'ItemCheckout',
	props:{user:{}},
	data(){
		return{
			
		}
	},
	methods:{
		activateUser (id) {
			var activeStatus = true
			var vue = this
			return usersDB.get(id).then(function(doc){
				doc.active = activeStatus
				vue.$emit('userStatusChanged')
				return usersDB.put(doc)
			})
		},
		viewUsers(){
			this.$router.push({ name: 'users'})
		},
	}
}
</script>
<style scoped>
.item{
	cursor:pointer;
	transition: all .3s ease-in-out;
}
.item:active,.item:focus{
	transform: scale(0.3);
}
</style>