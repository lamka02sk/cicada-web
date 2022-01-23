<template>

    <FormItem>
        <Label :id="id">{{ label }}</Label>
        <div class="relative w-full h-full">
            <input :class="hasRightPadding" :id="id" type="password" v-model="modelValue[name]" :placeholder="placeholder" :autocomplete="autocomplete">
            <Validation :data="modelValue" :property="name" @validate="onValidate" :novalidate="novalidate"></Validation>
            <RequiredIndicator v-bind="{ required, name, modelValue }" v-if="!novalidate"></RequiredIndicator>
        </div>
    </FormItem>
    
</template>

<script setup lang="ts">

    import {nanoid} from "nanoid";
    import {ref, watch} from "vue";
    
    import Label from './Label.vue'
    import FormItem from './FormItem.vue'
    import Validation from "./Validation.vue"
    import RequiredIndicator from "./RequiredIndicator.vue";
    
    const props = defineProps<{
        label: string,
        name: string,
        modelValue: any,
        placeholder?: string,
        required?: boolean,
        autocomplete?: string,
        novalidate?: boolean
    }>();
    
    const emit = defineEmits(['update:modelValue'])
            
    const id = ref(nanoid());
    const hasRightPadding = ref<string|null>(null);
            
    watch(() => props.modelValue[props.name], () => {
        emit('update:modelValue', props.modelValue);
    })
    
    function onValidate(valid: boolean|null) {
        hasRightPadding.value = valid !== null ? 'has-padding-right' : null;
    }

</script>
