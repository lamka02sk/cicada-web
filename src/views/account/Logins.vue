<template>

    <div v-if="logins !== null">
    
        
    
    </div>
    
    <Empty v-else></Empty>

</template>

<script lang="ts">

    import {useStore} from "vuex";
    import {computed} from "vue";
    import AuthLogin from "../../models/auth/AuthLogin";
    import Empty from  '../../components/notifications/Empty.vue';

    export default {
        components: { Empty },
        setup() {
            
            const store = useStore();
    
            store.dispatch('auth/loadLogins', true);
            const logins = computed(() => <Array<AuthLogin>>store.getters["auth/getLogins"]);
    
            return {
                logins
            }
            
        }
    }

</script>