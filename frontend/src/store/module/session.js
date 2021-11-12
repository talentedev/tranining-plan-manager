import SessionAPI from '../../api/session';

export default {
    namespaced: true,
    state: {
        isLoading: false,
        error: null,
        success: false,
        session: null,
        sessions: [],
        planSessions: [],
        bankSessions: []
    },
    getters: {
        isLoading (state) {
            return state.isLoading;
        },
        hasError (state) {
            return state.error !== null;
        },
        error (state) {
            return state.error;
        },
        success (state) {
            return state.success;
        },
        planSessions (state) {
            return state.planSessions;
        },
        bankSessions (state) {
            return state.bankSessions;
        }
    },
    mutations: {
        ['CREATING_SESSION'](state) {
            state.isLoading = true;
            state.error = null;
            state.success = false;
        },
        ['CREATING_SESSION_SUCCESS'](state, session) {
            state.isLoading = false;
            state.error = null;
            state.success = true;
            state.sessions.unshift(session);
            state.planSessions = state.sessions.filter(item => item.status == 'plan');
            state.bankSessions = state.sessions.filter(item => item.status == 'bank');
        },
        ['CREATING_SESSION_ERROR'](state, error) {
            state.isLoading = false;
            state.error = error;
            state.success = false;
        },
        ['FETCHING_SESSIONS'](state) {
            state.isLoading = true;
            state.error = null;
            state.sessions = [];
        },
        ['FETCHING_SESSIONS_SUCCESS'](state, sessions) {
            state.isLoading = false;
            state.error = null;
            state.sessions = sessions;
            state.planSessions = sessions.filter(item => item.status == 'plan');
            state.bankSessions = sessions.filter(item => item.status == 'bank');
        },
        ['FETCHING_SESSIONS_ERROR'](state, error) {
            state.isLoading = false;
            state.error = error;
            state.sessions = [];
        },
        ['SET_PLAN_SESSIONS'](state, sessions) {
            state.planSessions = sessions;
        },
        ['SET_BANK_SESSIONS'](state, sessions) {
            for (var i = 0; i < sessions.length; i++) {
                sessions[i].status = 'bank';
            }
            state.bankSessions = sessions;
        },
        ['DELETE_SESSION_SUCCESS'](state, session) {
            state.isLoading = true;
            state.sessions = state.sessions.filter(item => item._id !== session._id);
            state.planSessions = state.sessions.filter(item => item.status == 'plan');
            state.bankSessions = state.sessions.filter(item => item.status == 'bank');
        },
    },
    actions: {
        createSession ({commit}, session) {
            commit('CREATING_SESSION');
            return SessionAPI.createSession(session.title, session.description)
                .then(res => {commit('CREATING_SESSION_SUCCESS', res.data)})
                .catch(err => {commit('CREATING_SESSION_ERROR', err)});
        },
        getSessions ({commit}, userId) {
            commit('FETCHING_SESSIONS');
            return SessionAPI.getAll(userId)
                .then(res => commit('FETCHING_SESSIONS_SUCCESS', res.data.docs))
                .catch(err => commit('FETCHING_SESSIONS_ERROR', err));
        },
        setPlanSession ({commit}, sessions) {
            for (var i = 0; i < sessions.length; i++) {
                sessions[i].status = 'plan';
                sessions[i].priority = i;
            }
            commit('SET_PLAN_SESSIONS', sessions);
            if (sessions.length > 0) {
                return SessionAPI.updateSessions(sessions)
                    .then(res => commit('SET_PLAN_SESSIONS', res.data));
            }
        },
        setBankSession ({commit}, sessions) {
            for (var i = 0; i < sessions.length; i++) {
                sessions[i].status = 'bank';
            }
            commit('SET_BANK_SESSIONS', sessions);
            if (sessions.length > 0) {
                return SessionAPI.updateSessions(sessions)
                    .then(res => commit('SET_BANK_SESSIONS', res.data));
            }
        },
        clearPlan ({commit}) {
            let sessions = this.state.session.sessions;
            for (var i = 0; i < sessions.length; i++) {
                sessions[i].status = 'bank';
            }
            commit('FETCHING_SESSIONS_SUCCESS', sessions);
            if (sessions.length > 0) {
                return SessionAPI.updateSessions(sessions);
            }
        },
        moveToPlan ({commit}, session) {
            let sessions = this.state.session.sessions;
            let sessionToUpdate = sessions.findIndex(item => item._id == session._id);
            sessions[sessionToUpdate].status = 'plan';
            commit('FETCHING_SESSIONS_SUCCESS', sessions);
            return SessionAPI.updateSessions([sessions[sessionToUpdate]]);
        },
        moveToBank ({commit}, session) {
            let sessions = this.state.session.sessions;
            let sessionToUpdate = sessions.findIndex(item => item._id == session._id);
            sessions[sessionToUpdate].status = 'bank';
            commit('FETCHING_SESSIONS_SUCCESS', sessions);
            return SessionAPI.updateSessions([sessions[sessionToUpdate]]);
        },
        markAsCompleted ({commit}, session) {
            let sessions = this.state.session.sessions;
            let sessionToUpdate = sessions.findIndex(item => item._id == session._id);
            sessions[sessionToUpdate].completed = true;
            commit('FETCHING_SESSIONS_SUCCESS', sessions);
            return SessionAPI.updateSessions([sessions[sessionToUpdate]]);
        },
        delete ({commit}, session) {
            commit('DELETE_SESSION_SUCCESS', session);
            return SessionAPI.delete(session._id);
        },
    },
}