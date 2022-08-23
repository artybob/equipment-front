<template>
  <v-container class="deep-purple">
  <v-app-bar
      color="deep-purple accent-4"
      dark
      flat
  >

      <v-toolbar-title>CRUD APP</v-toolbar-title>

      <v-spacer></v-spacer>

      <div>
        <template v-if="this.user">
          <i class="fa-solid fa-user"></i>
          {{ this.user.name }}
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

      <template v-slot:extension>
        <v-tabs
            v-model="selectedItem"
            fixed-tabs
            slider-color="white"
        >
          <v-tab
              v-for="item in menu"
              :href="item.to"
          >
            <i :class="item.icon+ 'fa-solid mr-4'">
            </i>
            {{ item.title }}
          </v-tab>


        </v-tabs>
      </template>



  </v-app-bar>
  </v-container>

</template>

<script>

import store from "../../store";

export default {
  name: "Navbar",
  data: () => ({
    selectedItem: 1,
    menuItems: [],
  }),
  computed: {
    user() {
      return store.getters.user
    },
    menu: function () {
      //render menu
      return this.menuItems.concat(
          this.user
              ? [
                {
                  icon: 'fa-solid fa-computer ',
                  title: 'Equipment',
                  to: '/equipment',
                },
              ]
              : []
      )
    },
  },
}
</script>

<style scoped>

</style>