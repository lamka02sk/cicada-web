<template>

    <span v-if="valid">
        <span class="material-icons-outlined text-emerald-500 absolute right-0 top-0 z-10 py-1 px-2 text-lg pointer-events-none">done</span>
    </span>
    <span v-else-if="valid !== null">
        <span class="material-icons-outlined text-red-500 absolute right-0 top-0 z-10 py-1 px-2 text-lg pointer-events-none">error</span>
    </span>
    
    <div :class="`overflow-hidden text-red-600 text-xs font-medium relative pt-0.5 ${message.length ? 'opacity-100' : 'opacity-0'} duration-300`"
          :style="{ height: messageHeight }" ref="messageRef">{{ message }}</div>

</template>

<script lang="ts">

    import {ref, watch} from "vue";
    import Validator from "../../validator/Validator";

    export default {
        props: ['data', 'property'],
        emits: ['validate'],
        setup(props: any, { emit }: any) {
    
            const valid = ref<boolean|null>(null);
            const message = ref<string>('');
            const messageRef = ref<HTMLElement|null>(null);
            const messageHeight = ref<string>('0');
            
            if(props.property in (props.data._validator ?? {})) {
    
                const equals = [props.property];
    
                if(props.data._validator[props.property].equals) {
                    equals.push(props.data._validator[props.property].equals);
                }
                
                watch(() => [equals.map(e => props.data[e]), props.data._validator[props.property]._listener], async () => {
                    
                    const validator = new Validator(props.data);
                    valid.value = await validator.validateProperty(props.property);
                    message.value = validator.messages[props.property] ?? '';
                    
                    emit('validate', valid.value);
                    
                    if(messageRef.value) {
                        
                        if(valid.value) {
                            messageHeight.value = '0';
                            return;
                        }
                        
                        const originalHeight = messageHeight.value;
                        
                        messageRef.value.classList.remove('duration-300');
                        messageHeight.value = 'auto';

                        setTimeout(() => {
    
                            if(!messageRef.value) {
                                return;
                            }
    
                            const height = messageRef.value.getBoundingClientRect().height;
                            messageHeight.value = originalHeight;
    
                            setTimeout(() => {
        
                                if(!messageRef.value) {
                                    return;
                                }
        
                                messageRef.value.classList.add('duration-300');
        
                                setTimeout(() => {
                                    messageHeight.value = `${height}px`;
                                })
        
                            });
    
    
                        })
                        
                        
                    }
                    
                })
            }
            
            return {
                valid,
                message,
                messageRef,
                messageHeight
            }
            
        }
    }

</script>

<style lang="scss" scoped>



</style>
