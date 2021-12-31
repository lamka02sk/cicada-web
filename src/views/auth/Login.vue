<template>
    test
</template>

<script lang="ts">

    import {useStore} from "vuex";
    import {useRouter} from "vue-router";

    export default {
        setup() {
        
            const store = useStore();
            const router = useRouter();
    
            (async () => {
                if(!(await store.dispatch('system/isReady'))) {
                    return router.push({ name: 'auth_register' });
                }
            })();
            
            return {};
        
        }
    }

</script>