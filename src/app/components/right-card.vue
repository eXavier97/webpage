<template>
    <div class="option-card-right" @click="$emit('action')">
        <span>
            <b>{{desc}}</b>
        </span>
        <img :src=img :alt=desc style="width: 200px;">
    </div>
</template>

<script>
export default {
  props: ["img", "desc"]
};
</script>