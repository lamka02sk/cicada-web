<template>
    <component :is="tag" :class="classes">
        <slot></slot>
    </component>
</template>

<script setup lang="ts">

    import {computed} from "vue";

    const props = defineProps<{
        tag: string
    }>();

    const classes = computed(() => ({
        h2: 'text-gray-700 text-2xl',
        h3: 'text-gray-700 text-xl'
    }[props.tag]));

</script>