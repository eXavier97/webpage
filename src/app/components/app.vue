<template>
    <div>
    <div class="navbarCustom">
        <div @click="updateContent('customers')">Clientes</div>
        <div @click="updateContent('products')">Productos</div>
        <div @click="updateContent('employees')">Empleados</div>
        <div @click="updateContent('shippers')">Agencia de Envios</div>
        <div @click="updateContent('suppliers')">Proveedores</div>
        <div style="margin-left: auto"><span class="fa fa-sign-in"></span><a style="color: white" href="/logout">Logout</a></div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-12 content">
                <div id="displayed-content">
                    <!-- Customers -->
                    <div>
                        <div v-show="displayedData == 'customers'">
                            <card img="images/add-client.png" desc="Añadir Cliente" @action="updateContent('add-customers')"></card>
                            <!--
                            <card img="images/delete-client.png" desc="Eliminar Cliente" @action="updateContent"></card>
                            -->
                            <right-card img="images/edit-client.png" desc="Editar Cliente" @action="edit('customers')"></right-card>
                        </div>
                        <div v-show="displayedData == 'add-customers'">
                            <div class="inner-topbar">
                                ::Crear Cliente
                                <i class="material-icons" @click="updateContent('customers')">arrow_back</i>
                            </div>
                            <hr>
                            <customer-form v-model="customerData" @save="postData('customers', customerData)"></customer-form>
                        </div>
                        <div v-show="displayedData == 'edit-customers'">
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
                        <div v-show="displayedData == 'edit-customers-data'">
                            <div class="inner-topbar">
                                ::Editar Información Cliente
                                <i class="material-icons" @click="updateContent('edit-customers')">arrow_back</i>
                            </div>
                            <hr>
                            <customer-form v-model="customerData" @save="putData('customers', customerData)"></customer-form>
                        </div>
                    </div>
                    <!--Suppliers-->
                    <div>
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
                            <customer-form v-model="supplierData" @save="postData('suppliers', supplierData)"></customer-form>
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
                            <customer-form v-model="supplierData" @save="putData('suppliers', supplierData)"></customer-form>
                        </div>
                    </div>
                    <!--Shippers-->
                    <div>
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
                    <!--Employees-->
                    <div>
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
                    <!--Products-->
                    <div>
                        <div v-show="displayedData == 'products'">
                            <card img="images/add-product.png" desc="Añadir Producto" @action="updateContent('add-products')"></card>
                            <!--
                            <card img="images/delete-client.png" desc="Eliminar Producto" @action="updateContent"></card>
                            -->
                            <right-card img="images/edit-product.png" desc="Editar Producto" @action="edit('products')"></right-card>
                        </div>
                        <div v-show="displayedData == 'add-products'">
                            <div class="inner-topbar">
                                ::Crear Producto
                                <i class="material-icons" @click="updateContent('products')">arrow_back</i>
                            </div>
                            <hr>
                            <product-form v-model="productData" @save="postData('products', productData)"></product-form>
                        </div>
                        <div v-show="displayedData == 'edit-products'">
                            <div class="inner-topbar">
                                ::Editar Producto
                                <i class="material-icons" @click="updateContent('products')">arrow_back</i>
                            </div>
                            <hr>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="c in products">
                                        <td>{{c.name}}</td>
                                        <td>{{c.unitPrice}}</td>
                                        <td>
                                            <button @click="deleteData(c._id, 'products')" class="btn btn-danger">Eliminar</button>
                                            <button @click="editData(c._id, 'products')" class="btn btn-secondary">Editar</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-show="displayedData == 'edit-products-data'">
                            <div class="inner-topbar">
                                ::Editar Información Producto
                                <i class="material-icons" @click="updateContent('edit-products')">arrow_back</i>
                            </div>
                            <hr>
                            <product-form v-model="productData" @save="putData('products', productData)"></product-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import card from "./card.vue";
import rightCard from "./right-card.vue";
import customerForm from "./customer-form.vue";
import employeeForm from "./employee-form.vue";
import productForm from "./product-form.vue";
import shippersForm from "./shippers-form.vue";
import supplierForm from "./supplier-form.vue";
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

class Product {
  constructor(
    name,
    supplier,
    category,
    quantityPerUnit,
    unitPrice,
    unitsInStock,
    unitsOnOrder,
    reorderLevel,
    discontinued
  ) {
    this.name = name;
    this.supplier = supplier;
    this.category = category;
    this.quantityPerUnit = quantityPerUnit;
    this.unitPrice = unitPrice;
    this.unitsInStock = unitsInStock;
    this.unitsOnOrder = unitsOnOrder;
    this.reorderLevel = reorderLevel;
    this.discontinued = discontinued;
  }
}

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
    customerForm,
    employeeForm,
    productForm,
    shippersForm,
    supplierForm
  },
  data: function() {
    return {
      displayedData: "customers",

      customerData: new Customer(),
      productData: new Product(),
      supplierData: new Supplier(),
      employeeData: new Employee(),
      shipperData: new Shipper(),

      idEdit: "",

      customers: [],
      products: [],
      suppliers: [],
      shippers: [],
      employees: []
    };
  },
  methods: {
    updateContent: function(curr) {
      this.displayedData = curr;
      switch (curr) {
        case "customers":
          this.customerData = new Customer();
          break;
        case "products":
          this.productData = new Product();
          break;
        case "employees":
          this.employeeData = new Employee();
          break;
        case "shippers":
          this.shipperData = new Shipper();
          break;
        case "suppliers":
          this.supplierData = new Supplier();
      }
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
          switch (route) {
            case "customers":
              self.customerData = response.data;
              break;
            case "products":
              self.productData = response.data;
              break;
            case "employees":
              self.employeeData = response.data;
              var fecha = new Date(response.data.birthdate);
              fecha =
                fecha.getUTCFullYear().toString() +
                "-" +
                (fecha.getUTCMonth() + 1).toString() +
                "-" +
                fecha.getUTCDate();
              self.employeeData.birthdate = fecha;
              break;
            case "shippers":
              self.shipperData = response.data;
              break;
            case "suppliers":
              self.supplierData = response.data;
          }
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
          switch (route) {
            case "customers":
              self.customers = response.data;
              break;
            case "products":
              self.products = response.data;
              break;
            case "employees":
              self.employees = response.data;
              break;
            case "shippers":
              self.shippers = response.data;
              break;
            case "suppliers":
              self.suppliers = response.data;
          }
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
          switch (route) {
            case "customers":
              self.customerData = new Customer();
              break;
            case "products":
              self.productData = new Product();
              break;
            case "employees":
              self.employeeData = new Employee();
              break;
            case "shippers":
              self.shipperData = new Shipper();
              break;
            case "suppliers":
              self.supplierData = new Supplier();
          }
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
          switch (route) {
            case "customers":
              self.customerData = new Customer();
              break;
            case "products":
              self.productData = new Product();
              break;
            case "employees":
              self.employeeData = new Employee();
              break;
            case "shippers":
              self.shipperData = new Shipper();
              break;
            case "suppliers":
              self.supplierData = new Supplier();
          }
          self.getDataArray(route);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

