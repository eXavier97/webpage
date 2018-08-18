<template>
<div>
    <div class="navbarCustom sticky-top" style="justify-content: space-between">
        <ul>
            <li>
                <a href="/customer#/1">Productos</a>
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
export default {
    
}
</script>