<template>
  <v-sheet color="primary" style="min-height: 112px;">
    <v-container class="pa-0">
      <v-app-bar
          color="primary"
          dark
          flat
      >
        <v-toolbar-title>
          <router-link to="/" style="color: white!important; text-decoration: none;">CRUD APP</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="mt-10">
          <template v-if="this.user">
            <i class="fa-solid fa-user"></i>
            {{ this.user.name.slice(0, 10) }}
            <div>
              <v-btn text to="/logout">
                <i class="fa-solid fa-right-from-bracket"></i>
                logout
              </v-btn>
            </div>
          </template>
          <template v-else>
            <v-btn text to="/login">
              <i class="fa-solid fa-right-from-bracket"></i>
              login
            </v-btn>

            <v-btn text to="/register">
              <i class="fa-solid fa-address-card"></i>
              register
            </v-btn>
          </template>
        </div>
        <template v-slot:extension v-if="this.user">
          <v-tabs
              v-model="selectedItem"
              fixed-tabs
              slider-color="white"
          >
            <v-tab
                v-for="item in menuItems"
                :to="item.to"
            >
              {{ item.title }}
            </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
    </v-container>
  </v-sheet>

</template>

<script>

import store from "../../store";

export default {
  name: "Navbar",
  data: () => ({
    selectedItem: 1,
    menuItems: [
      {
        icon: 'fa-solid fa-computer ',
        title: 'About',
        to: '/about',
      },
      {
        icon: 'fa-solid fa-computer ',
        title: 'Equipment',
        to: '/equipment',
      },
    ],
  }),
  computed: {
    user() {
      return store.getters.user
    },
  },
}
</script>

<style scoped>

</style>