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
        <v-col
            class="text-center white--text"
            cols="12"
        >
          {{ new Date().getFullYear() }} — <strong><a class="white--text" href="https://github.com/artybob">Arty Bob</a></strong>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({}),
}
</script>

<style scoped>

</style>