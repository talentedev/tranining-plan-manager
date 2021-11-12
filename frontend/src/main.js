import "core-js/stable";
import "regenerator-runtime/runtime";
import 'intersection-observer';

import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import router from './router';
import store from './store';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

new Vue({
    template: '<App/>',
    components: { App },
    router,
    store
}).$mount('#app');
