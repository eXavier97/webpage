<template>
    <div>
        <div class="container content">
            <div class="row">
                <form class="form-group">
                    <div class="col-8 offset-2">
                        <h2>LLenar Orden</h2>
                        <hr>
                        <label>Nombre</label>
                        <input type="text" :value="firstName" placeholder="Nombre" required>
                        <label>Apellido</label>
                        <input type="text" :value="lastName" placeholder="Apellido" required>
                        <label>Dirección</label>
                        <input type="text" :value="shipAddress" placeholder="Direccion de Envio" required>
                        <label>Ciudad</label>
                        <input type="text" :value="shipCity" placeholder="Ciudad" required>
                        <label>Region</label>
                        <input type="text" :value="shipRegion" placeholder="Región" required>
                        <label>Código Postal</label>
                        <input type="text" :value="shipPostalCode" placeholder="Código Postal" required>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            shipAddress: "",
            shipCity: "",
            shipRegion: "",
            shipPostalCode: ""
        }
    }
    
}
</script>
