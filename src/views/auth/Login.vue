<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">

        <v-form
            class="mt-16"
            ref="form"
            lazy-validation
            form method="post"
            @submit.prevent="login"
        >
          <v-text-field
              v-model="user.email"
              label="E-mail"
              :rules="emailRules"
              required
              @change="saveUserStorage()"
          ></v-text-field>

          <v-text-field
              v-model="user.password"
              label="Password"
              :rules="passwordRules"
              required
              @change="saveUserStorage()"
          ></v-text-field>

          <v-btn
              type="submit"
              class="mr-4"
              :loading="loading"
          >
            Login
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import store from '../../store';

export default {
  name: "login",
  data: () => ({
    user: {email: '', password: ''},
    loading: false,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 5) || 'Password must be more than 5 characters',
    ],
  }),
  mounted() {
    if ((localStorage.getItem('user') !== null)) {
      this.user = JSON.parse(localStorage.user);
    }
  },
  methods: {
    saveUserStorage() {
      localStorage.setItem('user', JSON.stringify({email: this.user.email, password: this.user.password,}));
    },
    async login() {
      if(!this.$refs.form.validate()) {
        return
      }

      this.loading = true

      try {
        await store.dispatch('login', {'email': this.user.email, 'password': this.user.password}).then(()=>{
          this.$router.push('/equipment/')
        })
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
  },
}

</script>

<style scoped>

</style>
