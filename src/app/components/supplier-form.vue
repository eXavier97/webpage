<template>
    <div class='form-container'>
            <form @submit.prevent="send">
                *Compañía:
                <br>
                <input type="text" ref="Company" :value="value.companyName" placeholder="Ingrese Compañía" maxlength="50" required>
                <br> *Nombre:
                <br>
                <input type="text" ref="FirstName" :value="value.firstName" placeholder="Ingrese Nombre" maxlength="50" required>
                <br> *Apellido
                <input type="text" ref="LastName" :value="value.lastName" placeholder="Ingrese Apellido" maxlength="50" required>
                <br> Teléfono:
                <br>
                <input type="text" ref="Phone" :value="value.phone" placeholder="Ingrese Teléfono" pattern="[0-9]{0,}" maxlength="25">
                <br> *Dirección:
                <br>
                <input type="text" ref="Address" :value="value.address" placeholder="Ingrese Dirección" required>
                <br> *Ciudad:
                <br> 
                <input type="text" ref="City" :value="value.city" placeholder="Ingrese Ciudad" maxlength="50" required>
                <br> *Código Postal:
                <br>
                <input type="text" ref="PostalCode" :value="value.postalCode" placeholder="Ingrese Código Postal" maxlength="15" required>
                <br> *País:
                <br>
                <input type="text" ref="Country" :value="value.country" placeholder="Ingrese País" maxlength="50" required>
                <br> *Región:
                <br>
                <input type="text" ref="Region" :value="value.region" placeholder="Ingrese Región" maxlength="50" required>
                <br> Homepage:
                <br>
                <input type="text" ref="Homepage" :value="value.homepage" placeholder="Ingrese Homepage">
                <br>
                <br>
                <span style="font-size: 0.7em">*Campos obligatorios</span>
                <button class="btn btn-primary">Guardar</button>
            </form>
        </div>
</template>

<script>
export default {
  props: ["value", "edit"],
  methods: {
    send: function() {
      this.$emit("input", {
        companyName: this.$refs.Company.value,
        firstName: this.$refs.FirstName.value,
        lastName: this.$refs.LastName.value,
        country: this.$refs.Country.value,
        region: this.$refs.Region.value,
        city: this.$refs.City.value,
        address: this.$refs.Address.value,
        postalCode: this.$refs.PostalCode.value,
        phone: this.$refs.Phone.value,
        homepage: this.$refs.Homepage.value
      });
      if (this.edit) {
        this.$emit("save", {
          display: "edit-supplier",
          route: "/api/suppliers/"
        });
      } else {
        this.$emit("save", { display: "Supplier", route: "/api/suppliers" });
      }
    }
  }
};
</script>

