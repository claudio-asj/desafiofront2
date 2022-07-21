<template>
  <header :class="{ 'header-collapsed': menuCollapsed }">
    <label for="check">
      <i class="fas fa-bars" id="sidebar-btn"></i>
    </label>
    <div class="right-area">
      <span>{{ username }}</span>

      <b-button variant="link" class="logout-btn" @click="logoutUser"
        >Logout</b-button
      >
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      menuCollapsed: "getMenuCollapsed",
      username: "username",
    }),
  },
  methods: {
    ...mapActions({
      signOut: "signOut",
    }),
    logoutUser() {
      this.signOut().then(() => {
        this.$router.replace({
          name: "login",
        });
      });
    },
  },
};
</script>

<style scoped>
header {
  position: fixed;
  background: #fff;
  padding: 20px;
  height: 70px;
  display: flex;
  left: 250px;
  right: 0;
  align-items: center;
  justify-content: space-between;
  transition: 0.5s;
  transition-property: left;
  z-index: 5;
}

.left-area h3 {
  color: #ff5a00;
  margin: 0;
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 900;
}

.right-area {
  display: flex;
  align-items: center;
}

.logout-btn {
  background: #fff;
  text-decoration: none;
  float: right;
}

label #sidebar-btn {
  z-index: 1;
  color: #2a3042;
  position: absolute;
  cursor: pointer;
  font-size: 20px;
  transition: 0.5s;
  transition-property: color;
}

label #sidebar-btn:hover {
  color: #c0c2c7;
}

.header-collapsed {
  left: 60px;
}

@media only screen and (max-width: 992px) {
  header {
    left: 0;
    transition: 0s;
    transition-property: left;
  }
}
</style>