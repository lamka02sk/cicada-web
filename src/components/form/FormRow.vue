<template>

    <div :class="`grid ${grid} ${center ? 'center' : ''}`">
        <slot></slot>
    </div>

</template>

<script setup lang="ts">

    import {ref, watchEffect} from "vue";

    const props = defineProps<{
        center?: boolean,
        column?: boolean
    }>();
    
    const grid = ref<string>('');
            
    watchEffect(() => {
        grid.value = {
            1: 'grid-flow-row auto-rows-auto gap-1.5',
            0: 'grid-flow-col auto-cols-auto gap-4'
        }[+(props.column || false)] ?? '';
    })

</script>
