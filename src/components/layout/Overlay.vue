<template>

    <div :class="`fixed inset-0 z-50 backdrop-blur bg-white/50 grid place-items-center duration-300 ${showClasses}`">
        <slot></slot>
    </div>
    
</template>

<script setup lang="ts">

    import {computed} from "vue";
    
    const props = defineProps<{
        show: boolean
    }>();
    
    const showClasses = computed<string>(() => props.show ? 'opacity-100 visible' : 'opacity-0 invisible');
    
</script>
