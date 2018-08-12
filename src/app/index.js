import Vue from 'vue';
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import App from './index.vue'

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

import home from './components/home.vue'

const routes = [
    {
        path: '/',
        component: home   
    }
];

const router = new VueRouter({
    routes: routes}
);
new Vue(Vue.util.extend({router}, App)).$mount('#app');
