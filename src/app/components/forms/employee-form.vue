<template>
<div class="form-container">
    <form @submit.prevent='send' class="row">
        <div class="col-6">
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
                <label class="col-2 col-form-label">Título</label>
                <div class="col-10">
                    <input type="text" ref="Title" :value="value.title" placeholder="Ingrese Título de Trabajo" class="form-control" maxlength="50">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Teléfono</label>
                <div class="col-10">
                    <input type="text" ref="Phone" :value="value.phone" placeholder="Ingrese Teléfono" pattern="[0-9]{0,}" maxlength="25" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Dirección</label>
                <div class="col-10">
                    <input type="text" ref="Address" :value="value.address" placeholder="Ingrese Dirección" class="form-control" required>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group row">
                <label class="col-2 col-form-label">*Ciudad</label>
                <div class="col-10">
                    <input type="text" ref="City" :value="value.city" maxlength="50" placeholder="Ingrese Ciudad" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">Región</label>
                <div class="col-10">
                    <input type="text" ref="Region" :value="value.region" placeholder="Ingrese Región" class="form-control" maxlength="50">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Código</label>
                <div class="col-10">
                    <input type="text" ref="PostalCode" :value="value.postalCode" placeholder="Ingrese Código Postal" maxlength="15" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*País</label>
                <div class="col-10">
                    <input type="text" ref="Country" :value="value.country" placeholder="Ingrese País" maxlength="50" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-2 col-form-label">*Fecha Nacimiento</label>
                <div class="col-10">
                    <input type="date" ref="Birthdate" :value="value.birthdate" class="form-control" required>
                </div>
            </div>
        </div>
        <span style="font-size: 0.7em">*Campos obligatorios</span>
        <button class="btn btn-primary btn-block btn-lg">Guardar</button>
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

