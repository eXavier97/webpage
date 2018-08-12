<template>
    <div class="container">
        <div class="row">
            <div class="col-12 content">
                <div v-show="displayedData == 'employees'">
                    <card img="images/add-employee.png" desc="Añadir Empleado" @action="updateContent('add-employees')"></card>
                    <!--
                    <card img="images/delete-client.png" desc="Eliminar Empleado" @action="updateContent"></card>
                    -->
                    <right-card img="images/edit-employee.png" desc="Editar Empleado" @action="edit('employees')"></right-card>
                </div>
                <div v-show="displayedData == 'add-employees'">
                    <div class="inner-topbar">
                        ::Crear Empleado
                        <i class="material-icons" @click="updateContent('employees')">arrow_back</i>
                    </div>
                    <hr>
                    <employee-form v-model="employeeData" @save="postData('employees', employeeData)"></employee-form>
                </div>
                <div v-show="displayedData == 'edit-employees'">
                    <div class="inner-topbar">
                        ::Editar Empleado
                        <i class="material-icons" @click="updateContent('employees')">arrow_back</i>
                    </div>
                    <hr>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Título</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="c in employees">
                                <td>{{c.firstName + " " + c.lastName}}</td>
                                <td>{{c.title}}</td>
                                <td>
                                    <button @click="deleteData(c._id, 'employees')" class="btn btn-danger">Eliminar</button>
                                    <button @click="editData(c._id, 'employees')" class="btn btn-secondary">Editar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-show="displayedData == 'edit-employees-data'">
                    <div class="inner-topbar">
                        ::Editar Información Empleado
                        <i class="material-icons" @click="updateContent('edit-employees')">arrow_back</i>
                    </div>
                    <hr>
                    <employee-form v-model="employeeData" @save="putData('employees', employeeData)"></employee-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import card from "./card.vue";
import rightCard from "./right-card.vue";
import employeeForm from "../forms/employee-form.vue";
import axios from "axios";

class Employee {
  constructor(
    firstName,
    lastname,
    title,
    address,
    city,
    region,
    postalCode,
    country,
    phone,
    birthdate
  ) {
    this.firstName = firstName;
    this.lastName = lastname;
    this.title = title;
    this.address = address;
    this.city = city;
    this.region = region;
    this.postalCode = postalCode;
    this.country = country;
    this.phone = phone;
    this.birthdate = birthdate;
  }
}

export default {
  components: {
    card,
    rightCard,
    employeeForm
  },
  data: function() {
    return {
      displayedData: "employees",
      employeeData: new Employee(),
      idEdit: "",
      employees: []
    };
  },
  methods: {
    updateContent: function(curr) {
      this.displayedData = curr;
      this.employeeData = new Employee();
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
          self.employeeData = response.data;
          var fecha = new Date(response.data.birthdate);
          fecha =
            fecha.getUTCFullYear().toString() +
            "-" +
            (fecha.getUTCMonth() + 1).toString() +
            "-" +
            fecha.getUTCDate();
          self.employeeData.birthdate = fecha;
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
          self.employees = response.data;
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
          self.employeeData = new Employee();
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
          self.employeeData = new Employee();
          self.getDataArray(route);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>