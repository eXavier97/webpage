<template>
<div class="container">
    <form @submit.prevent="send" class="row">
        <div class="col-6">
            <div class="form-group row">
                <label class="col-2 col-form-label">*Producto</label>
                <div class="col-10">
                    <input type="text" ref="Name" :value="value.name" placeholder="Ingrese Nombre Producto" maxlength="50" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Precio</label>
                <div class="col-10">
                    <input type="number" ref="Price" :value="value.unitPrice" placeholder="Ingrese Precio" min="0" step="0.01" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Proveedor</label>
                <div class="col-10">
                    <select ref="Supplier" :value="value.supplier" class="form-control" required>
                        <option value="default" disabled>Seleccione un Proveedor</option>
                        <option v-for="s in suppliers" :value="s._id">{{s.companyName}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Categoría</label>
                <div class="col-10">
                    <input type="text" ref="Category" :value="value.category" placeholder="Ingrese Categoría" maxlength="50" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Reord</label>
                <div class="col-10">
                    <input type="number" ref="ReorderLevel" :value="value.reorderLevel" min="0" step="1" placeholder="Ingrese Nivel de Reordenamiento" class="form-control">
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group row">
                <label class="col-2 col-form-label">*Unidades</label>
                <div class="col-10">
                    <input type="number" ref="QuantityPerUnit" :value="value.quantityPerUnit" min="0" step="1" placeholder="Ingrese Cantidad Por Unidad" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Almacén</label>
                <div class="col-10">
                    <input type="number" ref="UnitsInStock" :value="value.unitsInStock" min="0" step="1" placeholder="Ingrese Cantidad en Almacén" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Orden</label>
                <div class="col-10">
                    <input type="number" ref="UnitsOnOrder" :value="value.unitsOnOrder" min="0" step="1" placeholder="Ingrese Cantidad en Orden" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Imagen</label>
                <div class="col-10">
                    <input type="text" ref="img" :value="value.Img" placeholder="Ingrese Url" class="form-control" required>
                </div>
            </div>
            <div>
                <label>Descontinuado</label>
                <input type="checkbox" ref="Discontinued" :value="value.discontinued" class="form-checkbox-input">
            </div>
            
        </div>
        <span style="font-size: 0.7em">*Campos obligatorios</span>
        <button v-if="exists" class="btn btn-primary btn-lg btn-block">Guardar</button>
        <button v-else class="btn btn-disabled btn-lg btn-block" disabled>Guardar</button>
    </form>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      suppliers: [],
      exists: false
    };
  },
  props: ["value"],
  created() {
    this.getSuppliers();
  },
  methods: {
    send: function() {
      this.$emit("input", {
        name: this.$refs.Name.value,
        supplier: this.$refs.Supplier.value,
        category: this.$refs.Category.value,
        quantityPerUnit: this.$refs.QuantityPerUnit.value,
        unitPrice: this.$refs.Price.value,
        unitsInStock: this.$refs.UnitsInStock.value,
        unitsOnOrder: this.$refs.UnitsOnOrder.value,
        reorderLevel: this.$refs.ReorderLevel.value,
        discontinued: Boolean(this.$refs.Discontinued.value),
        Img: this.$refs.img.value
      });
      this.$emit("save");
    },

    getSuppliers() {
      var self = this;
      axios
        .get("/api/suppliers")
        .then(response => {
          self.suppliers = response.data;
          if (self.suppliers.length < 1) {
            self.exists = false;
          } else {
            self.exists = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
