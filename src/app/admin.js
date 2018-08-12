import Vue from 'vue';
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import App from './admin.vue'

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

import customer from './components/admin-pages/customer.vue'
import employee from './components/admin-pages/employee.vue'
import shippers from './components/admin-pages/shippers.vue'
import supplier from './components/admin-pages/supplier.vue'
import product from './components/admin-pages/product.vue'

const routes = [
    {
        path: "/",
        component: customer
    },
    {
        path: "/employees",
        component: employee
    },
    {
        path: "/shippers",
        component: shippers
    },
    {
        path: "/suppliers",
        component: supplier
    },
    {
        path: "/products",
        component: product
    }
];

const router = new VueRouter({
    routes: routes}
);
new Vue(Vue.util.extend({router}, App)).$mount('#app');