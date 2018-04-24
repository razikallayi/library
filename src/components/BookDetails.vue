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
				<div v-if="this.$store.state.user.role ==='reader' " class="col-md-4">
					<button class="btn btn-lg btn-block btn-fill btn-wd" :class="checkoutButton.type" 
					@click="checkoutButton.click">{{checkoutButton.name}}</button>
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
								{{review.user}}
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
							<div class="col-md-12">
								<textarea rows="7" class="form-control border-input" placeholder="Write your reviews and comments here" required v-model="comment.content"></textarea>
							</div>
						</div>
						<div class="col-md-6"><star-rating v-model="comment.rating" :star-size="30"></star-rating></div>
						<div class="col-md-6">
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
			checkout:{
				// user : this.$store.state.user,
				// book: this.book._id,
				// approved: false,
				// type:'checkout'
			},
			comment:{
				id:'',
				user:this.$store.state.user.name,
				rating:0,
				content:'',
			},
			book:{
				_id: '',
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
			this.getCheckoutStatus()
		})
	},
	computed:{
		checkoutButton(){
			if(this.checkout.approved == undefined){
				return {name:"Checkout",type:"btn-danger",click:this.saveCheckout}
			}
			if(this.checkout.approved){
				return {name:"Return Book",type:"btn-success",click:this.deleteCheckout}
			}else{
				return {name:"Cancel Request",type:"btn-info",click:this.deleteCheckout}
			}
		},
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
		getCheckoutStatus(){
			var vue = this
			db.get(this.$store.state.user.name+"-"+this.id).then((doc)=>{
				vue.checkout={
					approved:doc.approved,
					book:doc.book,
					type:doc.type,
					user:doc.user,
					_id:doc._id,
				}
			}).catch(function (err) {
				vue.checkout={}
			})
		},
		saveCheckout(checkout){
			var bookNoComments = Object.assign({}, this.book);
			delete bookNoComments.comments


			let checkoutItem={
				_id: this.$store.state.user.name+"-"+this.id,
				user : this.$store.state.user.name,
				book: bookNoComments,
				approved: false,
				type:'checkout'
			}
			var vue = this
			return db.put(checkoutItem).then((result)=>{
				$.notify({message:"Your checkout need to be approved by librarian"},{type:'warning'})
				vue.getCheckoutStatus()
				return result
			}).catch((e)=>{
			})
		}, deleteCheckout () {
			var vue= this;
			let checkoutId = this.$store.state.user.name+"-"+this.id
			db.get(checkoutId).then(function (result) {
				db.remove(result).then(()=>{
					if(result.approved){
						$.notify({message:"You returned the book"},{type:'success'})
					}else{
						$.notify({message:"Checkout request is cancelled"},{type:'info'})
					}
					vue.getCheckoutStatus()
				})
				return result
			}).catch(function(err){
				console.log(err);
			})
		},
		getBook(){
			var vue = this
			db.get(this.id).then((doc)=>{
				vue.book._id = doc._id
				vue.book.name = doc.name
				vue.book.category = doc.category
				vue.book.author = doc.author
				vue.book.isbn = doc.isbn
				vue.book.published_date = doc.published_date
				vue.book._id = doc._id
				vue.book.type = doc.type
				vue.book.comments = doc.comments
				vue.$store.state.pageTitle="Book Details: "+vue.book.name
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