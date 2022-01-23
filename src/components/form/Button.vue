<template>

    <FormItem :class="`${!auto ? 'mt-6' : ''} ${center ? 'justify-center' : ''} ${small ? 'small' : ''} ${right ? 'justify-end' : ''}`">
        <button :class="`${color}
                rounded shadow font-bold transition duration-200
                focus:shadow-xl focus:outline-none active:shadow-xl
            `" @click.stop="emit('click', value)"
            :disabled="disabled" :type="type">
            <slot></slot>
        </button>
        <ButtonStatus v-if="statusType" :type="statusType" :show="statusShow ?? false">
            <slot name="status"></slot>
        </ButtonStatus>
    </FormItem>
    
</template>

<script setup lang="ts">
    
    import FormItem from './FormItem.vue'
    import ButtonStatus from './ButtonStatus.vue'
    import {computed, getCurrentInstance} from "vue";
    
    const props = withDefaults(defineProps<{
        disabled?: boolean,
        value?: any,
        type?: 'button'|'reset'|'submit',
        color?: string,
        statusType?: string,
        statusShow?: boolean,
        auto?: boolean,
        small?: boolean,
        right?: boolean
    }>(), {
        type: 'button',
        color: 'indigo'
    });
    
    const emit = defineEmits(['click']);
    const center = computed(() => !!getCurrentInstance()?.parent?.props.center);

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