<template>
    
    <label :for="id" class="w-full px-px pb-1 text-sm font-medium text-gray-800">
        <slot></slot>
    </label>

</template>

<script setup lang="ts">

    const props = defineProps<{
        id?: string
    }>();

</script>
