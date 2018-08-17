<template>
<div class="hello" >
  <div class="container">
    <div class="row" v-if="ShoppingCar">
      <h1> Mi Carrito de Compras</h1>
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
          <tr  v-for="(s,index) in ShoppingCar"  v-bind:key="index">
            <td> {{s.producto.name}}</td>
            <td> {{s.producto.unitPrice}}</td>
            <td> {{s.cantidad}}</td>
            <td> {{s.subtotal}}</td>
            <td> <button @click="eliminarUno(s.producto._id)" class="btn btn-primary">-</button> <button  @click="eliminarProducto(s.producto._id)" class="btn btn-danger">Eliminar</button></td>
          </tr>
    
      </tbody>
      </table>
      <p>Cantidad Total:{{cantTotal}}</p>
      <p> Total A Pagar:{{Total}}</p>
    </div>



    <div class="row" v-else>
      <h2>No hay Productos en el Carrito de Compras</h2>
    </div>

    <div>
      <button > Generar Orden</button>
    </div>
</div>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "shoppingCart",
  data() {
    return {
      ShoppingCar: [],
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
    eliminarUno(id) {
      axios
        .get("http://localhost:3000/customer/eliminarUno/" + id)
        .then(res => {
          this.generarC();
        })
        .catch(err => console.log(err));
    },
    eliminarProducto(id) {
      axios
        .get("http://localhost:3000/customer/eliminar/" + id)
        .then(res => {
          this.generarC();
        })
        .catch(err => console.log(err));
    }
  }
};
</script>