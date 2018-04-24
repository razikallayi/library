<template>
	<div class="card">
		<div class="content">
			<div @click="viewDetails()" class="row details">
				<div class="col-xs-9">
					<div class="numbers">
						<h6 :class="!isReader?'text-danger':'text-success'">{{checkout.user}}</h6>
						<p>{{checkout.book.name.substring(0,200)}}</p>
						<h6><small>{{checkout.book.isbn}}</small></h6>
					</div>
				</div>
				<div class="col-xs-3">
					<div class="icon-big text-center" :class="!isReader?'icon-danger':'icon-success'">
						<i class="ti-bookmark"></i>
					</div>
				</div>
			</div>
			<div class="header" v-if="!isReader">
				<div class="row">
					<div class="col-xs-12">
						<div class="col-xs-6">
							<button class="btn text-center btn-sm btn-default" @click="deleteCheckout()">Decline</button>
						</div>
						<div class="col-xs-6">
							<button class="btn text-center btn-sm btn-fill btn-info" @click="saveCheckout()">Approve</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {db} from '../main.js'
export default {
	name: 'ItemCheckout',
	props:{checkout:{}},
	data(){
		return{
			isReader : this.$store.state.user.role==='reader'
		}
	},
	methods:{
		saveCheckout(){
			var vue = this
			db.get(this.checkout._id).then(function (doc) {
				doc.approved = true
				return db.put(doc).then(function (argument) {
					vue.$emit('bookStatusChanged')
				}).catch((e)=>{
					console.log(e)
				})
			}).catch((e)=>{
				console.log(e)
			})
		}, deleteCheckout () {
			var vue = this
			db.get(this.checkout._id).then(function (doc) {
				return db.remove(doc).then(function (argument) {
					vue.$emit('bookStatusChanged')
				}).catch((e)=>{
					console.log(e)
				})
			}).catch((e)=>{console.log(e)})
		},
		viewDetails(){
			this.$router.push({ name: 'book_details', params: { id: this.checkout.book._id }})
		},
	}
}
</script>
<style scoped>
.card .numbers{
	text-align: left;
}
.details{
	cursor:pointer;
	transition: all .3s ease-in-out;
}
.details:hover{

}
.details:active,.details:focus{
	transform: scale(0.7);
}
</style>