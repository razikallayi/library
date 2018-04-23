<template>
	<div class="row">

		<div class="col-md-12">
			<div class="col-md-8 col-md-offset-2">
				<div class="card">
					<div class="content">
						<div class="form-group">
							<h5>Search <small class="text-primary">Filter Books by ISBN / Name / Author / Published Date / Category</small></h5>
							<input v-model="search" placeholder="Search" v-on:keyup="searchBook(search)" class="form-control border-input">
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-md-3" v-for="(book,index) in books" :key="book._id">
			<book-item :book="book"></book-item>
		</div>
	</div>
</template>

<script>
import BookItem from './BookItem.vue'
import {db} from '../main.js'
export default {
	name: 'Home',
	data(){
		return {
			books:{},
			search:''
		}
	},
	components:{
		BookItem,
	},
	mounted() {
		this.$nextTick(function () {
			this.getBooks ()
		})
	},
	methods: {
		getBooks () { 
			var vue =this;
			return db.createIndex({
				index: {fields: ['name']}
			}).then(function(){
				db.find({
					selector: {
						type: {
							"$eq": 'book'
						}
					},
					sort: [{name: 'asc'}],
				}).then(function(result){
					return vue.books = result.docs
				});
			})
		},
		searchBook(query)  {
			query = query.trim()
			var vue = this
			if(query.trim()==''){
				this.getBooks()
			}else{
				db.createIndex({
					index: {fields: ['name']}
				}).then(function(){
					query="(?i)"+query
					db.find({
						selector: {
							type: {
								"$eq": 'book'
							},
							$or: [
							{name:{'$regex' : query}},
							{isbn: {"$regex": query}},{author: {"$regex": query}},
							{category: {"$regex": query}},
							{published_date: {"$regex": query}}
							]
						},
						sort: [{name: 'asc'}],
					}).then(function(result){
						vue.books = result.docs
					}).catch(function function_name(argument) {
						console.log(argument)
					});
				})
			}
		},
	}
}
</script>