<template>

    <div class="grid grid-flow-col auto-cols-auto gap-4" :class="{ center }">
        <slot></slot>
    </div>

</template>

<script lang="ts">

    export default {
        props: ['center'],
        setup(props: any) {
            return {
            
            }
        }
    }

</script>

<style scoped>

</style>