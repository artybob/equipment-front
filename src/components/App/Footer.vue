<template>
  <v-footer
      color="primary lighten-1"
      fixed
  >
    <v-container>
    <v-row
        justify="center"
        no-gutters
    >
      <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
          class="primary lighten-2 py-4 text-center white--text"
          cols="12"
      >
        {{ new Date().getFullYear() }} — <strong><a href="https://github.com/artybob">Arty Bob</a></strong>
      </v-col>
    </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    links: [
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us',
    ],
  }),
}
</script>

<style scoped>

</style>