<template>
    
    <Loading v-if="type === 'loading'" :show="show"><slot></slot></Loading>
    
    <div v-else-if="type === 'success'" class="text-emerald-600 text-sm font-medium pl-4 inline-flex items-center">
        <div class="material-icons-outlined pr-1">done</div>
        <slot></slot>
    </div>
    
    <div v-else-if="type === 'error'" class="text-red-600 text-sm font-medium pl-4 inline-flex items-center">
        <div class="material-icons-outlined pr-1">error</div>
        <slot></slot>
    </div>
    
    <div v-else-if="type === 'info'" class="text-purple-700 text-sm font-medium pl-4 inline-flex items-center">
        <div class="material-icons-outlined pr-1">info</div>
        <slot></slot>
    </div>

</template>

<script lang="ts">

    import Loading from "./../../components/form/Loading.vue";

    export default {
        components: { Loading },
        props: ['type', 'show']
    }

</script>

<style scoped>

</style>