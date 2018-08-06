<template>
    <div class="form-container">
            <form @submit.prevent="send">
                *Nombre Compañia:
                <br>
                <input type="text" ref="CompanyName" :value="value.companyName" placeholder="Ingrese Compañia" maxlength="50" required>
                <br> *Nombre:
                <br>
                <input type="text" ref="FirstName" :value="value.firstName" placeholder="Ingrese Nombre" maxlength="50" required>
                <br> *Apellido:
                <br>
                <input type="text" ref="LastName" :value="value.lastName" placeholder="Ingrese Apellido" maxlength="50" required>
                <br> *Pais:
                <br>
                <input type="text" ref="Country" :value="value.country" placeholder="Ingrese País" maxlength="50" required>
                <br> Region:
                <br>
                <input type="text" ref="Region" :value="value.region" placeholder="Ingrese Región" maxlength="50">
                <br> *Ciudad:
                <br>
                <input type="text" ref="City" :value="value.city" placeholder="Ingrese Ciudad" maxlength="50" required>
                <br> *Dirección:
                <br>
                <input type="text" ref="Address" :value="value.address" placeholder="Ingrese Dirección" required>
                <br> *Código Postal:
                <br>
                <input type="text" ref="PostalCode" :value="value.postalCode" placeholder="Ingrese Código Postal" maxlength="15" required>
                <br> Telefono:
                <br>
                <input type="text" ref="Phone" :value="value.phone" placeholder="Ingrese Teléfono" maxlength="25" pattern="[0-9]{0,}">
                <br>
                <br>
                <span style="font-size: 0.7em">*Campos obligatorios</span><br>
                <button class="btn btn-primary">Guardar</button>
            </form>
        </div>
</template>

<script>
export default {
  props: ["value"],
  methods: {
    send: function() {
      this.$emit("input", {
        companyName: this.$refs.CompanyName.value,
        firstName: this.$refs.FirstName.value,
        lastName: this.$refs.LastName.value,
        country: this.$refs.Country.value,
        region: this.$refs.Region.value,
        city: this.$refs.City.value,
        address: this.$refs.Address.value,
        postalCode: this.$refs.PostalCode.value,
        phone: this.$refs.Phone.value
      });
      this.$emit("save");
    }
  }
};
</script>
