<template>

    <FormItem :class="`${!auto ? 'mt-6' : ''} ${$parent.center ? 'justify-center' : ''} ${small ? 'small' : ''} ${right ? 'justify-end' : ''}`">
        <button :class="`${color}
                rounded shadow font-bold transition duration-200
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
        props: ['label', 'value', 'disabled', 'type', 'color', 'statusType', 'statusShow', 'auto', 'small', 'right'],
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
    
    .mute {
        @apply text-gray-500;
        @apply bg-gray-100 hover:bg-gray-200 focus:bg-gray-300 active:bg-gray-300;
    }
    
    .gray {
        @apply text-gray-200;
        @apply bg-gray-600 hover:bg-gray-500 focus:bg-gray-700 active:bg-gray-700;
    }

    .red {
        @apply text-red-100;
        @apply bg-red-600 hover:bg-red-500 focus:bg-red-700 active:bg-red-700;
    }
    
    button {
        @apply text-sm h-9 px-4;
    }
    
    .small button {
        @apply text-xs h-7 px-3;
    }
    
    button[disabled] {
        @apply pointer-events-none opacity-50;
    }

</style>