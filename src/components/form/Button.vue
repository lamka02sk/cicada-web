<template>

    <FormItem>
        <button class="rounded h-9 bg-indigo-700 shadow px-4 mt-6 text-sm font-bold text-gray-200 hover:bg-indigo-600 hover:text-white
                focus-visible:bg-indigo-800 focus-visible:text-white focus-visible:shadow-xl active:bg-indigo-800 active:text-white active:shadow-xl"
                :disabled="disabled" :type="type">
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