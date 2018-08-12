<template>
    <div class="container">
        <div class="row">
            <div class="col-12 content">
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
</template>

<script>
import card from "./card.vue";
import rightCard from "./right-card.vue";
import productForm from "../forms/product-form.vue";
import axios from "axios";

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

export default {
  components: {
    card,
    rightCard,
    productForm
  },
  data: function() {
    return {
      displayedData: "products",
      productData: new Product(),
      idEdit: "",
      products: []
    };
  },
  methods: {
    updateContent: function(curr) {
      this.displayedData = curr;
      this.productData = new Product();
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
          self.productData = response.data;
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
          self.products = response.data;
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
          self.productData = new Product();
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
          self.productData = new Product();
          self.getDataArray(route);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>