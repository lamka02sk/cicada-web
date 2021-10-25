<template>

    <FormItem>
        <Label :id="id">{{ label }}</Label>
        <input :id="id" :type="type" v-model="modelValue" :placeholder="placeholder">
    </FormItem>
    
</template>

<script lang="ts">

    import {nanoid} from "nanoid";
    import {ref} from "vue";
    
    import Label from './Label.vue'
    import FormItem from './FormItem.vue'

    export default {
        components: { Label, FormItem },
        props: ['label', 'modelValue', 'type', 'placeholder'],
        setup(props: any) {
            
            const uuid = ref(nanoid());
            
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