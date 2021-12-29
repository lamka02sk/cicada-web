<template>
    
    <FormItem>
        <Label :id="id">{{ label }}</Label>
        <div class="relative">
            <input :id="id" type="number" :min="min" :max="max" :step="step" v-model="modelValue[name]" :placeholder="placeholder">
            <Validation :data="modelValue" :property="name"></Validation>
        </div>
    </FormItem>

</template>

<script lang="ts">

    import {nanoid} from "nanoid";
    import {ref, watch} from "vue";
    
    import Label from './Label.vue'
    import FormItem from './FormItem.vue'
    import Validation from "./Validation.vue"

    export default {
        components: { Label, FormItem, Validation },
        props: ['label', 'modelValue', 'placeholder', 'min', 'max', 'step', 'name'],
        setup(props: any, { emit }: any) {
            
            const uuid = ref(nanoid());
    
            watch(() => props.modelValue[props.name], () => {
                emit('update:modelValue', props.modelValue);
            })
            
            return {
                id: uuid,
                placeholder: props.placeholder ?? null,
                min: props.min ?? null,
                max: props.max ?? null,
                step: props.step ?? null
            }
            
        }
    }

</script>

<style scoped>

</style>