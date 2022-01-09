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
        @apply relative inline-block w-full py-2 px-3 duration-200 bg-gray-100 hover:bg-slate-300 rounded text-sm font-medium text-gray-700 my-0.5;
    }

    .router-link-exact-active {
        @apply bg-slate-200 font-semibold hover:shadow-inner hover:bg-slate-300;
    }

</style>