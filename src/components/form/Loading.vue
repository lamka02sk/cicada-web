<template>
    
    <div class="text-center my-12 text-2xl font-semibold text-gray-500" v-if="large">
        <svg :class="`${show ? 'animate-spin' : ''} h-8 mr-4 inline-block -top-0.5 relative`" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Loading</span>
    </div>
    <template v-else>
        <svg :class="`${show ? 'animate-spin' : ''} h-5 mr-2`" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span><slot></slot></span>
    </template>
    
</template>

<script setup lang="ts">

    const props = defineProps<{
        show?: boolean,
        large?: boolean
    }>();

</script>
