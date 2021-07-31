// your-project/store/index.js

export const state = () => ({
    authUser: '',
    tokenUser: '',
    dataUser: null,
})

export const getters = {
    GET_USER: (state) => {
        return state.authUser
    },

    GET_DATA_USER: (state) => {
        return state.dataUser
    },

    GET_TOKEN_USER: (state) => {
        return state.tokenUser
    },
}

export const actions = {
    async onAuthStateChangedAction({ commit, dispatch }, { authUser, claims }) {
        if (!authUser) {
            //await dispatch('cleanupAction')
            return
        } else {
            const { uid, email, emailVerified, displayName, photoURL } = authUser

            commit('SET_USER', {
              uid,
              email,
              emailVerified,
              displayName,
              photoURL,
              isAdmin: claims.custom_claim
            })
        }
    },

    async nuxtServerInit({ dispatch, commit }, { res }) {
        if (res && res.locals && res.locals.user) {
            const { allClaims: claims, idToken: token, ...authUser } = res.locals.user
        
            await dispatch('onAuthStateChangedAction', {
                authUser,
                claims,
                token
            })
        
            // or
        
            commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims, token })
        }
    },

    updateToken: function({commit}, payload) {
        commit('addToken', payload)
    },
}

export const mutations = {

    SET_DATA_USER (state, value) {
        state.dataUser = value
    },

    SET_TOKEN_USER (state, value) {
        state.tokenUser = value
    },

    SET_USER: (state, payload) => {
        state.authUser = payload;
    },

    ON_AUTH_STATE_CHANGED_MUTATION (state, { authUser, claims }) {

        const { uid, email, emailVerified, displayName, photoURL } = authUser
        
        state.authUser = {
            uid,
            displayName,
            email,
            emailVerified,
            photoURL: photoURL || null,
            isAdmin: claims.custom_claim
        }
    },
}