<template>
<div class="container">
    <!--productos -->
    <div class="row ">
        <div v-for="(p,indexes) in productos" v-bind:key="indexes" class="p-4">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" :src=p.Img alt="Card image cap" style="height:300px">
                <div class="card-body">
                    <h5 class="card-title"><strong>{{p.name}}</strong></h5>
                    <div class="clearfix">
                        <div class="precio" style="float:left"> L.{{p.unitPrice/100}}</div>
                        <button class="btn btn-add pull-right" @click="validarExistencia(p)" style="float:right">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <!--paginacion -->
        <div class="row">
            <div v-if="pages">
                <nav class="mx-auto">
                    <ul class="pagination">
                        <!--First Page -->
                        <li class="page-item" v-if="current==1" :disabled="current=='1'">
                            <a href="#" class="page-link">First Page</a>
                        </li>
                        <li class="page-item" v-else-if="current!=1">
                            <a @click="navegara('1')" class="page-link">First Page</a>
                        </li>
                        <!--Items en medio  -->
                        <li class="page-item" v-if="ind!=1">
                            <a href="#" class="page-link" v-if="ind!=1">...</a>
                        </li>
                        <!--ciclo for -->
                        <div v-for="(indice,index) in indices" v-bind:key="index" v-if="indice>0">

                            <li class="page-item" v-show="indice==current">
                                <a class="page-link" v-show="indice==current">{{indice}}</a>
                            </li>

                            <li class="page-item" v-show="indice!=current">
                                <a @click="navegara(indice)" class="page-link" v-show="indice!=current">{{indice}}</a>
                            </li>

                        </div>

                        <!--ciclo for -->
                        <!--items en medio  -->
                        <!-- Last Page -->

                        <li class="page-item" v-show="(ind==1) && ((indices.length-1)<pages) ">
                            <a class="page-link">...</a>
                        </li>
                        <li class="page-item" v-if="current==pages" :disabled="current==pages">
                            <a href="#" class="page-link">Last Page</a>
                        </li>
                        <li class="page-item" v-else-if="current!=pages">
                            <a @click="navegara(pages)" class="page-link">Last Page</a>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "pagination",
  data() {
    return {
      productos: [],
      current: "",
      pages: "",
      cantidad: 0
    };
  },
  created() {
    axios
      .get("http://localhost:3000/customer/shoppingCar")
      .then(res => {
        this.$store.commit("set", res.data.CantidadTotal);
      })
      .catch(err => console.log(err));
    this.mostrarP();
  },
  methods: {
    mostrarP() {
      axios
        .get("http://localhost:3000/customer/" + this.$route.params.page)
        .then(res => {
          this.productos = res.data.data;
          this.current = res.data.current;
          this.pages = res.data.pages;
        })
        .catch(err => console.log(err));
    },
    navegara(p) {
      this.$router.push({ name: "pagination", params: { page: p } });
      this.mostrarP();
    },
    agregar(id) {
      axios
        .get("http://localhost:3000/customer/AgregarAlCarrito/" + id)
        .then(res => {
          this.$store.commit("set", res.data);
        })
        .catch(err => console.log(err));
    },
    validarExistencia(p) {
      axios
        .get("http://localhost:3000/api/products/" + p._id)
        .then(res => {
          if (res.data.unitsInStock > 0) {
            this.agregar(p._id);
            //put
            axios
              .put("http://localhost:3000/api/products/" + p._id, {
                unitsInStock: res.data.unitsInStock - 1
              })
              .then(res => {
                console.log("actualizado");
                if (res.data.unitsInStock == 0) {
                  this.productos.splice(this.productos.indexOf(p), 1);
                }
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    }
  },
  computed: {
    ind: function() {
      var indice = Number(this.current) > 5 ? Number(this.current) - 4 : 1;

      return indice;
    },
    indices: function() {
      var indices = [];
      var indice = this.ind;
      for (
        indice;
        indice <= Number(this.current) + 4 && indice <= this.pages;
        indice++
      ) {
        indices[indice] = indice;
      }
      return indices;
    }
  }
};
</script>