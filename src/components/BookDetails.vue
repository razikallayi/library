<template>
	<div class="card">
		<div class="header">
			<div class="row">
				<div class="col-md-3">
					<span class="icon-big icon-warning text-center">
						<i class="ti-book"></i>
					</span>
				</div>
				<div class="col-md-9">
					<div class="numbers">
						<h6>ISBN : {{book.isbn}}</h6>
						<p>{{book.category}}</p>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-8">
					<h4 class="title">{{book.name}}</h4>
					<p class="category">{{book.author}}</p>
				</div>
				<div class="col-md-4">
					<button class="btn btn-lg btn-block btn-fill btn-danger btn-wd" @click="checkout">Checkout</button>
				</div>
			</div>
		</div>
		<div class="content bg-warning spacing-1">
			<div class="row">
				<div class="col-md-6" v-if="book.comments">
					<label><b>Reviews and Comments:</b></label>
					<div v-for="review in book.comments" class="border-b col-md-12">
						<div class="col-md-10">
							<div class="spacing-1">
								<span data-notify="icon" class="ti-user text-info"></span> 
								asdasdas{{review.user}}
								<star-rating :rating="review.rating" :star-size="20" :show-rating="true" :read-only="true"></star-rating>
							</div>
						</div>
						<!-- <div class="col-md-2 spacing-1">
							<button class="btn btn-primary btn-fill btn-xs" v-on:click="editBook(book._id,index)">
								<i class="ti-pencil"></i>
							</button>
							<button class="btn btn-default btn-fill btn-xs" v-on:click="deleteComment(book._id,index)">
								<i class="ti-close"></i>
							</button>
						</div> -->
						<div class="col-md-10">
							<p>{{review.content}}</p>
						</div>
					</div>
				</div>


				<div :class="(book.comments)? 'col-md-6':'col-md-12' ">
					<form @submit.prevent="saveComment">
						<div class="form-group">
							<label><b>Your rating and review: </b></label>
							<div class="col-md-12"><star-rating v-model="comment.rating" :star-size="30"></star-rating></div>
							<div class="col-md-12">
								<textarea rows="7" class="form-control border-input" placeholder="Write your reviews and comments here" required v-model="comment.content"></textarea>
							</div>
						</div>
						<div class="col-md-12">
							<div class="spacing-1 pull-right">
								<button type="submit" class="btn btn-info">Post Comment</button>
							</div>
						</div>
					</form>
				</div>


			</div>

			<div class="footer">
				<hr/>
				<div class="row">
					
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import { db } from '../main'
import StarRating from 'vue-star-rating'
export default {
	name: 'BookDetails',
	props:['id'],
	components:{
		StarRating
	},
	data(){
		return {
			comment:{
				id:'',
				user:'',
				rating:0,
				content:'',
			},
			book:{
				name: '',
				category: '',
				author: '',
				isbn:'',
				published_date: '',
				type:'book',
				comments:[{
					id:'',
					user:'',
					rating:0,
					content:'',
				}]
			}
		}
	},
	mounted() {
		this.$nextTick(function () {
			this.getBook()
		})
	},
	methods:{
		saveComment(){
			var vue = this
			db.get(this.id).then((doc)=>{
				var comments = []
				if(doc.comments){
					comments = doc.comments
				}
				comments.push(vue.comment)
				doc.comments = comments
				db.put(doc).then((result)=>{
					vue.getBook()
					vue.clearForm()
					$.notify("Successfully posted")
					return result
				}).catch((e)=>{
					console.log(e);
				})
			})	
		},
		clearForm(){
			this.comment= {
				id:'',
				user:'',
				rating:0,
				content:'',
			}
		},
		checkout(){
			console.log("clicked checkout")
		},
		getBook(){
			var vue = this
			db.get(this.id).then((doc)=>{
				vue.book.name = doc.name
				vue.book.category = doc.category
				vue.book.author = doc.author
				vue.book.isbn = doc.isbn
				vue.book.published_date = doc.published_date
				vue.book._id = doc._id
				vue.book.type = doc.type
				vue.book.comments = doc.comments
			})
		}
	}
}
</script>

<style>
.spacing-1{
	margin-top: 1em;
	margin-bottom: 1em;
}
.border-b{
	border-bottom: 1px solid #ead098;
}
</style>