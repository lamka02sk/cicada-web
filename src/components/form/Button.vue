<template>

    <FormItem>
        <button :class="`${color}
                rounded h-9 shadow px-4 mt-6 text-sm font-bold transition duration-200
                focus:shadow-xl focus:outline-none active:shadow-xl
            `"
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
        props: ['label', 'modelValue', 'disabled', 'type', 'color'],
        setup(props: any) {
            return {
                type: props.type ?? 'button',
                color: props.color ?? 'indigo'
            }
        }
    }

</script>

<style lang="scss" scoped>

    .indigo {
        @apply text-gray-200;
        @apply bg-indigo-700 hover:bg-indigo-600 focus:bg-indigo-800 active:bg-indigo-800;
    }

</style>