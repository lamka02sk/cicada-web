<template>
    
    <ScreenCenter class="h-full max-w-md w-full mx-auto px-4 py-8">
        
    
    
    </ScreenCenter>
    
</template>

<script lang="ts">

    import {useStore} from "vuex";
    import {useRouter} from "vue-router";

    import ScreenCenter from "./../../components/layout/ScreenCenter.vue";
    
    export default {
        components: { ScreenCenter },
        setup() {
            
            const store = useStore();
            const router = useRouter();
            
            (async () => {
                if(await store.dispatch('system/isReady')) {
                    return router.push({ name: 'auth_login' });
                }
            })();
            
            return {};
            
        }
    }

</script>