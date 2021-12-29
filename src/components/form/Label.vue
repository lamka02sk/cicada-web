<template>
    
    <label :for="id" class="w-full px-px pb-1 text-sm font-medium text-gray-800">
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