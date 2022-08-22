import { TOKEN_COOKIE } from "../utils/constants";
import axios from '../plugins/axios';

const AUTH_API_URL="http://127.0.0.1:8000"
const state = {
    user: null,
};
const getters = {
    user(state) {
        return state.user;
    },
};
const mutations = {
    setUser(state, payload) {
        state.user = payload;
    },
};
const actions = {
    init({dispatch}) {
        return Promise.all([
            dispatch('getUser')
        ])
    },
    async login({ dispatch }, payload) {
        try {
            await axios.get(AUTH_API_URL+'/sanctum/csrf-cookie');
            await axios.post(AUTH_API_URL+'/api/auth/login', payload).then(({data}) => {
                this.$cookies.remove(TOKEN_COOKIE);
                this.$cookies.set(TOKEN_COOKIE, data.token);
               dispatch('getUser');
            }).catch((err) => {
                console.log(err.response)
                throw err.response
            });
        } catch (e) {
            console.log(e)
            throw e
        }
    },
    async getUser({commit}) {
      await axios.get(AUTH_API_URL+'/api/auth/me').then(({data}) => {
        if (data.data) {
          commit('setUser', data.data);
        }
      }).catch((err) => {
          console.log(err)
        commit('setUser', null);
        this.$cookies.remove(TOKEN_COOKIE);
      })
    },
    // async verifyOld({dispatch} , payload){
    //     await axios.post('/api/verify-old', payload).then(({data}) => {
    //         this.$cookies.set(TOKEN_COOKIE, data.data.access_token,  data.data.expires_in * 60);
    //     }).catch((err) => {
    //         throw err.response
    //     });
    // },
    // async verifyCode({dispatch} , payload){
    //     await axios.post('/api/verify', payload).then((res) => {
    //         return res
    //     }).catch((err) => {
    //         throw err.response
    //     });
    // },
    // async logout({ commit }) {
    //     await axios.get('/api/logout').then((res) => {
    //         this.$cookies.remove(TOKEN_COOKIE);
    //         // this.$cookies.remove(REFRESH_TOKEN_COOKIE);
    //         this.$cookies.set(USER_DATA);
    //         commit('setUser', null);
    //     }).catch((err) => {
    //         console.log(err)
    //         this.$cookies.remove(TOKEN_COOKIE);
    //         this.$cookies.set(USER_DATA);
    //     })
    // },
    // async register(context, payload) {
    //     await axios.post('/api/register', payload).then(({data}) => {
    //         this.$cookies.set(TOKEN_COOKIE, data.data.access_token,  data.data.expires_in * 60);
    //     }).catch((err) => {
    //         throw err.response
    //     })
    // },
    // async registerFinish({dispatch}, payload) {
    //     await axios.post('/api/registration-finish', payload).then(({data}) => {
    //         dispatch('getUser');
    //     }).catch((err) => {
    //         throw err.response
    //     })
    // },
    // async changePassword({dispatch},payload) {
    //     await axios.post('/api/change-password', payload).then((res) => {
    //         dispatch('getUser');
    //     }).catch((err) => {
    //         throw err.response
    //     })
    // },
    // async password({commit},payload) {
    //     await axios.patch('/api/password', payload).then((res) => {
    //
    //     }).catch((err) => {
    //         throw err.response
    //     })
    // },
};

export default {
  state,
  actions,
  mutations,
  getters
};
