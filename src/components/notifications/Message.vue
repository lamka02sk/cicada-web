<template>

    <div class="message mb-4 p-4 rounded shadow-sm" :class="background">
        <div class="relative pl-8 ">
            <span class="material-icons-outlined absolute top-0.5 left-0" v-if="icon">{{ icon }}</span>
            <p class="text-sm">
                <slot name="description"></slot>
            </p>
        </div>
    </div>
    
</template>

<script lang="ts">

    function getBackgroundColor(type: string) {
        
        const colors: any = {
            info: ['bg-blue-200', 'text-blue-900', 'border-blue-300', 'border'],
            tip: ['bg-purple-200', 'text-purple-900', 'border-purple-300', 'border'],
            warning: ['bg-yellow-200', 'text-yellow-900', 'border-yellow-300', 'border'],
            danger: ['bg-red-200', 'text-red-900', 'border-red-300', 'border'],
            default: ['bg-gray-200', 'text-gray-800', 'border-gray-300', 'border'],
            success: ['bg-green-200', 'text-green-900', 'border-green-300', 'border']
        };
        
        return colors[type] ?? colors.default;
        
    }

    export default {
        props: ['type', 'icon'],
        setup(props: any) {
            return {
                background: getBackgroundColor(props.type),
                icon: props.icon
            }
        }
    }

</script>
