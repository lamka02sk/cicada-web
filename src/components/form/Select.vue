<template>
    
    <FormItem>
        <Label :id="id">{{ label }}</Label>
        <select :id="id" v-model="modelValue[name]" :disabled="disabled">
            <template v-for="option in options">
                <option v-if="!Array.isArray(option)" :value="option.value">{{ option.title }}</option>
                <optgroup v-else :label="option[0]">
                    <template v-for="opt in option.slice(1)">
                        <option :value="opt.value">{{ opt.title }}</option>
                    </template>
                </optgroup>
            </template>
        </select>
        <Validation :data="modelValue" :property="name"></Validation>
    </FormItem>
    
</template>

<script lang="ts">

    import {nanoid} from "nanoid";
    import {ref, watch} from "vue";
    
    import Label from './Label.vue'
    import FormItem from './FormItem.vue'
    import Validation from "./Validation.vue";

    export default {
        emits: ['update:modelValue'],
        components: { Label, FormItem, Validation },
        props: ['label', 'modelValue', 'disabled', 'options', 'name'],
        setup(props: any, { emit }: any) {
            
            const uuid = ref(nanoid());
    
            watch(() => props.modelValue[props.name], () => {
                emit('update:modelValue', props.modelValue);
            })
            
            return {
                id: uuid
            }
            
        }
    }

</script>

<style scoped>

</style>