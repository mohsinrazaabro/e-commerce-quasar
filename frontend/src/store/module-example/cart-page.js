const state = {
    cartItems : 0,
    token: localStorage.getItem('token') || ''
}

const mutations = {
    setCartItems(state, payload){
        state.cartItems = payload
    },
    setCurrentToken(state, payload){
        state.token = payload.token
    }
}

const actions = {
    setCartItems(state, payload){
        state.commit('setCartItems', payload)
    },
    setCurrentToken(state, payload){
        state.commit('setCurrentToken', payload)
    }
}

const getters = {
    getCartItems(state) { 
        return state.cartItems
    },
    getCurrentToken(state){
        return state.token
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}