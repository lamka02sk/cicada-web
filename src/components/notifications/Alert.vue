<template>

    <teleport to="#alert">
    
        <Overlay :show="!!alert.show" @click="alert.closeOverlay ? alert.close(alert) : () => {}">
            
            <div @click.stop="() => {}" :class="`bg-white rounded-lg shadow-2xl max-w-sm w-full p-8 text-sm text-gray-800 duration-500 relative ${showClasses} ${border}`">
                
                <span class="material-icons-outlined cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-red-600 duration-150"
                      v-if="alert.showCloseButton" @click="alert.close(alert)">cancel</span>
                
                <h2 :class="`text-xl font-semibold mb-4 pr-4 ${textColor}`">
                    <span class="material-icons-outlined align-middle mr-2" v-if="iconName">{{ iconName }}</span>
                    <span class="align-middle"><slot name="title">{{ alert.title }}</slot></span>
                </h2>
                
                <slot>{{ alert.description }}</slot>
                
                <div class="flex justify-between">
                    <slot name="actions"></slot>
                    <template v-if="showDefaultActions">
                        <Button v-if="alert.cancelText" color="mute" @click="alert.cancel(alert)">{{ alert.cancelText }}</Button>
                        <Button color="gray" @click="alert.confirm(alert)">{{ alert.confirmText }}</Button>
                    </template>
                </div>
                
            </div>
            
        </Overlay>
    
    </teleport>

</template>

<script setup lang="ts">
    
    import Overlay from "../layout/Overlay.vue";
    import {computed, onMounted, ref, useSlots, watchEffect} from "vue";
    
    import Button from "../form/Button.vue";
    import Alert from "../../models/system/Alert";

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
    
    const props = defineProps<{
        alert: Alert
    }>();
    
    onMounted(() => setTimeout(() => props.alert.show = true));
    
    const slots = useSlots();
    const showDefaultActions = computed<boolean>(() => !slots.actions);
    
    const showClasses = computed<string>(() => props.alert.show ? 'scale-100' : 'scale-75');
    const border = computed<string>(() => getBorder(props.alert.type));
    const iconName = computed<string>(() => getIcon(props.alert.type));
    const textColor = computed<string>(() => getText(props.alert.type));

</script>
