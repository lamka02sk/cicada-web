<template>
    
    <FormItem>
        <Label :id="id">{{ label }}</Label>
        <select :id="id" v-model="modelValue" :disabled="disabled">
            <template v-for="option in options">
                <option v-if="!Array.isArray(option)" :value="option.value">{{ option.title }}</option>
                <optgroup v-else :label="option[0]">
                    <template v-for="opt in option.slice(1)">
                        <option :value="opt.value">{{ opt.title }}</option>
                    </template>
                </optgroup>
            </template>
        </select>
    </FormItem>
    
</template>

<script lang="ts">

    import {nanoid} from "nanoid";
    import {ref, watch} from "vue";
    
    import Label from './Label.vue'
    import FormItem from './FormItem.vue'

    export default {
        emits: ['update:modelValue'],
        components: { Label, FormItem },
        props: ['label', 'modelValue', 'disabled', 'options'],
        setup(props: any, { emit }: any) {
            
            const uuid = ref(nanoid());
    
            watch(() => props.modelValue, () => {
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