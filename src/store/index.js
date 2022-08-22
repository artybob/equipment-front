import axios from "axios";
import Vue from 'vue'
import Vuex from 'vuex'

import auth from "./auth.module";
import equipment from "./equipment.module";

Vue.use(Vuex)
Vue.config.devtools = true
export default new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
    },
    modules: {
        auth,
        equipment,
    },
})

