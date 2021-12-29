<template>

    <FormItem>
        <Label :id="id">{{ label }}</Label>
        <div class="relative">
            <input :id="id" :type="type" v-model="modelValue[name]" :placeholder="placeholder">
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
        emits: ['update:modelValue'],
        props: ['label', 'modelValue', 'type', 'placeholder', 'name'],
        setup(props: any, { emit }: any) {
            
            const uuid = ref(nanoid());
            
            watch(() => props.modelValue[props.name], () => {
                emit('update:modelValue', props.modelValue);
            })
            
            return {
                id: uuid,
                type: props.type ?? 'text',
                placeholder: props.placeholder ?? null
            }
            
        }
    }

</script>

<style scoped>

</style>