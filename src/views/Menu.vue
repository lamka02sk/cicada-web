<template>

    <div class="static top-0 grid place-items-center p-4">
        <div class="flex justify-between max-w-6xl w-full">
            <div class="grid place-items-center">
                <Logo></Logo>
            </div>
            <nav class="grid place-items-center">
                <ul class="flex text-gray-700 font-medium text-sm">
                    <li class="mx-6">
                        <router-link class="py-2 px-4 hover:bg-slate-200 hover:shadow-inner rounded duration-200" to="/dashboard">Dashboard</router-link>
                    </li>
                    <li class="mx-6">
                        <router-link class="py-2 px-4 hover:bg-slate-200 hover:shadow-inner rounded duration-200" to="/repositories">Repositories</router-link>
                    </li>
                    <li class="mx-6">
                        <router-link class="py-2 px-4 hover:bg-slate-200 hover:shadow-inner rounded duration-200" to="/servers">Servers</router-link>
                    </li>
                    <li class="mx-6">
                        <router-link class="py-2 px-4 hover:bg-slate-200 hover:shadow-inner rounded duration-200" to="/logs">Logs</router-link>
                    </li>
                </ul>
            </nav>
            <div class="flex items-center text-gray-600">
                <router-link class="material-icons-outlined text-4xl mr-1 py-1 px-1.5 rounded-full hover:bg-slate-200 hover:shadow-inner duration-200" to="/my-account" title="My Account">account_circle</router-link>
                <router-link class="material-icons-outlined mx-1 p-1 rounded-full hover:bg-slate-200 hover:shadow-inner duration-200" to="/settings" title="System Settings">settings</router-link>
                <router-link class="material-icons-outlined ml-1 p-1 rounded-full hover:bg-red-200 hover:shadow-inner hover:text-red-700 duration-200" to="/logout" title="Logout">power_settings_new</router-link>
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

    .router-link-active {
        @apply bg-slate-200;
        
        &:hover {
            @apply bg-slate-100;
        }
    }

</style>