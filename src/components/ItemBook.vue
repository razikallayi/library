<template>
	<div class="item card" @click="viewDetails">
		<div class="content">
			<div class="row">
				<div class="col-xs-3">
					<div class="icon-big icon-warning text-center">
						<i class="ti-book"></i>
						<p>{{new Date(book.published_date).getFullYear()}}</p>
					</div>
				</div>
				<div class="col-xs-9">
					<div class="numbers">
						<h6 class="lead">{{book.author}}</h6>
						<p>{{book.name.substring(0,200)}}</p>
					</div>
				</div>
			</div>
			<div class="footer">
				<hr>
				<star-rating :rating="averageRating" :star-size="15" :show-rating="false" :read-only="true"></star-rating>
				<small class="pull-right text-primary">{{book.category}}</small>
			</div>
		</div>
	</div>
</template>

<script>
import StarRating from 'vue-star-rating'
export default {
	name: 'ItemBook',
	props:{book:{}},
	data(){
		return{
			rating:0
		}
	},
	components:{
		StarRating
	},
	mounted(){
		// this.averageRating()
	},
	computed:{
		averageRating(){
			let comments = this.book.comments;
			if(comments && comments.length>0){
				var itemRating=0;
				comments.forEach((item)=> {
					itemRating += item.rating
				})
				this.rating= itemRating/comments.length
			}
			return this.rating
		}
	},
	methods:{
		viewDetails(){
			this.$router.push({ name: 'book_details', params: { id: this.book._id }})
		},
	}
}
</script>
<style scoped>
.item{
	cursor:pointer;
	transition: all .3s ease-in-out;
}
.item:hover{
	/*transform: scale(1.01);*/
	box-shadow: 0px 3px 16px rgba(20, 0, 0, 0.5);
}
.item:active,.item:focus{
	transform: scale(0.9);
	box-shadow: 0 2px 2px rgba(20, 0, 0, 0.5);
}
</style>