<template>

    <FormItem>
        <button :disabled="disabled" :type="type">
            <slot></slot>
        </button>
    </FormItem>
    
</template>

<script lang="ts">
    
    import FormItem from './FormItem.vue'
    
    export default {
        emits: ['update:modelValue'],
        components: { FormItem },
        props: ['label', 'modelValue', 'disabled', 'type'],
        setup(props: any) {
            return {
                type: props.type ?? 'button'
            }
        }
    }

</script>

<style scoped>

</style>