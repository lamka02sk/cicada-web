<template>
    
    <FormItem>
        <Label :id="id">{{ label }}</Label>
        <input :id="id" type="number" :min="min" :max="max" :step="step" v-model="modelValue" :placeholder="placeholder" class="w-full rounded shadow-sm px-2 h-9 text-sm">
    </FormItem>

</template>

<script lang="ts">

    import {nanoid} from "nanoid";
    import {ref} from "vue";
    
    import Label from './Label.vue'
    import FormItem from './FormItem.vue'

    export default {
        components: { Label, FormItem },
        props: ['label', 'modelValue', 'placeholder', 'min', 'max', 'step'],
        setup(props: any) {
            
            const uuid = ref(nanoid());
            
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