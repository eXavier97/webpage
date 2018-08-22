<template>
    <div class="container">
        <div class="row">
            <div class="col-12 content">
                <div v-show="display == 'customers'">
                    <card img="images/edit-customer.png" desc="Editar Cliente" @action="edit('customers')"></card>
                </div>
                <div v-show="display == 'add-customers'">
                    <div class="inner-topbar">
                        ::Crear Cliente
                        <i class="material-icons" @click="updateContent('customers')">arrow_back</i>
                    </div>
                    <hr>
                    <customer-form v-model="customerData" @save="postData('customers', customerData)"></customer-form>
                </div>
                <div v-show="display == 'edit-customers'">
                    <div class="inner-topbar">
                        ::Editar Cliente
                        <i class="material-icons" @click="updateContent('customers')">arrow_back</i>
                    </div>
                    <hr>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Compañia</th>
                                <th>Contacto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="c in customers">
                                <td>{{c.companyName}}</td>
                                <td>{{c.firstName + ' ' + c.lastName}}</td>
                                <td>
                                    <button @click="deleteData(c._id, 'customers')" class="btn btn-danger">Eliminar</button>
                                    <button @click="editData(c._id, 'customers')" class="btn btn-secondary">Editar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-show="display == 'edit-customers-data'">
                    <div class="inner-topbar">
                        ::Editar Información Cliente
                        <i class="material-icons" @click="updateContent('edit-customers')">arrow_back</i>
                    </div>
                    <hr>
                    <customer-form v-model="customerData" @save="putData('customers', customerData)"></customer-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import card from "./card.vue";
import rightCard from "./right-card.vue";
import customerForm from "../forms/customer-form.vue";
import axios from "axios";

class Customer {
  constructor(
    companyName,
    firstName,
    lastName,
    country,
    region,
    city,
    address,
    postalCode,
    phone
  ) {
    this.companyName = companyName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.region = region;
    this.city = city;
    this.address = address;
    this.postalCode = postalCode;
    this.phone = phone;
  }
}

export default {
  components: {
    card,
    rightCard,
    customerForm,
  },
  data: function() {
    return {
      display: "customers",
      customerData: new Customer(),
      idEdit: "",
      customers: []
    };
  },
  methods: {
    updateContent: function(curr) {
      this.display = curr;
      this.customerData = new Customer();
    },
    //General
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
          self.customerData = response.data;
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
          self.customers = response.data;
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
          self.customerData = new Customer();
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
          self.customerData = new Customer();
          self.getDataArray(route);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>