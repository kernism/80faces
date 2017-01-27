import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        authenticated: false,
        layout: 'grid',
    },

    mutations: {
        authenticated (state, payload) {
            state.authenticated = payload;
        },
        layout (state, payload) {
            state.layout = payload;
        }
    }
});
