<template>
    <div class="container">
        <div class="row">
            <div class="col-12 content">
                <div v-show="displayedData == 'shippers'">
                    <card img="images/add-shipper.png" desc="Añadir Agencia de Envios" @action="updateContent('add-shippers')"></card>
                    <!--
                    <card img="images/delete-client.png" desc="Eliminar Agencia de Envios" @action="updateContent"></card>
                    -->
                    <right-card img="images/edit-shipper.png" desc="Editar Agencia de Envios" @action="edit('shippers')"></right-card>
                </div>
                <div v-show="displayedData == 'add-shippers'">
                    <div class="inner-topbar">
                        ::Crear Agencia de Envios
                        <i class="material-icons" @click="updateContent('shippers')">arrow_back</i>
                    </div>
                    <hr>
                    <shippers-form v-model="shipperData" @save="postData('shippers', shipperData)"></shippers-form>
                </div>
                <div v-show="displayedData == 'edit-shippers'">
                    <div class="inner-topbar">
                        ::Editar Agencia de Envios
                        <i class="material-icons" @click="updateContent('shippers')">arrow_back</i>
                    </div>
                    <hr>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Compañia</th>
                                <th>Teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="c in shippers">
                                <td>{{c.companyName}}</td>
                                <td>{{c.phone}}</td>
                                <td>
                                    <button @click="deleteData(c._id, 'shippers')" class="btn btn-danger">Eliminar</button>
                                    <button @click="editData(c._id, 'shippers')" class="btn btn-secondary">Editar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-show="displayedData == 'edit-shippers-data'">
                    <div class="inner-topbar">
                        ::Editar Información Agencia de Envios
                        <i class="material-icons" @click="updateContent('edit-shippers')">arrow_back</i>
                    </div>
                    <hr>
                    <shippers-form v-model="shipperData" @save="putData('shippers', shipperData)"></shippers-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import card from "./card.vue";
import rightCard from "./right-card.vue";
import shippersForm from "../forms/shippers-form.vue";
import axios from "axios";

class Shipper {
  constructor(companyName, phone) {
    this.companyName = companyName;
    this.phone = phone;
  }
}

export default {
  components: {
    card,
    rightCard,
    shippersForm
  },
  data: function() {
    return {
      displayedData: "shippers",
      shipperData: new Shipper(),
      idEdit: "",
      shippers: []
    };
  },
  methods: {
    updateContent: function(curr) {
      this.displayedData = curr;
      this.shipperData = new Shipper();
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
          self.shipperData = response.data;
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
          self.shippers = response.data;
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
          self.shipperData = new Shipper();
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
          self.shipperData = new Shipper();
          self.getDataArray(route);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>