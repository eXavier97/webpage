<template>

    <div class="container">
    <div class="row">
        <div class="col-12 content">
            <div v-show="display == 'orders'">
                <card img="images/add-product.png" desc="Ordenes Año Actual" @action="view('orders')"></card>
                <right-card img="images/edit-product.png" desc="Ordenes Sin Procesar" @action="edit('orders')"></right-card>
            </div>
            <div v-show="display == 'view-orders'">
                <div class="inner-topbar">
                    ::Editar fecha
                    <i class="material-icons" @click="updateContent('orders')">arrow_back</i>
                </div>
                <hr>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID Orden</th>
                            <th>Cliente</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="c in orders">
                            <td>{{c._id}}</td>
                            <td>{{c.firstName + " " + c.lastName}}</td>
                            <td>
                                <button @click="editData(c._id, 'orders')" class="btn btn-secondary">Editar</button>
                                <button @click="pdf(c._id)" class="btn btn-danger">PDF</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-show="display == 'edit-orders'">
                <div class="inner-topbar">
                    ::Editar fecha
                    <i class="material-icons" @click="updateContent('orders')">arrow_back</i>
                </div>
                <hr>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID Orden</th>
                            <th>Cliente</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="c in orders">
                            <td>{{c._id}}</td>
                            <td>{{c.firstName + " " + c.lastName}}</td>
                            <td>
                                <button @click="editData(c._id, 'orders')" class="btn btn-secondary">Editar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-show="display == 'edit-orders-data'">
                <div class="inner-topbar">
                    ::Editar fecha de orden
                    <i class="material-icons" @click="updateContent('edit-orders')">arrow_back</i>
                </div>
                <hr>
                <order-form v-model="orderData" @save="putData('orders', orderData)"></order-form>
            </div>
        </div>
    </div>
</div>
</template>




<script>
import card from "./card.vue";
import rightCard from "./right-card.vue";
import orderForm from "../forms/order-form.vue";
import axios from "axios";

class Order {
  constructor(
    customerId,
    firstName,
    lastName,
    shipAddress,
    shipCity,
    shipCountry,
    shipPostalCode,
    requiredDate
  ) {
    this.customerId = customerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.shipAddress = shipAddress;
    this.shipCountry = shipCountry;
    this.shipCity = shipCity;
    this.shipPostalCode = shipPostalCode;
    this.requiredDate = requiredDate;
  }
}

export default {
  components: {
    card,
    rightCard,
    orderForm
  },
  data: function() {
    return {
      display: "orders",
      orderData: new Order(),
      idEdit: "",
      orders: [],
      invoice: {
        header: 'FACTURA',
        date_title: 'Fecha',
        payment_terms_title: 'Términos de Pago',
        balance_title: 'Saldo',
        to_title: 'Para',
        item_header: 'Productos',
        quantity_header: 'Cantidad',
        unit_cost_header: 'Precio ',
        amount_header: 'Monto',
        tax_title: 'Impuesto',
        notes_title: 'Notas',
        terms_title: 'Términos',
        logo: "https://i.imgur.com/6xRIbds.png",
        from: "Five Star",
        to: "",
        currency: "HNL",
        number: "",
        payment_terms: "Auto-Facturado",
        items: [],
        fields: {
          tax: "%"
        },
        tax: 15,
        notes: "Gracias por ser un gran cliente!",
        terms:
          "No necesita enviar el pago. Será auto-facturado por este recibo."
      }
    };
  },
  methods: {
    updateContent: function(curr) {
      this.display = curr;
      this.orderData = new Order();
    },
    //General
    view: function(route) {
      this.updateContent("view-" + route);
      axios
        .get("/api/" + route + "/curr")
        .then(res => {
          this.orders = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    edit: function(route) {
      this.updateContent("edit-" + route);
      this.getDataArray(route);
    },
    editData: function(id, route) {
      this.updateContent("edit-" + route + "-data");
      this.getData(id, route);
    },
    getData: function(id, route) {
      var self = this;
      axios
        .get("/api/" + route + "/" + id)
        .then(function(response) {
          // handle success
          console.log(response);
          self.orderData = response.data;
          self.idEdit = response.data._id;
          self.display = "edit-" + route + "-data";
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },
    getDataArray: function(route) {
      var self = this;
      axios
        .get("/api/" + route)
        .then(function(response) {
          // handle success
          console.log(response);
          self.orders = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postData: function(route, data) {
      var self = this;
      axios
        .post("/api/" + route, data)
        .then(function(response) {
          console.log(response);
          self.orderData = new Order();
          self.updateContent(route);
        })
        .catch(function(error) {
          console.log(error);
          windows.alert("Hubo un error al ingresar los datos");
        });
    },
    deleteData: function(id, route) {
      var self = this;
      axios
        .delete("/api/" + route + "/" + id)
        .then(function(response) {
          console.log(response);
          self.getDataArray(route);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    putData: function(route, data) {
      var self = this;
      axios
        .put("/api/" + route + "/" + this.idEdit, data)
        .then(function(response) {
          console.log(response);
          self.updateContent("edit-" + route);
          self.orderData = new Order();
          self.getDataArray(route);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    pdf(id) {
      axios
        .get("/api/orders/" + id)
        .then(res => {
          var productos = res.data.details.productos;
          for (var key in productos) {
            if (productos.hasOwnProperty(key)) {
              this.invoice.items.push({
                name: productos[key].producto.name,
                quantity: productos[key].cantidad,
                unit_cost: productos[key].producto.unitPrice / 100
              });
            }
          }
          this.invoice.to = res.data.firstName + " " + res.data.lastName;
          this.invoice.number = res.data._id;
          axios
            .post("/api/orders/pdf", this.invoice)
            .then(res => {
              console.log(res);
              this.invoice.items = [];
              window.alert('PDF Guardado');
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  }
};
</script>