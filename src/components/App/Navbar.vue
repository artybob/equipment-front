<template>
  <div>
    <v-card
        class="mx-auto d-none d-sm-block"
    >

      <v-list-item-group
          v-model="selectedItem"
          color="primary"
      >
        <v-list-item
            v-for="(item, i) in menu"
            :key="i"
            style="display: block;border-top: 1px solid rgba(219, 219, 219, 0.5);"
            :to="item.to"
        >
          <v-list-item-content>
            <i :class="item.icon+ 'fa-solid mr-4'" >
            </i>
            <v-list-item-title v-text="item.title">
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-card>
  </div>
</template>

<script>

import store from "../../store";

export default {
  name: "Navbar",
  data: () => ({
    selectedItem: 1,
    menuItems: [
    ],
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
                {
                  icon: 'fa-solid fa-user ',
                  title: this.user.name,
                  to: '#',
                },
                {
                  icon: 'fa-solid fa-right-from-bracket ',
                  title: 'Logout',
                  to: '/logout',
                },
              ]
              : [
                {
                  icon: 'fa-solid fa-right-from-bracket ',
                  title: 'Login',
                  to: '/login'
                },
                {
                  icon: 'fa-solid fa-address-card ',
                  title: 'Register',
                  to: '/register'
                },
              ]
      )
    },
  },
}
</script>

<style scoped>

</style>