import axios from "axios";

const state = {
    token: null,
    tokenParsed: {},    
}

const mutations = {   
    SET_TOKEN(state, payload) {
        state.token = payload
    },
    SET_TOKEN_PARSED(state, payload) {
        state.tokenParsed = payload
    },
}

const getters = {
    authenticated(state) {
        return state.token && state.tokenParsed ? true : false;
    },
    token(state) {
        return state.token;
    },
    refreshToken(state) {
        return state.refreshToken;
    },
    tokenParsed(state) {
        return state.tokenParsed;
    },
    username(state) {
        return state.tokenParsed.preferred_username;
    },
    authorities(state) {
        return state.tokenParsed.authorities ? state.tokenParsed.authorities : []
    },
    databases(state) {
        return state.tokenParsed.databases;
    },
}

const actions = {

    async signIn({ dispatch }, payload) {
        var url = process.env.VUE_APP_AUTH_LOGIN;
        await axios({
            method: "post",
            url: url,
            data: payload,
            headers: { "content-type": "application/x-www-form-urlencoded" },
        }).then((response) => {
            localStorage.setItem('refreshToken', response.data.refresh_token)      
            return dispatch('getUserInfo', response.data.access_token)            
        });
    },

    async getUserInfo({ commit, state }, token) {

        if (token) {
            commit('SET_TOKEN', token)
        }
        if (!state.token) {
            return
        }

        var url = process.env.VUE_APP_AUTH_USER;

        try {
            await axios({
                method: "get",
                url: url,
            }).then((response) => {
                return commit('SET_TOKEN_PARSED', response.data)
            })
        } catch (error) {
            commit('SET_TOKEN', null)
            commit('SET_TOKEN_PARSED', {})            
        }
    },

    async signOut({ commit }) {
        var url = process.env.VUE_APP_AUTH_LOGOUT

        var bodyFormData = new URLSearchParams();
        bodyFormData.append("client_id", process.env.VUE_APP_AUTH_CLIENT_ID);
        bodyFormData.append("refresh_token", localStorage.getItem('refreshToken'));

        return await axios({
            method: "post",
            url: url,
            data: bodyFormData,
            headers: { "content-type": "application/x-www-form-urlencoded" },
        }).then(() => {
            commit('SET_TOKEN', null)
            commit('SET_TOKEN_PARSED', {})           
            localStorage.removeItem('refreshToken')
        });
    },
}

export default {
    state,
    mutations,
    getters,
    actions,
}