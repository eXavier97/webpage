<template>
    <div class="form-container">
            <form @submit.prevent="send">
                *Compañía:
                <br>
                <input type="text" ref="Company" :value="value.companyName" placeholder="Ingrese Compañía" maxlength="50" required>
                <br> *Telefono:
                <br>
                <input type="text" ref="Phone" :value="value.phone" placeholder="Ingrese Teléfono" maxlength="25" pattern="[0-9]{0,}" required>
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
        companyName: this.$refs.Company.value,
        phone: this.$refs.Phone.value
      });
      this.$emit("save");
    }
  }
};
</script>
