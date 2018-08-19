<template>
<div class="container">
    <form @submit.prevent="send">
        <div class="form-group row">
            <label class="col-2 col-form-label">*Compañia</label>
            <div class="col-10">
                <input type="text" ref="Company" :value="value.companyName" placeholder="Ingrese Compañía" maxlength="50" class="form-control" required>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-2 col-form-label">*Teléfono</label>
            <div class="col-10">
                <input type="text" ref="Phone" :value="value.phone" placeholder="Ingrese Teléfono" maxlength="25" pattern="[0-9]{0,}" class="form-control" required>
            </div>
        </div>

        <span style="font-size: 0.7em">*Campos obligatorios</span>
        <br>
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
        companyName: this.$refs.Company.value,
        phone: this.$refs.Phone.value
      });
      this.$emit("save");
    }
  }
};
</script>
