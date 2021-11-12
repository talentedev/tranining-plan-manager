import Vue from 'vue';
import Vuex from 'vuex';
import SecurityModule from './security';
import Session from './module/session';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        security: SecurityModule,
        session : Session
    },
});