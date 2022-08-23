<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            form method="post"
            @submit.prevent="register"
        >
          <v-text-field
              v-model="user.email"
              label="E-mail"
              required
              @change="saveUserStorage()"
          ></v-text-field>

          <v-text-field
              v-model="user.name"
              label="Nickname"
              required
              @change="saveUserStorage()"
          ></v-text-field>

          <v-text-field
              v-model="user.password"
              label="Password"
              required
              @change="saveUserStorage()"
          ></v-text-field>

          <v-btn
              type="submit"
              class="mr-4"
          >
            <!--            :disabled="!valid"-->
            Register
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import store from "../../store";

export default {
    name: "Register",
    data() {
        return {
          valid: true,
          user: {email: '', password: '', name: ''},
        }
    },
    methods: {
        saveUserStorage() {
          localStorage.setItem('user', JSON.stringify({email: this.user.email, password: this.user.password, name: this.user.name}));
        },
        async register() {
          try {
            await store.dispatch('register', this.user).then(() => {
              this.$router.push('/equipment/')
            })
            // this.loading = false
            // this.dialogMobileCheck = true
          } catch (e) {
            console.log(e)
            // this.loading = false
            // this.errors = true
          }
        },
    },
    mounted() {
      if ((localStorage.getItem('user') !== null)) {
        this.user = JSON.parse(localStorage.user);
      }
    },
}
</script>
