<template>
    
    <label :for="id" class="w-full text-xs font-semibold uppercase text-gray-800">
        <slot></slot>
    </label>

</template>

<script lang="ts">

    export default {
        props: ['id']
    }

</script>

<style scoped>

</style>