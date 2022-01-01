<template>

    <FormItem>
        <Label :id="id">{{ label }}</Label>
        <div class="relative w-full h-full">
            <input :class="hasRightPadding" :id="id" type="password" v-model="modelValue[name]" :placeholder="placeholder">
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
        emits: ['update:modelValue'],
        props: ['label', 'modelValue', 'placeholder', 'name', 'strength', 'required'],
        setup(props: any, { emit }: any) {
            
            const uuid = ref(nanoid());
            const hasRightPadding = ref<string|null>(null);
            
            watch(() => props.modelValue[props.name], () => {
                emit('update:modelValue', props.modelValue);
            })
            
            return {
                id: uuid,
                placeholder: props.placeholder ?? null,
                hasRightPadding,
                onValidate(valid: boolean|null) {
                    hasRightPadding.value = valid !== null ? 'has-padding-right' : null;
                }
            }
            
        }
    }

</script>

<style scoped>

</style>