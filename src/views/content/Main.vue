<template>

    <div class="max-w-6xl w-full mx-auto my-2 relative">
    
        <div class="px-px text-sm text-slate-500">
            <template v-for="r in routes">
                <router-link :to="r.url" class="hover:underline">{{ r.title }}</router-link> <span class="material-icons-outlined text-xs">chevron_right</span>
            </template>
        </div>
        
        <h1 class="text-3xl text-gray-600 font-medium mb-4 mt-2">{{ route.meta.title }}</h1>
        
        <router-view></router-view>

    </div>
    
</template>

<script lang="ts">

    import {useRoute} from "vue-router";
    import {ref, watchEffect} from "vue";
    
    interface Breadcrumb {
        title: string,
        url: string
    }

    export default {
        setup() {
            
            const route = useRoute();
            const routes = ref<Array<Breadcrumb>>([]);
            
            watchEffect(() => {
    
                const tempRoutes: Array<any> = [];
    
                (route.matched.slice(1, -1) || []).forEach(r => {
                    if(r.meta.title) {
                        tempRoutes.push(<Breadcrumb>{
                            title: r.meta.title,
                            url: r.path
                        });
                    }
                });
    
                routes.value = tempRoutes;
                
            })
            
            return {
                route,
                routes
            }
            
        }
    }

</script>