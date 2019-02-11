<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card" v-if="checkouts.length>0">
        <h4 class="text-danger spacing-1">Checkout Requests:</h4>
      </div>
    </div>
    <div class="col-md-3" v-for="(checkout,index) in checkouts" :key="index">
      <item-checkout :checkout="checkout" @bookStatusChanged="getCheckouts()"></item-checkout>
    </div>
  </div>
</template>

<script>
import ItemCheckout from "./ItemCheckout.vue";
import { db } from "../main.js";
export default {
  name: "HomeLibrarian",
  data() {
    return {
      checkouts: {}
    };
  },
  components: {
    ItemCheckout
  },
  mounted() {
    this.$nextTick(function() {
      this.getCheckouts();
    });
  },
  methods: {
    getCheckouts() {
      var vue = this;
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
                $eq: false
              }
            },
            sort: [{ book: "asc" }]
          }).then(function(result) {
            return (vue.checkouts = result.docs);
          });
        });
    }
  }
};
</script>