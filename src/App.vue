<template>
    
    <Menu v-if="auth"></Menu>
    <Main></Main>
    
    <footer class="absolute mt-6 bottom-2 left-4 text-gray-300 hover:text-gray-400 duration-200 group text-sm flex right-4 justify-between">
        <div>
            Made with <span class="material-icons-outlined align-middle text-base">favorite_border</span> by
            <a class="text-slate-300 group-hover:hover:text-slate-500 group-hover:text-slate-400 duration-200"
               href="https://github.com/lamka02sk/" target="_blank" rel="noopener">lamka02sk</a> using
            <a class="text-slate-300 group-hover:hover:text-slate-500 group-hover:text-slate-400 duration-200"
               href="https://www.rust-lang.org/" target="_blank" rel="noopener">Rust</a> and
            <a class="text-slate-300 group-hover:hover:text-slate-500 group-hover:text-slate-400 duration-200"
               href="https://vuejs.org/" target="_blank" rel="noopener">Vue.js</a>.
        </div>
        <div>Github:
            <a class="text-slate-300 group-hover:hover:text-slate-500 group-hover:text-slate-400 duration-200"
               href="https://github.com/lamka02sk/cicada" target="_blank" rel="noopener">Server</a> +
            <a class="text-slate-300 group-hover:hover:text-slate-500 group-hover:text-slate-400 duration-200"
               href="https://github.com/lamka02sk/cicada-web" target="_blank" rel="noopener">Web UI</a>
        </div>
    </footer>
    
    <Alerts></Alerts>
    
</template>

<script setup lang="ts">

    import Menu from "./views/Menu.vue";
    import Main from "./views/Main.vue";
    import {useAuthStore} from "./store/auth";
    import {computed} from "vue";
    import Alerts from "./views/content/Alerts.vue";
    
    const store = useAuthStore();
    const auth = computed(() => store.authenticated);

</script>
