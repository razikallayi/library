<template>
 <div class="row">
  <div class="col-md-3">
    <div class="card">
      <div class="header">
        <h4 class="title">{{button}}</h4>
      </div>
      <div class="content">
        <form @submit.prevent="addBook(book)">
          <div class="form-group">
            <label>Book Name</label>
            <input id="BookNameInput" v-model="book.name" required placeholder="Book Name" class="form-control border-input">
          </div>

          <div class="form-group">
            <label>ISBN</label>
            <input type="number" v-model="book.isbn" placeholder="ISBN" class="form-control border-input">
          </div>

          <div class="form-group">
            <label>Genre/Category</label>
            <input v-model="book.category" placeholder="Genre/Category" class="form-control border-input">
          </div>

          <div class="form-group">
            <label>Author</label>
            <input v-model="book.author" placeholder="Author" class="form-control border-input">
          </div>

          <div class="form-group">
            <label>Published Date</label>
            <datepicker v-model="book.published_date" :bootstrap-styling="true" input-class="form-control border-input" placeholder="Published Date" :calendar-button="true" calendar-button-icon="ti-calendar" :clear-button="true"></datepicker>
            <!-- <input v-model="book.published_date" placeholder="Published Date" class="form-control border-input"> -->
          </div>
          <button type="submit" class="btn btn-info btn-fill btn-wd">{{button}}</button>
        </form>
      </div>
    </div>
  </div>

  <div class="col-md-9">
    <div class="card">
      <div class="header">
        <h4 class="title">Books</h4>
      </div>

      <div class="content">
        <div class="col-xs-12">
          <div class="form-group input-group-sm">
            <label>Search <small class="text-primary">Filter Books by ISBN / Name / Author / Published Date / Category</small></label>
            <input v-model="search" placeholder="Search" v-on:keyup="searchBook(search)" class="form-control border-input">
          </div>
        </div>
      </div>

      <div class="content table-responsive table-full-width">
        <table class="table table-striped">
          <thead>
            <th>#</th>
            <th>Name</th>
            <th>ISBN</th>
            <th>Category</th>
            <th>Author</th>
            <th>Published Date</th>
            <th>Action</th>
          </thead>
          <tbody id="books-tbody" >
            <tr v-if="books && books.length<1">
              <td colspan="8" class="text-center">
                <h3>-- No Books --</h3>
                <button class="btn btn-sm btn-success" v-on:click="generateSamples()">Generate Sample Books</button>
              </td>
            </tr>
            <tr v-for="(book,index) in books" :key="book._id">
              <td>{{index+1}}</td>
              <td><router-link :to="'/book/'+book._id">{{book.name}}</router-link></td>
              <td>{{book.isbn}}</td>
              <td>{{book.category}}</td>
              <td>{{book.author}}</td>
              <td>{{book.published_date}}</td>
              <td>
                </button>
                <button class="btn btn-warning btn-xs" v-on:click="editBook(book._id,index)">
                  <i class="ti-pencil"></i>
                </button>
                <button class="btn btn-danger btn-xs" v-on:click="deleteBook(book._id,index)">
                  <i class="ti-close"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>



</div>
</template>

<script>
import { db } from '../main'
import SampleBooks  from './data/SampleBooks'
import Datepicker from 'vuejs-datepicker';
export default {
  components: {
    Datepicker
  },
  data () {
    return {
      books:{},
      search:'',
      button:'Add Book',
      book:{
        name: '',
        category: '',
        author: '',
        isbn:'',
        published_date: '',
        type:'book',
      }
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.getBooks ()
      this.$store.state.pageTitle="Books"
    })
  },
  methods: {
    getBooks () { 
      var vue =this;
      
      return db.createIndex({
        index: {fields: ['type']}
      }).then(function(){
        db.find({
          selector: {
            type: {
              "$eq": 'book'
            }
          },
        }).then(function(result){
          return vue.books = result.docs
        });
      })
    },
    generateSamples () { 
      var vue =this;
      SampleBooks.books.forEach(function(book,indexOfItem) {
        book._id = book.category+"-"+book.isbn;
        book.type = 'book';
      });
      db.bulkDocs(SampleBooks.books).then(function(result){
        vue.getBooks()
      });
    },
    addBook (book) {
      var vue =this;
      if(book._id){
        db.get(book._id).then((doc)=>{
          doc.name = vue.book.name
          doc.category = vue.book.category
          doc.author = vue.book.author
          doc.isbn = vue.book.isbn
          doc.published_date = vue.book.published_date
          // doc._id = vue.book._id
          // doc.type = vue.book.type
          return vue.createBook(doc)
        })
      }else{
        Object.assign(this.book, {_id: book.category+"-"+book.isbn})
        return vue.createBook(book)
      }
    },
    createBook(book){
      var vue = this
      return db.put(book).then((result)=>{
        $.notify("Success")
        vue.getBooks()
        vue.clearForm()
        return result
      }).catch((e)=>{
        console.log(e);
      })
    },
    clearForm(){
      Object.assign(this.book, { 
        name: '',
        category: '',
        author: '',
        isbn:'',
        published_date: '',
        _id:'',
        type:'book',
      })
      this.button = "Add Book"
      document.getElementById('BookNameInput').focus()
    },
    editBook (id,index) {
      var vue =this
      return db.get(id).then(function(doc){
        vue.book.name = doc.name 
        vue.book.category = doc.category 
        vue.book.author = doc.author 
        vue.book.isbn = doc.isbn 
        vue.book.published_date = doc.published_date 
        vue.book._id = doc._id 
        vue.book.type = doc.type 
        vue.button = "Update Book"
        document.getElementById('BookNameInput').focus()
        return doc
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
          query="^(?i)"+query
          db.find({
            selector: {
              type: {
                "$eq": 'book'
              },
              $or: [
              {
                name: {
                  "$regex": query
                }
              },
              {
                isbn: {
                  "$regex": query
                }
              },{
                author: {
                  "$regex": query
                }
              },{
                category: {
                  "$regex": query
                }
              },{
                published_date: {
                  "$regex": query
                }
              }
              ]
            }
          }).then(function(result){
            vue.books = result.docs
          });
        })
      }
    },

    deleteBook (id,index) {
      var vue= this;
      db.get(id).then(function (result) {
        vue.clearForm()
        db.remove(result)
        vue.books.splice(index,1)
        $.notify({message:"Deleted"},{type:'success'})
        return result
      }).catch(function(err){
        console.log(err);
      })
    }
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
input, button {
  margin-bottom: 10px;
}
</style>
