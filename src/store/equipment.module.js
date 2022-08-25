import axios from '../plugins/axios';
import {eventBus} from "../main";

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
          commit('setEquipment', data);
      }).catch((err) => {
          commit('setEquipment', [])
      })
    },
    async removeEquipment({commit}, id) {
        await axios.delete(API_URL+'/api/equipment/'+id).then(({data}) => {
            eventBus.$emit('api-success', data?.message);
        })
    },
    async storeEquipment({commit}, equipments) {
        await axios.post(API_URL+'/api/equipment/', equipments).then(({data}) => {
            eventBus.$emit('api-success', data?.message);
        })
    },
    async editEquipment({commit}, equipment) {
        await axios.put(API_URL+'/api/equipment/'+equipment.id, equipment ).then(({data}) => {
            eventBus.$emit('api-success', data?.message);
        })
    },
    async equipmentTypes({commit}) {
        await axios.get(API_URL+'/api/equipment-type').then(({data}) => {
                commit('setEquipmentTypes', data.data);
        })
    },
};

export default {
  state,
  actions,
  mutations,
  getters
};
