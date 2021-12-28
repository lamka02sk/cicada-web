<template>

    <teleport to="#alert">
    
        <Overlay :show="show" @click="show = false">
            <div @click.stop="() => {}" :class="`bg-white rounded-lg shadow-2xl max-w-sm w-full p-8 text-sm text-gray-800 duration-500 relative ${showClasses} ${border}`">
                <span class="material-icons-outlined cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-red-600 duration-150">cancel</span>
                <h2 class="text-xl font-semibold mb-4 pr-4"><slot name="title"></slot></h2>
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

    export default {
        components: { Overlay },
        props: ['show', 'type'],
        setup(props: any) {
        
            const showClasses = ref<string>('');
            const border = ref<string>('');
            
            watchEffect(() => {
                
                showClasses.value = (props.show ?? false)
                    ? 'scale-100'
                    : 'scale-75';
                
                border.value = getBorder(props.type ?? 'default');
                
            })
            
            return {
                showClasses,
                border
            }
        
        }
    }

</script>

<style lang="scss" scoped>



</style>