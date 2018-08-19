<template>
<div class="container">
    <form @submit.prevent="send" class="row">
        <div class="col-6">
            <div class="form-group row">
                <label class="col-2 col-form-label">*Compañía</label>
                <div class="col-10">
                    <input type="text" ref="CompanyName" :value="value.companyName" placeholder="Ingrese Compañia" maxlength="50" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Nombre</label>
                <div class="col-10">
                    <input type="text" ref="FirstName" :value="value.firstName" placeholder="Ingrese Nombre" maxlength="50" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Apellido</label>
                <div class="col-10">
                    <input type="text" ref="LastName" :value="value.lastName" placeholder="Ingrese Apellido" maxlength="50" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Pais</label>
                <div class="col-10">
                    <input type="text" ref="Country" :value="value.country" placeholder="Ingrese País" maxlength="50" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Region</label>
                <div class="col-10">
                    <input type="text" ref="Region" :value="value.region" placeholder="Ingrese Región" class="form-control" maxlength="50">
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group row">
                <label class="col-2 col-form-label">*Ciudad</label>
                <div class="col-10">
                    <input type="text" ref="City" :value="value.city" placeholder="Ingrese Ciudad" maxlength="50" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Dirección</label>
                <div class="col-10">
                    <input type="text" ref="Address" :value="value.address" placeholder="Ingrese Dirección" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Código Postal</label>
                <div class="col-10">
                    <input type="text" ref="PostalCode" :value="value.postalCode" placeholder="Ingrese Código Postal" maxlength="15" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Teléfono</label>
                <div class="col-10">
                    <input type="text" ref="Phone" :value="value.phone" placeholder="Ingrese Teléfono" maxlength="25" class="form-control" pattern="[0-9]{0,}">
                </div>
            </div>
        </div>
        <br>
        <span style="font-size: 0.7em">*Campos obligatorios</span>
        <button class="btn btn-primary btn-lg btn-block">Guardar</button>
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
