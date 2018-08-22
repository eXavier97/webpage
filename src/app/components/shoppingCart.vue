<template>
<div class="container content">
    <div class="row">
        <h1>Carrito de Compras</h1>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nombre del Producto</th>
                    <th scope="col">Precio Unitario</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Sub-total</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(s,index) in ShoppingCar" v-bind:key="index">
                    <td> {{s.producto.name}}</td>
                    <td> {{s.producto.unitPrice/100}}</td>
                    <td> {{s.cantidad}}</td>
                    <td> {{s.subtotal/100}}</td>
                    <td>
                        <button @click="eliminarUno(s.producto._id, index)" class="btn btn-primary">-</button>
                        <button @click="eliminarProducto(s.producto._id, index)" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
    <p><b>Cantidad Total:</b> {{cantTotal}}</p>
    <p><b> Total A Pagar:</b> {{Total/100}}</p>
    <a href="/order" style="text-decoration: none; color: white;"><button class="btn btn-primary" v-show="cantTotal != 0">Generar Orden</button></a>

</div>
</template>

<script>
import axios from "axios";
export default {
  name: "shoppingCart",
  data() {
    return {
      ShoppingCar: {},
      cantTotal: 0,
      Total: 0
    };
  },
  created() {
    this.generarC();
  },
  methods: {
    generarC() {
      axios
        .get("http://localhost:3000/customer/shoppingCar")
        .then(res => {
          this.ShoppingCar = res.data.productos;
          this.cantTotal = res.data.CantidadTotal;
          this.Total = res.data.Total;
        })
        .catch(err => console.log(err));
    },
    eliminarUno(id, index) {
      axios
        .get("http://localhost:3000/customer/eliminarUno/" + id)
        .then(res => {
          this.generarC();
          axios
            .get("http://localhost:3000/api/products/" + id)
            .then(res => {
              var cantidad = res.data.unitsInStock;
              axios
                .put("http://localhost:3000/api/products/" + id, {
                  unitsInStock: cantidad + 1
                })
                .then(res => {
                  console.log("actualizado");
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    },
    eliminarProducto(id, index) {
      var c = this.ShoppingCar[index].cantidad;
      axios
        .get("http://localhost:3000/customer/eliminar/" + id)
        .then(res => {
          this.generarC();
          axios
            .get("http://localhost:3000/api/products/" + id)
            .then(res => {
              var cantidad = res.data.unitsInStock;
              axios
                .put("http://localhost:3000/api/products/" + id, {
                  unitsInStock: cantidad +  c
                })
                .then(res => {
                  console.log("actualizado");
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  },
  watch: {
    cantTotal() {
      this.$store.commit("set", this.cantTotal);
    }
  }
};
</script>
