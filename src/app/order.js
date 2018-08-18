import Vue from 'vue';
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import App from './order.vue'

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

import orders from './components/orders.vue'

const routes = [
    {
        path: '/',
        component: orders
    }
];

const router = new VueRouter({
    routes: routes}
);
new Vue(Vue.util.extend({router}, App)).$mount('#app');
