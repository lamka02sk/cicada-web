<template>
    
    <div :class="`${size}
            inline-flex items-center relative overflow-hidden duration-500 ease-out
        `" :style="{ width: `${width}px` }">
        <div class="px-4 absolute inline-flex" ref="content">
            <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
        props: ['type', 'size', 'show'],
        setup(props: any) {
            
            const content = ref<HTMLElement|null>(null);
            
            const width = ref<any>(0);
            let maxWidth = 0;
            
            onMounted(() => {
                if(content.value) {
                    maxWidth = content.value.getBoundingClientRect().width;
                }
            })
    
            watchEffect(() => {
                width.value = (props.show ?? false) ? maxWidth : 0;
            })
            
            return {
                content,
                size: props.size ?? 'base',
                width
            }
            
        }
    }

</script>

<style lang="scss" scoped>

    .base {
        @apply text-base;
        
        svg {
            @apply h-6 mr-2;
        }
    }

    .xs {
        @apply text-xs;

        svg {
            @apply h-4 mr-2;
        }
    }

    .sm {
        @apply text-sm;
        
        svg {
            @apply h-5 mr-2;
        }
    }

    .lg {
        @apply text-lg;
        
        svg {
            @apply h-7 mr-2;
        }
    }
    .xl {
        @apply text-xl;
        
        svg {
            @apply h-7 mr-2;
        }
    }
    
</style>