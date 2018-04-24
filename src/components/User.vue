<template>
 <div class="row">
  <div class="col-md-3">
    <div id="AddCard" class="card">
      <div class="header">
        <h4 class="title">{{button}}</h4>
      </div>
      <div class="content">
        <form @submit.prevent="addUser()">
          <div class="form-group">
            <label>First Name</label>
            <input id="UserFirstNameInput" v-model="user.first_name" required placeholder="First Name" class="form-control border-input">
          </div>

          <div class="form-group">
            <label>Last Name</label>
            <input v-model="user.last_name" required placeholder="Last Name" class="form-control border-input">
          </div>

          <div class="form-group">
            <label>Email</label>
            <input v-model="user.email" required placeholder="Email" type="email" class="form-control border-input">
          </div>

          <div class="form-group">
            <label>Phone</label>
            <input v-model="user.phone"  type="number" placeholder="Phone" class="form-control border-input">
          </div>

          <div class="form-group">
            <label>Username</label>
            <input v-model="user.username" required placeholder="Username" class="form-control border-input">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="user.password" type="password" :required="!user._id" placeholder="Password" class="form-control border-input">
          </div>

          <div class="form-group">
            <div class="col-md-6">
              <input type="radio" id="reader" value="reader" v-model="user.role">
              <label for="reader">Reader</label>
            </div>
            <div class="col-md-6">
              <input type="radio" id="librarian" value="librarian" v-model="user.role">
              <label for="librarian">Librarian</label>
            </div>
          </div>

          <div class="col-xs-12">
            <input id="active" type="checkbox" v-model="user.active">
            <label for="active">Active</label>
          </div>

          <div class="row">
            <div class=" col-xs-6">
              <button type="submit" class="btn btn-fill btn-info">{{button}}</button>
            </div>
            <div class=" col-xs-6">
              <button type="reset" class="btn btn-fill btn-warning" @click="clearForm()">Clear</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="col-md-9">
    <div class="card">
      <div class="header">
        <h4 class="title">Users</h4>
      </div>

      <div class="content">
        <div class="col-xs-12">
          <div class="form-group input-group-sm">
            <label>Search <small class="text-primary">Filter Users by Name / Email / Username / Phone / Role</small></label>
            <input v-model="search" placeholder="Search" v-on:keyup="searchUser(search)" class="form-control border-input">
          </div>
        </div>
      </div>

      <div class="content table-responsive table-full-width">
        <table class="table table-striped">
          <thead>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Username</th>
            <th>Role</th>
            <th>Active</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr v-if="users && users.length<1">
              <td colspan="9" class="text-center"><h3>-- No Users --</h3></td>
            </tr>
            <tr v-for="(user,index) in users" :key="user._id">
              <td>{{index+1}}</td>
              <td>{{user.first_name}}</td>
              <td>{{user.last_name}}</td>
              <td>{{user.email}}</td>
              <td>{{user.phone}}</td>
              <td>{{user.username}}</td>
              <td>{{user.role.toUpperCase()}}</td>
              <td><input type="checkbox"  v-model="user.active" v-on:change="activateUser(user._id,user.active)" v-bind:id="user._id"></td>
              <td>
                <button class="btn btn-warning btn-sm" v-on:click="editUser(user._id,index)">
                  <i class="ti-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm" v-on:click="deleteUser(user._id,index)">
                  <i class="ti-close"></i>
                </button></td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usersDB } from '../main'
export default {
  data () {
    return {
      users:[],
      search:'',
      button : "Add User",
      user:{
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        phone: '',
        role: 'reader',
        active:false,
        type:'user',
      },
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.getUsers ()
      this.$store.state.pageTitle="Users"
    })
  },
  methods: {
    getUsers () {
      var vue =this;
      return usersDB.allDocs({"include_docs": true}).then(function(result){
        vue.users=[]
        result.rows.forEach((row)=>{
          if(row.id.startsWith("org.couchdb.user")){
            var user = row.doc
            if(row.doc.roles.length ==0){
              user.role = 'reader'
            }else{
              user.role = row.doc.roles[0]
            }
            return vue.users.push(user)
          }
        })
      }).catch((error)=>{
        // $.notify({message:error.message},{type:'danger'})
      })
    },
    addUser () {
      var vue =this;
      var user = this.user
      if(user._id){
        usersDB.get(user._id).then((doc)=>{
          doc.first_name = vue.user.first_name.trim()
          doc.last_name = vue.user.last_name.trim()
          doc.email = vue.user.email.trim()
          doc.phone = vue.user.phone.trim()
          doc.username = vue.user.username.trim()
          doc.role = vue.user.role.trim()
          if(vue.user.password){
            doc.password = vue.user.password.trim()
          }
          doc.active = vue.user.active
          return vue.createUser(doc)
        })
      }else{
        // let nextId = ("00000"+(this.users.length+1)).slice(-5)
        // Object.assign(user, {_id: user.username+"-"+nextId})
        Object.assign(user, {_id: "org.couchdb.user:"+user.username})
        return vue.createUser(user)
      }
    },
    createUser (user) {
      var vue =this;
      var userData = user
      userData.roles=[user.role]
      userData.name=user.username
      usersDB.put(userData).then((response)=> {
        $.notify("Success")
        vue.clearForm()
        vue.getUsers()
      }).catch((err)=>{
        let status = 'danger'
        $.notify({message:err.message},{type:status})
      })
    },
    activateUser (id,activeStatus) {
      var vue =this;
      return usersDB.get(id).then(function(doc){
        doc.active = activeStatus
        return usersDB.put(doc)
      })
    },
    clearForm(){
      Object.assign(this.user, { 
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        role:'',
        active: false,
        _id:'',
        type:'user',
      })
      this.button = "Add User"
      document.getElementById('UserFirstNameInput').focus()
    },
    editUser (id,index) {
      var vue =this
      return usersDB.get(id).then(function(doc){
        vue.user.first_name = doc.first_name
        vue.user.last_name = doc.last_name
        vue.user.email = doc.email
        vue.user.phone = doc.phone
        vue.user.username = doc.username
        vue.user.role = doc.role?doc.role:'reader'
        vue.user.roles = doc.roles
        vue.user.password = doc.password
        vue.user.active = doc.active
        vue.user._id = doc._id
        vue.user.type = doc.type
        vue.button = "Update User"
        document.getElementById('UserFirstNameInput').focus()
        return doc
      })
    },
    searchUser(query)  {
      query = query.trim()
      var vue = this
      if(query.trim()==''){
        this.getUsers()
      }else{
        usersDB.createIndex({
          index: {fields: ['name']}
        }).then(function(){
          query="^(?i)"+query
          usersDB.find({
            selector: {
              type: {
                "$eq": 'user'
              },
              $or: [
              {
                first_name: {
                  "$regex": query
                }
              },
              {
                last_name: {
                  "$regex": query
                }
              },
              {
                email: {
                  "$regex": query
                }
              },
              {
                username: {
                  "$regex": query
                }
              },{
                phone: {
                  "$regex": query
                }
              },{
                role: {
                  "$regex": query
                }
              },
              ]
            }
          }).then(function(result){
            vue.users = result.docs
          });
        })
      }
    },
    deleteUser (id,index) {
      var vue= this;
      return usersDB.get(id).then(function (result) {
       usersDB.remove(result)
       vue.clearForm()
       vue.users.splice(index,1)
       return result
     }).catch(function(err){
      console.log(err)
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

input[type="checkbox"],input[type="radio"]{
  transform: scale(2);
  margin: 5px;
}

</style>
