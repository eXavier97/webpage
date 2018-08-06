<template>
    <div class="form-container">
            <form @submit.prevent="send">
                <br> *Nombre Producto:
                <br>
                <input type="text" ref="Name" :value="value.name" placeholder="Ingrese Producto" maxlength="50" required>
                <br> *Precio:
                <br>
                <input type="number" ref="Price" :value="value.unitPrice" placeholder="Ingrese Precio" min="0" step="0.01" required>
                <br> *Proveedor
                <br>
                <select ref="Supplier" :value="value.supplier" required>
                  <option value="default" disabled>Seleccione un Proveedor</option>
                  <option v-for="s in suppliers" :value="s._id">{{s.companyName}}</option>
                </select>
                <br> Nivel de Reordenamiento:
                <br>
                <input type="number" ref="ReorderLevel" :value="value.reorderLevel" min="0" step="1" placeholder="Ingrese Nivel">
                <br> *Cantidad por Unidad:
                <br>
                <input type="number" ref="QuantityPerUnit" :value="value.quantityPerUnit" min="0" step="1" placeholder="Ingrese Cantidad" required>
                <br> *Unidades en Almacén:
                <br>
                <input type="number" ref="UnitsInStock" :value="value.unitsInStock" min="0" step="1" placeholder="Ingrese Cantidad" required>
                <br> *Unidades en Orden:
                <br>
                <input type="number" ref="UnitsOnOrder" :value="value.unitsOnOrder" min="0" step="1" placeholder="Ingrese Cantidad" required>
                <br> *Categoría:
                <br>
                <input type="text" ref="Category" :value="value.category" placeholder="Ingrese Categoría" maxlength="50" required>
                <br> Descontinuado: 
                <input type="checkbox" ref="Discontinued" :value="value.discontinued" >
                <br>
                <br>
                <span style="font-size: 0.7em">*Campos obligatorios</span><br>
                <button v-if="exists" class="btn btn-primary">Guardar</button>
                <button v-else class="btn btn-disabled" disabled>Guardar</button>
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
        discontinued: Boolean(this.$refs.Discontinued.value)
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
