<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card" v-if="checkouts.length>0">
        <h4 class="text-success spacing-1">Aproved Checkouts:</h4>
      </div>
    </div>
    <div class="col-md-3" v-for="(checkout,index) in checkouts" :key="index">
      <item-checkout :checkout="checkout" @bookStatusChanged="getCheckouts()"></item-checkout>
    </div>

    <div class="col-md-12">
      <div class="card">
        <div class="content">
          <div class="form-group">
            <h4 v-if="books.length > 0" class="text-info m-0">Books:</h4>
            <h5>
              Search
              <small
                class="text-primary"
              >Filter Books by ISBN / Name / Author / Published Date / Category</small>
            </h5>
            <input
              v-model="search"
              placeholder="Search"
              v-on:keyup="searchBook(search)"
              class="form-control border-input"
            >
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3" v-for="(book,index) in books" :key="index">
      <item-book :book="book"></item-book>
    </div>
  </div>
</template>

<script>
import ItemBook from "./ItemBook.vue";
import ItemCheckout from "./ItemCheckout.vue";
import { db } from "../main.js";
export default {
  name: "HomeReader",
  data() {
    return {
      checkouts: {},
      books: {},
      search: ""
    };
  },
  components: {
    ItemCheckout,
    ItemBook
  },
  mounted() {
    this.$nextTick(function() {
      this.getBooks();
      this.getCheckouts();
    });
  },
  methods: {
    getBooks() {
      var vue = this;
      return db
        .createIndex({
          index: { fields: ["name"] }
        })
        .then(function() {
          db.find({
            selector: {
              type: {
                $eq: "book"
              }
            },
            sort: [{ name: "asc" }]
          }).then(function(result) {
            return (vue.books = result.docs);
          });
        });
    },
    getCheckouts() {
      var vue = this;
      var userId = this.$store.state.user.name;
      return db
        .createIndex({
          index: { fields: ["book"] }
        })
        .then(function() {
          db.find({
            selector: {
              type: {
                $eq: "checkout"
              },
              approved: {
                $eq: true
              },
              _id: {
                $regex: userId
              }
            },
            sort: [{ book: "asc" }]
          }).then(function(result) {
            return (vue.checkouts = result.docs);
          });
        });
    },
    searchBook(query) {
      query = query.trim();
      var vue = this;
      if (query.trim() == "") {
        this.getBooks();
      } else {
        db.createIndex({
          index: { fields: ["name"] }
        }).then(function() {
          query = "^(?i)" + query;
          db.find({
            selector: {
              type: {
                $eq: "book"
              },
              $or: [
                { name: { $regex: query } },
                { isbn: { $regex: query } },
                { author: { $regex: query } },
                { category: { $regex: query } },
                { published_date: { $regex: query } }
              ]
            },
            sort: [{ name: "asc" }]
          })
            .then(function(result) {
              vue.books = result.docs;
            })
            .catch(function function_name(argument) {
              console.log(argument);
            });
        });
      }
    }
  }
};
</script>

<style scoped>
.m-0 {
  margin: 0 !important;
}
</style>
