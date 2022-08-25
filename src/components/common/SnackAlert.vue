<template>
  <v-snackbar right top v-model="snackbar" :timeout="timeout" :color="snackColor"
  >{{ alertMessage }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import {eventBus} from "../../main";

export default {
  data: () => ({
    name: "SnackAlert",
    snackbar: false,
    snackColor: "success",
    alertMessage: "",
    timeout: 10000,
  }),
  created() {
    eventBus.$on("api-error", response => {
      this.alertMessage = response ?? 'server error';
      this.alertSnack("error");
    });
    eventBus.$on("api-success", response => {
      this.alertMessage = response ?? 'cool!';
      this.alertSnack("success");
    });
  },
  methods: {
    alertSnack(snackColor) {
      this.snackbar = false;
      this.snackColor = snackColor;
      this.snackbar = true;
    },
  },
}
</script>

<style scoped>

</style>