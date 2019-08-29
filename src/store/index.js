
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selected: 'accessControl',
        userId: '' || sessionStorage.getItem('userId'),
        userInfo: {}
    },
    mutations: {
        saveUserId (state, userId) {
            state.userId = userId || sessionStorage.getItem('userId')
        },
        saveUserInfo (state, userInfo) {
            state.userInfo = userInfo
        },
        checkSelect (state, selected) {
            state.selected = selected
        }
    },
    actions: {
        saveUserId ({commit}) {
            commit('saveUserId')
        },
        saveUserInfo ({commit}) {
            commit('saveUserInfo')
        },
        checkSelect ({commit}) {
            commit('checkSelect')
        }
    }
})