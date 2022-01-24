<template>

    <Alert v-if="data" v-bind="{ alert: data }"></Alert>

</template>

<script setup lang="ts">

    import {useGeneralStore} from "../../store/general";
    import Alert from "../../components/notifications/Alert.vue";
    import {default as AlertClass} from "../../models/system/Alert";
    import {computed} from "vue";

    const general = useGeneralStore();
    const alerts = computed(() => [...general.alerts]);
    
    // @ts-ignore
    const data = computed<AlertClass>(() => {
        
        if(alerts.value.length) {
            return alerts.value.pop();
        }
    
        return null;
        
    });

</script>