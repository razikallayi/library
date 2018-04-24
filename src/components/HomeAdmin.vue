<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card" v-if="users.length>0">
				<h4 class="text-success spacing-1">Users Awaiting Approval:</h4>
			</div>
		</div>
		<div class="col-md-3" v-for="(user,index) in users" :key="user._id">
			<item-user-request :user="user" :userStatusChanged="getUsers()"></item-user-request>
		</div>
	</div>
</template>

<script>
import ItemUserRequest from './ItemUserRequest.vue'
import {usersDB} from '../main.js'
export default {
	name: 'HomeLibrarian',
	data(){
		return {
			users:{},
		}
	},
	components:{
		ItemUserRequest,
	},
	mounted() {
		this.$nextTick(function () {
			this.getUsers()
		})
	},
	methods: {
		getUsers () { 
			var vue =this;
			return usersDB.allDocs({"include_docs": true}).then(function(result){
				vue.users=[]
				result.rows.forEach((row)=>{
					if(row.id.startsWith("org.couchdb.user")){
						var user = row.doc
						if(row.doc.roles.length ==0){
							user.role = 'reader'
						}else{
							user.role = row.doc.roles[0]
						}
						if(!user.active){
							return vue.users.push(user)
						}
					}
				})
			}).catch((error)=>{
				
			})
		},
	}
}
</script>