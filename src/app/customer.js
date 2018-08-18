import Vue from 'vue';
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import App from './customer.vue'
import Vuex from 'vuex'

import pagination from './components/pagination.vue'
import shoppingCart from './components/shoppingCart.vue'

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        set(state, newNumber) {
            // newNumber is the payload passed in.
            state.count = newNumber;
        }
    }
})

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
    routes: routes
}
);
new Vue(Vue.util.extend({ router, store }, App)).$mount('#app');
