<template>
<div>
    <div class="navbarCustom sticky-top" style="justify-content: space-between">
        <ul>
            <li>
                <router-link to="/1">Productos</router-link>
            </li>
        </ul>
        <ul>
            <li>
                <router-link to="/shoppingCar">Cart <span class="badge badge-pill badge-warning" >{{cantidad}}</span></router-link>
            </li>
            <li>
                <a href="/logout">Logout</a>
            </li>
        </ul>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
import axios from "axios";
export default {
  watch: {
    $route(to, from) {
      if (to.fullPath == "/1") {
        this.$router.go();
      }
    }
  },
  computed: {
      cantidad() {
          return this.$store.state.count;
      }
  }
};
</script>