<template>
    
    <div :class="`${textColor} text-sm font-medium inline-flex items-center overflow-hidden relative duration-500 ${classes}`" :style="{ width }">
        <div class="absolute inline-flex items-center pl-4 whitespace-nowrap" ref="content">
            <Loading v-if="type === 'loading'" :show="show"><slot></slot></Loading>
            <template v-else-if="type === 'success'">
                <div class="material-icons-outlined pr-1">done</div>
                <slot></slot>
            </template>
            <template v-else-if="type === 'error'">
                <div class="material-icons-outlined pr-1">error</div>
                <slot></slot>
            </template>
            <template v-else-if="type === 'info'">
                <div class="material-icons-outlined pr-1">info</div>
                <slot></slot>
            </template>
        </div>
    </div>

</template>

<script setup lang="ts">

    import Loading from "./../../components/form/Loading.vue";
    import {ref, watch, watchEffect} from "vue";
    
    function getTextColor(type: string) : string {
        
        const colors = {
            loading: 'text-gray-700',
            success: 'text-emerald-600',
            error: 'text-red-600',
            info: 'text-blue-700'
        };
        
        return colors[type] ?? colors['loading'];
        
    }
    
    const props = defineProps<{
        type: string,
        show: boolean
    }>();

    const content = ref<HTMLElement|null>(null);
    const classes = ref<string>('');
    const textColor = ref<string|null>(null);

    const width = ref<string>('0');
    const maxWidth = ref<number>(0);

    watchEffect(() => {
    
        if(content.value) {
            setTimeout(() => {
                if(!content.value) return;
                maxWidth.value = content.value.getBoundingClientRect().width;
            })
        }
    
        textColor.value = getTextColor(props.type);
        classes.value = props.show ? 'opacity-100 visible' : 'opacity-0 invisible';
    
    });

    watch(maxWidth, () => {
        width.value = props.show ? `${maxWidth.value}px` : '0';
    });

</script>
