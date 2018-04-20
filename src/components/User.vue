<template>
  <div class="card card-map">
    <div class="header">
      <h4 class="title">User</h4>
      <img src="../assets/logo.png">
    </div>
  </div>


  <!-- <div class="row"> -->
    <!-- <H1 class="text-danger">Hello</H1> -->
 <!--    <article v-for="(location, idx) in locations" :key="idx">
      <img :src="location.image" width="300px">
      <h1>{{ location.name }}</h1>
      <button class="button is-small is-danger" @click="deleteLocation(location.id)">
        Delete
      </button>
    </article>

    <hr>

    <form @submit="addLocation(name, image)">
      <h2>Add a New Location</h2>
      <input v-model="name" placeholder="Location Name" class="input">
      <input v-model="image" placeholder="Location Image URL" class="input">
      <button type="submit" class="button is-success">Add New Location</button>
    </form> -->
  <!-- </div> -->
</template>

<script>

import { db } from '../main'
// ID
// Name
// Genre/Category
// Author
// Publish Date
export default {
  name: 'User',
  data () {
    return {
      id: '',
      name: '',
      category: '',
      author: '',
      publish_date: ''
    }
  }
//   firestore () {
//     return {
//       locations: db.collection('locations').orderBy('createdAt')
//     }
//   },
  // methods: {
  //   addBook (name, image) {
  //     const createdAt = new Date()
  //     db.collection('locations').add({ name, image, createdAt })
  //     // Clear values
  //     this.name = ''
  //     this.image = ''
  //   },
  //   deleteLocation (id) {
  //     db.collection('locations').doc(id).delete()
  //   }
  // }
}
</script>