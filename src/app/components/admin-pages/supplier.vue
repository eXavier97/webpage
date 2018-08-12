<template>
    <div class="container">
        <div class="row">
            <div class="col-12 content">
                <div v-show="displayedData == 'suppliers'">
                    <card img="images/add-supplier.png" desc="Añadir Proveedor" @action="updateContent('add-suppliers')"></card>
                    <!--
                    <card img="images/delete-client.png" desc="Eliminar Proveedor" @action="updateContent"></card>
                    -->
                    <right-card img="images/edit-supplier.png" desc="Editar Proveedor" @action="edit('suppliers')"></right-card>
                </div>
                <div v-show="displayedData == 'add-suppliers'">
                    <div class="inner-topbar">
                        ::Crear Proveedor
                        <i class="material-icons" @click="updateContent('suppliers')">arrow_back</i>
                    </div>
                    <hr>
                    <supplier-form v-model="supplierData" @save="postData('suppliers', supplierData)"></supplier-form>
                </div>
                <div v-show="displayedData == 'edit-suppliers'">
                    <div class="inner-topbar">
                        ::Editar Proveedor
                        <i class="material-icons" @click="updateContent('suppliers')">arrow_back</i>
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
                            <tr v-for="c in suppliers">
                                <td>{{c.companyName}}</td>
                                <td>{{c.firstName + ' ' + c.lastName}}</td>
                                <td>
                                    <button @click="deleteData(c._id, 'suppliers')" class="btn btn-danger">Eliminar</button>
                                    <button @click="editData(c._id, 'suppliers')" class="btn btn-secondary">Editar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-show="displayedData == 'edit-suppliers-data'">
                    <div class="inner-topbar">
                        ::Editar Información Proveedor
                        <i class="material-icons" @click="updateContent('edit-suppliers')">arrow_back</i>
                    </div>
                    <hr>
                    <supplier-form v-model="supplierData" @save="putData('suppliers', supplierData)"></supplier-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import card from "./card.vue";
import rightCard from "./right-card.vue";
import supplierForm from "../forms/supplier-form.vue";
import axios from "axios";

class Supplier {
  constructor(
    companyName,
    firstName,
    lastName,
    address,
    country,
    city,
    region,
    postalCode,
    phone,
    homepage
  ) {
    this.companyName = companyName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.country = country;
    this.city = city;
    this.region = region;
    this.postalCode = postalCode;
    this.phone = phone;
    this.homepage;
  }
}

export default {
  components: {
    card,
    rightCard,
    supplierForm
  },
  data: function() {
    return {
      displayedData: "suppliers",
      supplierData: new Supplier(),
      idEdit: "",
      suppliers: []
    };
  },
  methods: {
    updateContent: function(curr) {
      this.displayedData = curr;
      this.supplierData = new Supplier();
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
          self.supplierData = response.data;
          self.idEdit = response.data._id;
          self.displayedData = "edit-" + route + "-data";
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
          self.suppliers = response.data;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },
    postData: function(route, data) {
      var self = this;
      axios
        .post("/api/" + route, data)
        .then(function(response) {
          console.log(response);
          self.supplierData = new Supplier();
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
          self.supplierData = new Supplier();
          self.getDataArray(route);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>