<template>

    <FormItem>
        
        <Label class="cursor-pointer text-gray-700">
            <input class="hidden" type="checkbox" v-model="modelValue[name]" :readonly="readonly">
            <span class="checkbox align-middle -ml-[3px]">
                <span class="material-icons-outlined text-blue-700 align-middle" data-value="1">check_box</span>
                <span class="material-icons-outlined text-gray-700 align-middle" data-value="0">check_box_outline_blank</span>
            </span>
            <span class="align-middle ml-1 top-0.5 py-1 relative">{{ label }}</span>
        </Label>
        <div class="relative w-full h-full">
            <Validation :data="modelValue" :property="name" :novalidate="novalidate"></Validation>
            <RequiredIndicator v-bind="{ required, modelValue }" v-if="!novalidate"></RequiredIndicator>
        </div>
    </FormItem>
    
</template>

<script lang="ts">

    import {watch} from "vue";
    
    import Label from './Label.vue'
    import FormItem from './FormItem.vue'
    import Validation from "./Validation.vue"
    import RequiredIndicator from "./RequiredIndicator.vue";

    export default {
        components: { Label, FormItem, Validation, RequiredIndicator },
        emits: ['update:modelValue'],
        props: ['label', 'modelValue', 'name', 'required', 'novalidate', 'readonly'],
        setup(props: any, { emit }: any) {
            
            watch(() => props.modelValue[props.name], () => {
                emit('update:modelValue', props.modelValue);
            })
            
            return {
            
            }
            
        }
    }

</script>

<style lang="scss" scoped>

    input:not(:checked) + .checkbox [data-value="1"] {
        @apply hidden;
    }

    input:checked + .checkbox [data-value="0"] {
        @apply hidden;
    }

</style>