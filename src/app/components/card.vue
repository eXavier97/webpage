<template>
    <div class="option-card" @click="$emit('action')">
            <img :src=img :alt=desc style="width: 200px;">
            <span>
                <b>{{desc}}</b>
            </span>
    </div>
</template>

<script>
export default {
    props: ['img', 'desc']
}
</script>
