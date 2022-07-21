const state = {
    layoutDefault: true,
    menuCollapsed: false,
}

const mutations = {
    SET_LAYOUT_DEFAULT(state, payload) {
        state.layoutDefault = payload
    },  
    SET_MENU_COLLAPSED(state, payload) {
        state.menuCollapsed = payload
    },    
}

const getters = {
    getLayoutDefault(state) {
        return state.layoutDefault
    },
    getMenuCollapsed(state) {
        return state.menuCollapsed
    }
}

const actions = { 
    changeLayoutDefault({ commit }, status) {
        commit('SET_LAYOUT_DEFAULT', status)        
    },
    changeMenuCollapsed({ commit }, status) {
        commit('SET_MENU_COLLAPSED', status)        
    },
}

export default {
    state,
    mutations,
    getters,
    actions,
}