<template>
    
    <div :class="`inline-flex items-center relative overflow-hidden duration-500 ease-out text-sm font-medium text-gray-700 ${classes}`"
         :style="{ width: `${width}px` }">
        <div class="pl-4 absolute inline-flex" ref="content">
            <svg :class="`${show ? 'animate-spin' : ''} h-5 mr-2`" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="align-middle"><slot></slot></span>
        </div>
    </div>
    
</template>

<script lang="ts">

import {onMounted, ref, watchEffect} from "vue";

    export default {
        props: ['type', 'show'],
        setup(props: any) {
            
            const content = ref<HTMLElement|null>(null);
            const classes = ref<string>('');
            
            const width = ref<any>(0);
            let maxWidth = ref<number>(0);
            
            onMounted(() => {
                if(content.value) {
                    maxWidth.value = content.value.getBoundingClientRect().width;
                }
            })
    
            watchEffect(() => {
                classes.value = (props.show ?? false) ? 'opacity-100 visible' : 'opacity-0 invisible';
                width.value = (props.show ?? false) ? maxWidth.value : 0;
            })
            
            return {
                content,
                classes,
                width
            }
            
        }
    }

</script>

<style lang="scss" scoped>


    
</style>