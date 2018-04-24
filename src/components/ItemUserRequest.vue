<template>
	<div class="card">
		<div class="content">
			<div class="row">
				<div class="col-xs-3">
					<div class="icon-big icon-primary text-center">
						<i class="ti-face-smile"></i>
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
						<div class="col-xs-6">
							<button class="btn btn-fill btn-primary btn-wd" @click="activateUser(user._id)">Activate</button>
						</div>
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
	}
}
</script>
<style>
.item{
	cursor:pointer;
	transition: all .3s ease-in-out;
}

.item:hover{
	/*transform: scale(1.01);*/
	box-shadow: 0px 3px 16px rgba(20, 0, 0, 0.5);
}
.item:active,.item:focus{
	transform: scale(0.3);
	box-shadow: 0 2px 2px rgba(20, 0, 0, 0.5);
}
</style>