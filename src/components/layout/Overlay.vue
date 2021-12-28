<template>

    <div :class="`fixed inset-0 z-50 backdrop-blur bg-white/50 grid place-items-center duration-300 ${showClasses}`">
        <slot></slot>
    </div>
    
</template>

<script lang="ts">

import {ref, watchEffect} from "vue";

export default {
        props: ['show'],
        setup(props: any) {
    
            const showClasses = ref<string>('');
    
            watchEffect(() => {
                showClasses.value = (props.show ?? false)
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible';
            })
            
            return {
                showClasses
            }
            
        }
    }
    
</script>

<style scoped>

</style>