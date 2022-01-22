<template>

    <div :class="`grid ${grid} ${center ? 'center' : ''}`">
        <slot></slot>
    </div>

</template>

<script setup lang="ts">

    import {computed} from "vue";

    const props = defineProps<{
        center?: boolean,
        column?: boolean
    }>();
    
    const grid = computed(() => ({
        1: 'grid-flow-row auto-rows-auto gap-1.5',
        0: 'grid-flow-col auto-cols-auto gap-4'
    }[+!!props.column]));

</script>
