import axios from '../plugins/axios';
import {eventBus} from '../main'

const API_URL="http://127.0.0.1:8000"
const state = {
    equipment: null,
    equipmentTypes: null,
};
const getters = {
    equipment(state) {
        return state.equipment;
    },
    equipmentTypes(state) {
        return state.equipmentTypes;
    },
};
const mutations = {
    setEquipment(state, payload) {
        state.equipment = payload;
    },
    setEquipmentTypes(state, payload) {
        state.equipmentTypes = payload;
    },
};
const actions = {
    async getEquipment({commit}, payload) {
      await axios.get(API_URL+'/api/equipment/', {params: {page: payload.page, search: payload.search}}, ).then(({data}) => {
        if (data.data) {
          commit('setEquipment', data);
        }
      }).catch((err) => {
          commit('setEquipment', [])
          eventBus.$emit('api-error', err);
          console.log(err)
      })
    },
    async removeEquipment({commit}, id) {
        await axios.delete(API_URL+'/api/equipment/'+id).then(({data}) => {
            if (data.data) {
            }
        }).catch((err) => {
            eventBus.$emit('api-error', err);
            console.log(err)
        })
    },
    async addEquipment({commit}, equipment) {
        await axios.post(API_URL+'/api/equipment/', equipment).then(({data}) => {
            if (data.data) {
            }
        }).catch((err) => {
            eventBus.$emit('api-error', err);
            console.log(err)
        })
    },
    async editEquipment({commit}, equipment) {
        await axios.put(API_URL+'/api/equipment/'+equipment.id, equipment ).then(({data}) => {
            if (data.data) {
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    async equipmentTypes({commit}) {
        await axios.get(API_URL+'/api/equipment_types').then(({data}) => {
            if (data.data) {
                commit('setEquipmentTypes', data.data);
            }
        }).catch((err) => {
            console.log(err)
        })
    },
};

export default {
  state,
  actions,
  mutations,
  getters
};
