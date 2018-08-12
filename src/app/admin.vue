<template>
<div>
    <div class="navbarCustom" style="justify-content: space-between">
        <ul>
            <li>
                <router-link to="/">Clientes</router-link>
            </li>
            <li>
                <router-link to="/products">Productos</router-link>
            </li>
            <li>
                <router-link to="/employees">Empleados</router-link>
            </li>
            <li>
                <router-link to="/shippers">Agencia de Envios</router-link>
            </li>
            <li>
                <router-link to="/suppliers">Proveedores</router-link>
            </li>
        </ul>
        <ul>
            <li>
                <a href="/logout">Logout</a>
            </li>
        </ul>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
export default {};
</script>
