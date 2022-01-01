<template>
    <span v-if="required || modelValue?._validator?.[name]?.required" class="absolute right-2 -top-3 z-10 text-red-400">✱</span>
</template>

<script lang="ts">

    export default {
        props: ['required', 'modelValue']
    }

</script>