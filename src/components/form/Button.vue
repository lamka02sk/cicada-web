<template>

    <FormItem class="mt-6">
        <button :class="`${color}
                rounded h-9 shadow px-4 text-sm font-bold transition duration-200
                focus:shadow-xl focus:outline-none active:shadow-xl
            `" @click="$emit('click', value)"
            :disabled="disabled" :type="type">
            <slot></slot>
        </button>
        <ButtonStatus v-if="statusType" :type="statusType" :show="statusShow ?? false">
            <slot name="status"></slot>
        </ButtonStatus>
    </FormItem>
    
</template>

<script lang="ts">
    
    import FormItem from './FormItem.vue'
    import ButtonStatus from './ButtonStatus.vue'
    
    export default {
        emits: ['click'],
        components: { FormItem, ButtonStatus },
        props: ['label', 'value', 'disabled', 'type', 'color', 'statusType', 'statusShow'],
        setup(props: any) {
            return {
                value: props.value ?? '',
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
    
    .gray {
        @apply text-gray-200;
        @apply bg-gray-600 hover:bg-gray-500 focus:bg-gray-700 active:bg-gray-700;
    }
    
    button[disabled] {
        @apply pointer-events-none opacity-50;
    }

</style>