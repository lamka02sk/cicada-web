<template>
    
    <div class="logo font-brand text-gray-600" :class="large">cicada</div>
    
</template>

<script lang="ts">

    export default {
        props: ['large'],
        setup(props: any) {
            return {
                large: props.large ? 'text-5xl' : 'text-3xl'
            }
        }
    }
    
</script>

<style scoped lang="scss">



</style>