<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <h2>OR</h2>
        <div class="mb-5">
          <h3>As admin:</h3>
          johndoe@example.com
          password
        </div>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            form method="post"
            @submit.prevent="login"
        >
          <v-text-field
              v-model="user.email"
              label="E-mail"
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
    valid: true,
    user: {email: '', password: ''},
    // name: '',
    // nameRules: [
    //   v => !!v || 'Name is required',
    //   v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    // ],
    // emailRules: [
    //   v => !!v || 'E-mail is required',
    //   v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    // ],
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
    // validate() {
    //   this.$refs.form.validate()
    // },
    async login() {
      // this.loading = true
      // this.busy = true;
      // this.errors = null

      try {
        await store.dispatch('login', {'email': this.user.email, 'password': this.user.password}).then(()=>{
          this.$router.push('/equipment/')
        })
        // this.loading = false
        // this.dialogMobileCheck = true
      } catch (e) {
        console.log(e)
        // this.loading = false
        // this.errors = true
      }
      // this.busy = false;
    },
  },
}

</script>

<style scoped>

</style>
