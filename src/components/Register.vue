<template >
  <div class="col-md-offset-4 col-md-4">
    <div class="card card-user" slot="fullpage">
      <div class="image">
        <img src="static/img/reading.jpg" width="300px">
      </div>
      <div class="content">
        <div class="author">
          <img class="avatar border-white" src="static/img/book.png">
          <h5 class="text-center">Register</h5>
          <router-link to="/login">
            <h5>Already have an account? Login Here!</h5>
          </router-link>
        </div>

        <div class="content">
          <form @submit.prevent="userSignUp()">
            <div class="form-group">
              <label>First Name</label>
              <input
                id="UserFirstNameInput"
                v-model="first_name"
                required
                placeholder="First Name"
                class="form-control border-input"
                autofocus
              >
            </div>

            <div class="form-group">
              <label>Last Name</label>
              <input
                required
                placeholder="Last Name"
                v-model="last_name"
                class="form-control border-input"
              >
            </div>

            <div class="form-group">
              <label>Email</label>
              <input
                required
                placeholder="Email"
                v-model="email"
                type="email"
                class="form-control border-input"
              >
            </div>

            <div class="form-group">
              <label>Phone</label>
              <input
                placeholder="Phone"
                type="number"
                v-model="phone"
                class="form-control border-input"
              >
            </div>

            <div class="form-group">
              <label>Username</label>
              <input
                required
                placeholder="Username"
                v-model="username"
                class="form-control border-input"
              >
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                v-model="password"
                required
                placeholder="Password"
                class="form-control border-input"
              >
            </div>
            <button type="submit" class="btn btn-fill form-control btn-danger">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "../main";
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      username: "",
      password: ""
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.$store.state.sidebar = false;
      this.$store.state.topnav = false;
      this.$store.state.footer = false;
    });
  },
  methods: {
    userSignUp() {
      let user = {
        username: this.username,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        username: this.username,
        phone: this.phone,
        role: "reader",
        active: false,
        type: "user",
        name: this.username,
        _id: "org.couchdb.user:" + this.username,
        type: "user"
      };
      console.log(JSON.stringify(user));
      this.$store.dispatch("userSignUp", user);
    },
    clearForm() {
      (this.first_name = ""),
        (this.last_name = ""),
        (this.email = ""),
        (this.phone = ""),
        (this.username = ""),
        (this.password = "");
      document.getElementById("UserFirstNameInput").focus();
    }
  }
};
</script>


<style scoped>
.card-user .avatar {
  margin: auto;
}
</style>