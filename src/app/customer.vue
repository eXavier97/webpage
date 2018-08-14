<template>
<div>
    <div class="navbarCustom" style="justify-content: space-between">
        <ul>
            <li>
                <router-link to="/1">Productos</router-link>
            </li>
        </ul>
        <ul>
            <li>
                <router-link to="/shoppingCar">Cart<span class="badge">2</span></router-link>
            </li>
            <li>
                <a href="/logout">Logout</a>
            </li>
        </ul>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
export default {
    
}
</script>