<template>
  <div class="sidebar" data-background-color="black" data-active-color="danger">
    <div class="sidebar-wrapper" :style="{'background':background}">
      <div class="logo">
        <router-link to="/home" class="simple-text">Library</router-link>
      </div>
      <div class="user" v-if="$store.state.user.name">
        <p class="name">
          <i class="icon text-info ti-user"></i>
          {{this.$store.state.user.name}}
        </p>
        <p class="role">{{this.$store.state.user.role}}</p>
      </div>
      <ul class="nav">
        <li :key="i" v-for="(menuItem,i) in menuItems">
          <router-link :to="menuItem.path">
            <i :class="menuItem.icon"></i>
            <p>{{menuItem.title}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    menuItems: { default: () => [] }
  },
  computed: {
    sidebar() {
      //Used to change arrow according to sidebar
      return this.$store.state.sidebar;
    },
    background() {
      //Used to change arrow according to sidebar
      if (this.$store.state.user.role === "reader")
        return "linear-gradient(to top, #4feef8, #33166c)";
      if (this.$store.state.user.role === "librarian")
        return "linear-gradient(to top, #e6a32b, #710444)";
      return "linear-gradient(to top, #f86048, #5a0d25)";
    }
  },

  methods: {
    toggleSidebar() {
      // this.sidebar = !this.$store.state.sidebar
      this.$store.dispatch("setSidebar", !this.$store.state.sidebar);
    }
  }
};
</script>

<style>
.sidebar div.user {
  color: #fff;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin: 20px;
  text-transform: capitalize;
}
.sidebar div.user .name {
}
.sidebar div.user .icon {
  margin-right: 10px;
}
.sidebar div.user .role {
  text-transform: uppercase;
  font-size: 12px;
  color: #ccc;
}
</style>