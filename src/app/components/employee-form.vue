<template>
    <div class="form-container">
            <form @submit.prevent='send'>
                <br> *Nombre:
                <br>
                <input type="text" ref="FirstName" :value="value.firstName" placeholder="Ingrese Nombre" maxlength="50" required>
                <br> *Apellido
                <br>
                <input type="text" ref="LastName" :value="value.lastName" placeholder="Ingrese Apellido" maxlength="50" required>
                <br> Título de trabajo:
                <br>
                <input type="text" ref="Title" :value="value.title" placeholder="Ingrese Título" maxlength="50">
                <br> *Teléfono:
                <br>
                <input type="text" ref="Phone" :value="value.phone" placeholder="Ingrese Teléfono" pattern="[0-9]{0,}" maxlength="25" required>
                <br> *Direccion:
                <br>
                <input type="text" ref="Address" :value="value.address" placeholder="Ingrese Dirección" required>
                <br> *Ciudad:
                <br>
                <input type="text" ref="City" :value="value.city" maxlength="50" placeholder="Ingrese Ciudad" required>
                <br> Región:
                <br>
                <input type="text" ref="Region" :value="value.region" placeholder="Ingrese Región" maxlength="50">
                <br> *Codigo postal:
                <br>
                <input type="text" ref="PostalCode" :value="value.postalCode" placeholder="Ingrese Código" maxlength="15" required>
                <br> *Pais:
                <br>
                <input type="text" ref="Country" :value="value.country" placeholder="Ingrese País" maxlength="50" required>
                <br> Fecha Nacimiento:
                <br>
                <input type="date" ref="Birthdate" :value="value.birthdate" placeholder="Ingrese Fecha">
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
        firstName: this.$refs.FirstName.value,
        lastName: this.$refs.LastName.value,
        country: this.$refs.Country.value,
        region: this.$refs.Region.value,
        city: this.$refs.City.value,
        address: this.$refs.Address.value,
        postalCode: this.$refs.PostalCode.value,
        phone: this.$refs.Phone.value,
        title: this.$refs.Title.value,
        birthdate: this.$refs.Birthdate.value
      });
      this.$emit("save");
    }
  }
};
</script>

