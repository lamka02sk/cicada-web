<template>
    
    <div class="flex">
        
        <aside v-if="siblings.length" class="w-64 mr-10 shrink-0">
            <ul>
                <li v-for="sibling in siblings">
                    <router-link :to="{ name: sibling.name }" class="router-link">{{ sibling.meta.title }}</router-link>
                </li>
            </ul>
        </aside>
        
        <div class="w-full">
            <router-view></router-view>
        </div>
        
    </div>

</template>

<script lang="ts">

import {RouteRecordRaw, useRoute} from "vue-router";
import {ref, watchEffect} from "vue";

export default {
    setup() {
        
        const route = useRoute();
        const basePath = ref('/');
        const siblings = ref<Array<RouteRecordRaw>>([]);
        
        watchEffect(() => {
            
            basePath.value = '/';
            const matched = route.matched.slice(0, -1);
            
            matched.forEach(m => {
                basePath.value += m.path + '/';
            });
            
            basePath.value = basePath.value.replaceAll(/\/+/g, '/');
            siblings.value = (route.matched[route.matched.length - 2] || { children: [] }).children;
            
        });
        
        return {
            route,
            basePath,
            siblings
        }
    }
}

</script>

<style lang="scss" scoped>

    .router-link {
        @apply relative inline-block w-full py-2 px-3 duration-200 bg-gray-100 rounded text-sm font-medium text-gray-700 my-0.5 hover:shadow-inner;
    
        &:before {
            content: '';
            @apply absolute top-1/2 -translate-y-1/2 -left-[2px] h-0 w-[5px] bg-indigo-500 rounded duration-200 opacity-0;
        }
    
        &:hover:before {
            @apply opacity-50 h-5;
        }
    }

    .router-link-exact-active {
        @apply pl-4 hover:bg-slate-200;
        
        &:before {
            @apply h-5 opacity-100;
        }
    
        &:hover:before {
            @apply opacity-100;
        }
    }

</style>