<template>

    <FormItem>
        <Label :id="id">{{ label }}</Label>
        <input :id="id" :type="type" v-model="modelValue" :placeholder="placeholder">
    </FormItem>
    
</template>

<script lang="ts">

    import {nanoid} from "nanoid";
    import {ref, watch} from "vue";
    
    import Label from './Label.vue'
    import FormItem from './FormItem.vue'

    export default {
        components: { Label, FormItem },
        emits: ['update:modelValue'],
        props: ['label', 'modelValue', 'type', 'placeholder'],
        setup(props: any, { emit }: any) {
            
            const uuid = ref(nanoid());
            
            watch(() => props.modelValue, () => {
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