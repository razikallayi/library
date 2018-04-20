<template>
 <div class="row">
  <div class="col-md-3">
    <div class="card">
      <div class="header">
        <h4 class="title">Add Book</h4>
      </div>
      <div class="content">
        <form @submit.prevent="addBook(book)">
          <div class="form-group">
            <label>Book Name</label>
            <input id="BookNameInput" v-model="book.name" placeholder="Book Name" class="form-control border-input">
          </div>

          <div class="form-group">
            <label>ISBN</label>
            <input v-model="book.isbn" placeholder="ISBN" class="form-control border-input">
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
            <input v-model="book.published_date" placeholder="Published Date" class="form-control border-input">
          </div>
          <button type="submit" class="btn btn-info btn-fill btn-wd">Add Book</button>
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
            <label>Search <small class="text-info">Filter Books by Id / Name / Author / Published Date / Category</small></label>
            <input v-model="search" placeholder="Search" v-on:keyup="searchBook(search)" class="form-control border-input">
          </div>
        </div>
        <!-- <div class="col-xs-2">
          <div class="form-group">
            <button class="btn btn-info btn-fill btn-sm"  v-on:click="searchBook(search)"><i class="ti-search"></i></button>
          </div>
        </div> -->
      </div>

      <div class="content table-responsive table-full-width">
        <table class="table table-striped">
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Author</th>
            <th>Published Date</th>
            <th>Action</th>
          </thead>
          <tbody id="books-tbody" >
            <tr v-if="books.length<1">
              <td colspan="6" class="text-center">-- No Books --</td>
            </tr>
            <tr v-for="(book,index) in books" :key="book._id">
              <td>{{book._id}}</td>
              <td>{{book.name}}</td>
              <td>{{book.category}}</td>
              <td>{{book.author}}</td>
              <td>{{book.published_date}}</td>
              <td><button class="btn btn-danger btn-sm" v-on:click="deleteBook(book._id,index)">x</button></td>
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
export default {
  data () {
    return {
      books:{},
      search:'',
      book:{
        name: '',
        category: '',
        author: '',
        isbn:'',
        published_date: '',
      }
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.getBooks ()
      // this.bulkDocs ()
    })
  },
  methods: {
    getBooks () { 
      console.log('geting books')
      var vue =this;
      
      db.createIndex({
        index: {fields: ['name']}
      }).then(function(){
        db.find({
          selector: {
            type: {
              "$eq": 'book'
            }
          }
        }).then(function(result){
          vue.books = result.docs
          console.log(result.docs)
        });
      })
      // db.allDocs({include_docs: true,descending:true}).then(function(result){
      //   vue.books = result.rows
      //   vue.drawBookTable(result.rows);
      // });
    },
    bulkDocs () { 
      var v =this;
      SampleBooks.books.forEach(function(book,indexOfItem) {
        book._id = book.category+"-"+book.isbn;
        book.type = 'book';
      });
      db.bulkDocs(SampleBooks.books).then(function(c){
        v.drawBookTable(c.rows);
      });
    },
    drawBookTable(books) {
      var vue =this
      books.forEach(function(book,indexOfItem) {
        vue.$set(vue.books, indexOfItem, book.doc)
      });
    },
    addBook (book) {
      Object.assign(this.book, {_id: book.category+"-"+book.isbn})
      var vue =this;
      db.put(book, function callback(err, result) {
        if (!err) {
          vue.getBooks()
          Object.assign(vue.book, { name: '',
            category: '',
            author: '',
            isbn:'',
            published_date: '',
            _id:'',
            type:'book',
          })
          document.getElementById('BookNameInput').focus()
        }else if(err.status == 409){
          alert('Book with the given ISBN already exist!')
        }
      });
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
                _id: {
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
            console.log(result.docs)
          });
        })
      }
    },
    deleteBook (id,index) {
      var vue= this;
      db.get(id).then(function (doc) {
        return db.remove(doc);
      }).then(function(){
        vue.getBooks()
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
a {
  color: #42b983;
}
input, button {
  margin-bottom: 10px;
}
</style>
