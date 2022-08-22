import axios from '../plugins/axios';

const AUTH_API_URL="http://127.0.0.1:8000"
const state = {
    user: null,
};
const getters = {
    equipment(state) {
        return state.equipment;
    },
};
const mutations = {
    setEquipment(state, payload) {
        state.equipment = payload;
    },
};
const actions = {
    async getEquipment({commit}, payload) {
      await axios.get(AUTH_API_URL+'/api/equipment', {params: {page: payload.page, search: payload.search}}, ).then(({data}) => {
        if (data.data) {
          commit('setEquipment', data);
        }
      }).catch((err) => {
          commit('setEquipment', [])
      })
    },
    async removeEquipment({commit}, payload) {
    },
    async addEquipment({commit}, payload) {
    },
    async editEquipment({commit}, payload) {
    },
};

export default {
  state,
  actions,
  mutations,
  getters
};
