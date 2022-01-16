<template>

    <div class="static top-0 grid place-items-center p-4">
        <div class="flex justify-between max-w-6xl w-full">
            <div class="grid place-items-center">
                <Logo></Logo>
            </div>
            <nav class="grid place-items-center">
                <ul class="flex text-gray-700 font-medium text-sm">
                    <li class="mx-6">
                        <router-link class="router-link" to="/dashboard">Dashboard</router-link>
                    </li>
                    <li class="mx-6">
                        <router-link class="router-link" to="/repositories">Repositories</router-link>
                    </li>
                    <li class="mx-6">
                        <router-link class="router-link" to="/servers">Servers</router-link>
                    </li>
                    <li class="mx-6">
                        <router-link class="router-link" to="/logs">Logs</router-link>
                    </li>
                </ul>
            </nav>
            <div class="flex items-center text-gray-600">
                <router-link class="router-link material-icons-outlined" to="/my-account" title="My Account">account_circle</router-link>
                <router-link class="router-link material-icons-outlined" to="/settings" title="System Settings">settings</router-link>
                <router-link class="router-link material-icons-outlined" to="/logout" title="Logout">power_settings_new</router-link>
            </div>
        </div>
    </div>

</template>

<script lang="ts">

    import Logo from "../components/Logo.vue";

    export default {
        components: { Logo }
    }

</script>

<style lang="scss" scoped>

    .router-link {
        @apply relative inline-block w-full py-2 px-3 duration-200 rounded text-sm font-medium text-gray-700 my-0.5;
    
        &:before {
            content: '';
            @apply absolute bottom-0 left-1/2 -translate-x-1/2 h-[5px] w-0 bg-indigo-500 rounded duration-200 opacity-0;
        }
        
        &.material-icons-outlined {
            @apply text-2xl py-1 px-2 ml-1;
        }
        
        &:hover:before {
            @apply opacity-50 w-5;
        }
    }

    .router-link-active {
        @apply pt-1 pb-3 hover:shadow-inner hover:bg-slate-100;
    
        &:before {
            @apply w-5 opacity-100;
        }
    
        &.material-icons-outlined {
            @apply pt-0 pb-2;
        }
    
        &:hover:before {
            @apply opacity-100;
        }
    }

</style>