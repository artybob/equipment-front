<script setup>
import SnackAlert from "./components/common/SnackAlert.vue";
import Navbar from "./components/App/Navbar.vue";
import Footer from "./components/App/Footer.vue";
</script>

<template>
  <v-app>
    <header>
      <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
    </header>

    <Navbar></Navbar>
    <div>
      <router-view />
      <SnackAlert></SnackAlert>
    </div>
    <Footer></Footer>
  </v-app>
</template>

<script>
import {TOKEN_COOKIE} from "./utils/constants";
import store from "./store";

export default {
  name: "App",
  components: {
  },
  data() {
    return {
      loading: true,
    }
  },
  async created() {
    const token = this.$cookies.get(TOKEN_COOKIE);
    if(token) {
      await store.dispatch('init')
    }
    this.loading = false
  }
}
</script>

<style scoped>
</style>
