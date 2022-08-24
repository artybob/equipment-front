<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <v-form
            class="mt-16"
            ref="form"
            lazy-validation
            form method="post"
            @submit.prevent="register"
        >
          <v-text-field
              :rules="emailRules"
              v-model="user.email"
              label="E-mail"
              required
              @change="saveUserStorage()"
          ></v-text-field>

          <v-text-field
              :rules="nameRules"
              v-model="user.name"
              label="Name"
              required
              @change="saveUserStorage()"
          ></v-text-field>

          <v-text-field
              :rules="passwordRules"
              v-model="user.password"
              label="Password"
              required
              @change="saveUserStorage()"
          ></v-text-field>

          <v-btn
              :loading="loading"
              type="submit"
              class="mr-4"
          >
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
          loading: false,
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ],
          passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 5) || 'Password must be more than 5 characters',
          ],
          nameRules: [
            v => (v && v.length >= 5) || 'Name must be more than 2 characters',
          ],
        }
    },
    methods: {
        saveUserStorage() {
          localStorage.setItem('user', JSON.stringify({email: this.user.email, password: this.user.password, name: this.user.name}));
        },
        async register() {
          if(!this.$refs.form.validate()) {
            return
          }
          this.loading = true
            await store.dispatch('register', this.user).then(() => {
              this.$router.push('/login')
            }).catch((e) => {
              console.log(e)
            }).finally(()=> {
              this.loading = false
            })
        },
    },
    mounted() {
      if ((localStorage.getItem('user') !== null)) {
        this.user = JSON.parse(localStorage.user);
      }
    },
}
</script>
