<template>

    <div class="message mb-4 p-4 rounded shadow-sm" :class="background">
        <div class="relative pl-8" v-if="icon">
            <span class="material-icons-outlined absolute top-0.5 left-0" v-if="icon">{{ icon }}</span>
            <p class="text-sm">
                <slot></slot>
            </p>
        </div>
        <div v-else>
            <slot></slot>
        </div>
    </div>
    
</template>

<script setup lang="ts">

    import {computed} from "vue";

    function getBackgroundColor(type: string) {
        
        const colors: any = {
            info: ['bg-blue-200', 'text-blue-900', 'border-blue-300', 'border'],
            tip: ['bg-purple-200', 'text-purple-900', 'border-purple-300', 'border'],
            warning: ['bg-yellow-200', 'text-yellow-900', 'border-yellow-300', 'border'],
            danger: ['bg-red-200', 'text-red-900', 'border-red-300', 'border'],
            default: ['bg-gray-200', 'text-gray-800', 'border-gray-300', 'border'],
            success: ['bg-emerald-200', 'text-emerald-900', 'border-emerald-300', 'border']
        };
        
        return colors[type] ?? colors.default;
        
    }
    
    const props = withDefaults(defineProps<{
        type: string,
        icon: string|null
    }>(), {
        type: 'default',
        icon: null
    });

    const background = computed(() => getBackgroundColor(props.type));

</script>
