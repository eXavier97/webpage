<template>
<div>
    <div class="container content">
        <form @submit.prevent="send()" class="row">
            <div class="col-8 offset-2">
                <h2>Datos de Orden</h2>
                <hr>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Nombre</label>
                    <div class="col-10">
                        <input type="text" v-model="firstName" placeholder="Nombre" class="form-control" readonly required>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Apellido</label>
                    <div class="col-10">
                        <input type="text" v-model="lastName" placeholder="Apellido" class="form-control" readonly required>
                    </div>
                </div>
                <h3>Información de Envio</h3>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Dirección</label>
                    <div class="col-10">
                        <input type="text" v-model="shipAddress" placeholder="Direccion de Envio" class="form-control" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Ciudad</label>
                    <div class="col-10">
                        <input type="text" v-model="shipCity" placeholder="Ciudad" class="form-control" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Region</label>
                    <div class="col-10">
                        <input type="text" v-model="shipRegion" placeholder="Región" class="form-control" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Pais</label>
                    <div class="col-10">
                        <input type="text" v-model="shipCountry" placeholder="País" class="form-control" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-2 col-form-label">Codigo Postal</label>
                    <div class="col-10">
                        <input type="text" v-model="shipPostalCode" placeholder="Código Postal" class="form-control" required>
                    </div>
                </div>
                <button class="btn btn-primary btn-lg btn-block">Generar Orden</button>
            </div>
        </form>
        
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      customerId: "",
      firstName: "",
      lastName: "",
      shipAddress: "",
      shipCity: "",
      shipRegion: "",
      shipCountry: "",
      shipPostalCode: "",
      requiredDate: null,
      details: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get("/api/user").then(res => {
        this.customerId = res.data.id;
        this.firstName = res.data.firstName;
        this.lastName = res.data.lastName;
        this.details = res.data.cart;
      });
    },
    send() {
      axios
        .post("/api/orders", {
          customerId: this.customerId,
          firstName: this.firstName,
          lastName: this.lastName,
          shipAddress: this.shipAddress,
          shipCity: this.shipCity,
          shipRegion: this.shipRegion,
          shipCountry: this.shipCountry,
          shipPostalCode: this.shipPostalCode,
          requiredDate: this.requiredDate,
          details: this.details
        })
        .then(res => {
            window.alert('Orden generada con exito!');
          location = res.data.redirect;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
