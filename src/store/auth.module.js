import { TOKEN_COOKIE } from "../utils/constants";
import axios from '../plugins/axios';
import {eventBus} from "../main";

const API_URL="http://127.0.0.1:8000"
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
            await axios.get(API_URL+'/sanctum/csrf-cookie');
            await axios.post(API_URL+'/api/auth/login', payload).then(({data}) => {
                if(data.data.token) {
                    this.$cookies.remove(TOKEN_COOKIE);
                    this.$cookies.set(TOKEN_COOKIE, data.data.token);
                    dispatch('getUser');
                }
            })
    },
    async getUser({commit}) {
      await axios.get(API_URL+'/api/auth/me').then(({data}) => {
        if (data.data) {
          commit('setUser', data.data);
        }
      }).catch((err) => {
        commit('setUser', null);
        this.$cookies.remove(TOKEN_COOKIE);
      })
    },
    async logout({ commit }) {
        await axios.post(API_URL+'/api/auth/logout').then(() => {
            this.$cookies.remove(TOKEN_COOKIE);
            commit('setUser', null);
        }).catch((err) => {
            this.$cookies.remove(TOKEN_COOKIE);
        })
    },
    async register({ dispatch }, user) {
        await axios.post(API_URL+'/api/auth/register', user).then(({data}) => {
            eventBus.$emit('api-success', data?.message);
        })
    },
};

export default {
  state,
  actions,
  mutations,
  getters
};
