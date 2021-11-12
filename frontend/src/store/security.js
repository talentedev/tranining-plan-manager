import SecurityAPI from '../api/security';

export default {
    namespaced: true,
    state: {
        isLoading: false,
        error: null,
        success: false,
        isAuthenticated: false,
        email: null,
        userId: null
    },
    getters: {
        isLoading(state) {
            return state.isLoading;
        },
        hasError(state) {
            return state.error !== null;
        },
        error(state) {
            return state.error;
        },
        success(state) {
            return state.success;
        },
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
        email(state) {
            return state.email;
        },
        userId(state) {
            return state.userId;
        }
    },
    mutations: {
        ['SIGNUP_SUCCESS'](state) {
            state.isLoading = false;
            state.error = null;
            state.isAuthenticated = false;
        },
        ['SIGNUP_ERROR'](state, error) {
            state.isLoading = false;
            state.error = error;
            state.isAuthenticated = false;
        },
        ['AUTHENTICATING'](state) {
            state.isLoading = true;
            state.error = null;
            state.isAuthenticated = false;
        },
        ['AUTHENTICATING_SUCCESS'](state, data) {
            state.isLoading = false;
            state.error = null;
            state.isAuthenticated = true;
            state.email = data.user.email;
            state.userId = data.user._id;
        },
        ['AUTHENTICATING_ERROR'](state, error) {
            state.isLoading = false;
            state.error = error;
            state.isAuthenticated = false;
        },
        ['LOGOUT'](state) {
            state.isLoading = false;
            state.error = null;
            state.isAuthenticated = false;
        }
    },
    actions: {
        register({commit}, payload) {
            commit('AUTHENTICATING');
            return SecurityAPI.register(payload.email, payload.password)
                .then(() => {
                    commit('SIGNUP_SUCCESS')
                })
                .catch(err => commit('SIGNUP_ERROR', err));
        },
        login({commit}, payload) {
            commit('AUTHENTICATING');
            return SecurityAPI.login(payload.email, payload.password)
                .then(res => {
                    commit('AUTHENTICATING_SUCCESS', res.data)
                    let token = res.data.token;
                    localStorage.setItem("token", token);
                })
                .catch(err => commit('AUTHENTICATING_ERROR', err));
        },
        logout({commit}) {
            commit('LOGOUT');
            localStorage.setItem("token", null);
        }
    }
}