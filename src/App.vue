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
    
</template>

<script lang="ts">

    import Menu from "./views/Menu.vue";
    import Main from "./views/Main.vue";
    import {useStore} from "vuex";
    import {computed} from "vue";
    
    export default {
        components: { Menu, Main },
        setup() {
            
            const store = useStore();
            
            return {
                auth: computed(() => {
                    return store.getters["auth/hasSession"];
                })
            }
            
        }
    }

</script>
