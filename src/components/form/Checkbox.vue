<template>

    <FormItem>
        
        <Label class="cursor-pointer text-gray-700 pb-0">
            <input class="hidden" type="checkbox" v-model="modelValue[name]" :readonly="readonly">
            <span class="checkbox align-middle -ml-[3px]">
                <span class="material-icons-outlined text-blue-700 align-middle" data-value="1">check_box</span>
                <span class="material-icons-outlined text-gray-700 align-middle" data-value="0">check_box_outline_blank</span>
            </span>
            <span class="align-middle ml-1 top-[2px] relative">{{ label }}</span>
        </Label>
        <div class="relative w-full">
            <Validation :data="modelValue" :property="name" :novalidate="novalidate"></Validation>
            <RequiredIndicator v-bind="{ required, name, modelValue }" v-if="!novalidate"></RequiredIndicator>
        </div>
    </FormItem>
    
</template>

<script setup lang="ts">

    import {watch} from "vue";
    
    import Label from './Label.vue'
    import FormItem from './FormItem.vue'
    import Validation from "./Validation.vue"
    import RequiredIndicator from "./RequiredIndicator.vue";
    
    const props = defineProps<{
        label: string,
        name: string,
        modelValue: any,
        required?: boolean,
        novalidate?: boolean,
        readonly?: boolean
    }>();
    
    const emit = defineEmits(['update:modelValue']);
            
    watch(() => props.modelValue[props.name], () => {
        emit('update:modelValue', props.modelValue);
    })

</script>

<style lang="scss" scoped>

    input:not(:checked) + .checkbox [data-value="1"] {
        @apply hidden;
    }

    input:checked + .checkbox [data-value="0"] {
        @apply hidden;
    }

</style>