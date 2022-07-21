const state = {
    loading: false,    
}

const mutations = {
    SET_LOADING(state, payload) {
        state.loading = payload
    },    
}

const getters = {
    getLoading(state) {
        return state.loading
    }
}

const actions = { 
    changeLoading({ commit }, status) {
        commit('SET_LOADING', status)        
    },
}

export default {
    state,
    mutations,
    getters,
    actions,
}