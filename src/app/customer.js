import Vue from 'vue';
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import App from './customer.vue'

import pagination from './components/pagination.vue'
import shoppingCart from './components/shoppingCart.vue'

Vue.use(VueRouter);
Vue.use(VueAxios, axios);


const routes = [
    {
        path: "/shoppingCar",
        component: shoppingCart,
        name: "shoppingCart"
    },
    {
        path: "/:page",
        component: pagination,
        name: "pagination"
    }
];

const router = new VueRouter({
    routes: routes}
);
new Vue(Vue.util.extend({router}, App)).$mount('#app');
