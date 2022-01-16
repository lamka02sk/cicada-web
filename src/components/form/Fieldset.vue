<template>

    <fieldset class="pl-5 relative">
        <legend class="-ml-5 pb-2 font-medium text-md text-gray-700">{{ legend }}</legend>
        <slot></slot>
    </fieldset>

</template>

<script lang="ts">

    export default {
        props: ['legend']
    }

</script>

<style lang="scss" scoped>

    fieldset:after {
        content: '';
        @apply absolute left-1 bottom-1 top-0 w-1 rounded-b;
        background: linear-gradient(to bottom, theme('colors.gray.200'), theme('colors.gray.100'));
    }

</style>