<template>

    <teleport to="#alert">
    
        <Overlay :show="show" @click="$emit('update:show', false)">
            <div @click.stop="() => {}" :class="`bg-white rounded-lg shadow-2xl max-w-sm w-full p-8 text-sm text-gray-800 duration-500 relative ${showClasses} ${border}`">
                <span class="material-icons-outlined cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-red-600 duration-150" @click="$emit('update:show', false)">cancel</span>
                <h2 :class="`text-xl font-semibold mb-4 pr-4 ${textColor}`">
                    <span class="material-icons-outlined align-middle mr-2" v-if="iconName">{{ iconName }}</span>
                    <span class="align-middle"><slot name="title"></slot></span>
                </h2>
                <slot></slot>
                <div class="mt-4 flex justify-between">
                    <slot name="actions"></slot>
                </div>
            </div>
        </Overlay>
    
    </teleport>

</template>

<script lang="ts">
    
    import Overlay from "../layout/Overlay.vue";
    import {ref, watchEffect} from "vue";

    function getBorder(type: string) {
    
        const colors: any = {
            default: 'border-t border-slate-100',
            danger: 'border-t-4 border-red-400',
            warning: 'border-t-4 border-yellow-400',
            info: 'border-t-4 border-blue-400',
            tip: 'border-t-4 border-purple-400',
            success: 'border-t-4 border-emerald-400',
        };
    
        return colors[type];
    
    }

    function getIcon(type: string) {
    
        const colors: any = {
            default: '',
            danger: 'error',
            warning: 'warning',
            info: 'info',
            tip: 'tips_and_updates',
            success: 'done',
        };
    
        return colors[type];
    
    }

    function getText(type: string) {
    
        const colors: any = {
            default: 'text-gray-600',
            danger: 'text-red-600',
            warning: 'text-yellow-600',
            info: 'text-blue-600',
            tip: 'text-purple-600',
            success: 'text-emerald-600',
        };
    
        return colors[type];
    
    }

    export default {
        emits: ['update:show'],
        components: { Overlay },
        props: ['show', 'type', 'icon'],
        setup(props: any) {
        
            const showClasses = ref<string>('');
            const border = ref<string>('');
            const iconName = ref<string>('');
            const textColor = ref<string>('');
            
            watchEffect(() => {
                
                showClasses.value = (props.show ?? false)
                    ? 'scale-100'
                    : 'scale-75';
                
                border.value = getBorder(props.type ?? 'default');
                iconName.value = getIcon(props.type ?? 'default');
                textColor.value = getText(props.type ?? 'default');
                
            })
            
            return {
                showClasses,
                border,
                iconName,
                textColor
            }
        
        }
    }

</script>

<style lang="scss" scoped>



</style>