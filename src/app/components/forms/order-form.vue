<template>
    <div class="container">
            <form @submit.prevent="send" class="row">
              <div class="col-6">
                <div class="form-group row">
                    <label class="col-2 col-form-label">ID Cliente</label>
                    <div class="col-10">
                        <input type="text" ref="customerID" :value="value.customerId" maxlength="50" class="form-control" disabled>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Nombre</label>
                    <div class="col-10">
                        <input type="text" ref="firstName" :value="value.firstName" maxlength="50" class="form-control" disabled>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Apellido</label>
                    <div class="col-10">
                        <input type="text" ref="lastName" :value="value.lastName"  maxlength="50" class="form-control" disabled>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Dirección</label>
                    <div class="col-10">
                        <input type="text" ref="shipAddress" :value="value.shipAddress" maxlength="50" class="form-control" disabled>
                    </div>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group row">
                    <label class="col-2 col-form-label">Ciudad</label>
                    <div class="col-10">
                        <input type="text" ref="shipCity" :value="value.shipCity" maxlength="50" class="form-control" disabled>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">País</label>
                    <div class="col-10">
                        <input type="text" ref="shipCountry" :value="value.shipCountry" maxlength="50" class="form-control" disabled>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">ZIP</label>
                    <div class="col-10">
                        <input type="text" ref="shipPostalCode" :value="value.shipPostalCode" maxlength="50" class="form-control" disabled>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Fecha Envío</label>
                    <div class="col-10">
                        <input type="date" ref="requiredDate" :value="value.requiredDate" class="form-control" required>
                    </div>
                </div>
              </div>
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
        customerId: this.$refs.customerID.value,
        firstName: this.$refs.firstName.value,
        lastName: this.$refs.lastName.value,
        shipAddress: this.$refs.shipAddress.value,
        shipCity: this.$refs.shipCity.value,
        shipCountry: this.$refs.shipCountry.value,
        shipPostalCode: this.$refs.shipPostalCode.value,
        requiredDate: this.$refs.requiredDate.value
      });
      this.$emit("save");
    }
  }
};
</script>
