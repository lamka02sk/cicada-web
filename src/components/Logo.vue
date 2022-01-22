<template>
    
    <div class="logo font-brand text-gray-600 text-center" :class="largeClass">cicada</div>
    
</template>

<script setup lang="ts">

    import {computed} from "vue";

    const props = defineProps<{
        large?: boolean
    }>();

    const largeClass = computed(() => props.large ? 'text-5xl' : 'text-3xl');
    
</script>
