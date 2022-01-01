<template>
    
    <FormItem>
        <Label :id="id">{{ label }}</Label>
        <div class="relative w-full h-full">
            <input :class="hasRightPadding" :id="id" type="number" :min="min" :max="max" :step="step" v-model="modelValue[name]" :placeholder="placeholder">
            <Validation :data="modelValue" :property="name" @validate="onValidate"></Validation>
            <RequiredIndicator v-bind="{ required, modelValue }"></RequiredIndicator>
        </div>
    </FormItem>

</template>

<script lang="ts">

    import {nanoid} from "nanoid";
    import {ref, watch} from "vue";
    
    import Label from './Label.vue'
    import FormItem from './FormItem.vue'
    import Validation from "./Validation.vue"
    import RequiredIndicator from "./RequiredIndicator.vue";

    export default {
        components: { Label, FormItem, Validation, RequiredIndicator },
        props: ['label', 'modelValue', 'placeholder', 'min', 'max', 'step', 'name', 'required'],
        setup(props: any, { emit }: any) {
            
            const uuid = ref<string>(nanoid());
            const hasRightPadding = ref<string|null>(null);
    
            watch(() => props.modelValue[props.name], () => {
                emit('update:modelValue', props.modelValue);
            })
            
            return {
                id: uuid,
                placeholder: props.placeholder ?? null,
                min: props.min ?? null,
                max: props.max ?? null,
                step: props.step ?? null,
                hasRightPadding,
                onValidate(valid: boolean|null) {
                    hasRightPadding.value = valid !== null ? 'has-padding-right' : null;
                }
            }
            
        }
    }

</script>

<style lang="scss" scoped>



</style>