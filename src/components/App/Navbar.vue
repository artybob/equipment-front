<template>
  <v-card style="background: #272727;">
    <v-container>
      <v-toolbar
          color="deep-purple accent-4"
          dark
          flat
      >

        <v-toolbar-title>CRUD APP </v-toolbar-title>

        <v-spacer></v-spacer>

        <div>
          <template v-if="this.user">
            <i class="fa-solid fa-user"></i>
            {{this.user.name}}
            <div>
              <v-btn  text to="/logout">
                <i class="fa-solid fa-right-from-bracket"></i>
                logout
              </v-btn>
            </div>
          </template>
          <template v-else>
            <v-btn  text to="/login">
              <i class="fa-solid fa-right-from-bracket"></i>
              login
            </v-btn>

            <v-btn  text to="/register">
              <i class="fa-solid fa-address-card"></i>
              register
            </v-btn>
          </template>

        </div>
        <!--      <v-btn icon>-->
        <!--        <v-icon>mdi-magnify</v-icon>-->
        <!--      </v-btn>-->

        <!--      <v-btn icon>-->
        <!--        <v-icon>mdi-dots-vertical</v-icon>-->
        <!--      </v-btn>-->
        <template v-slot:extension>
          <v-tabs
              centered
              v-model="selectedItem"
              fixed-tabs
              slider-color="white"
          >
            <v-tab
                v-for="item in menu"
                :href="item.to"
            >
              <i :class="item.icon+ 'fa-solid mr-4'" >
              </i>
              {{ item.title }}
            </v-tab>


          </v-tabs>
        </template>



      </v-toolbar>
    </v-container>

  </v-card>


<!--     <div style="background: grey">-->
<!--        <v-container>-->
<!--          <v-tabs-->
<!--              center-active-->
<!--              v-model="selectedItem"-->
<!--              dense-->
<!--          >-->
<!--            <v-tab-->
<!--                v-for="(item, i) in menu"-->
<!--                :key="i"-->
<!--                style="display: block;border-top: 1px solid rgba(219, 219, 219, 0.5);"-->
<!--                :to="item.to"-->
<!--            >-->
<!--                <i :class="item.icon+ 'fa-solid mr-4'" >-->
<!--                </i>-->
<!--              {{item.title}}-->
<!--            </v-tab>-->
<!--          </v-tabs>-->
<!--        </v-container>-->
<!--     </div>-->


<!--  <div>-->
<!--    <v-card-->
<!--        class="mx-auto d-none d-sm-block"-->
<!--    >-->

<!--      <v-list-item-group-->
<!--          v-model="selectedItem"-->
<!--          color="primary"-->
<!--      >-->
<!--        <v-list-item-->
<!--            v-for="(item, i) in menu"-->
<!--            :key="i"-->
<!--            style="display: block;border-top: 1px solid rgba(219, 219, 219, 0.5);"-->
<!--            :to="item.to"-->
<!--        >-->
<!--          <v-list-item-content>-->
<!--            <i :class="item.icon+ 'fa-solid mr-4'" >-->
<!--            </i>-->
<!--            <v-list-item-title v-text="item.title">-->
<!--            </v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->
<!--      </v-list-item-group>-->
<!--    </v-card>-->
<!--  </div>-->
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
              ]
              : [

              ]
      )
    },
  },
}
</script>

<style scoped>

</style>