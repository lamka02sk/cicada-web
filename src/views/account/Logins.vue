<template>
    
    <Loading show large v-if="loading"></Loading>

    <div v-else-if="logins.length">
    
        <Heading tag="h2">Active logins</Heading>
        <table>
            <tr>
                <th>Browser</th>
                <th>IP Address</th>
                <th>Login Time</th>
                <th class="w-16"></th>
            </tr>
            <template v-for="login in logins" :key="login.uuid">
                <tr v-if="login.active">
                    <td>{{ getBrowserInfo(login.user_agent) }}</td>
                    <td>{{ login.ip_address.split('/')[0] }}</td>
                    <td>{{ formatDateTime(login.created_at) }}</td>
                    <td>
                        <Button class="-my-1" auto color="red" small right @click="disableLogin(login)">Disable</Button>
                    </td>
                </tr>
            </template>
        </table>
        
        <div class="h-6"></div>
    
        <Heading tag="h2">Login history</Heading>
        <table>
            <tr>
                <th>Browser</th>
                <th>IP Address</th>
                <th>Login Time</th>
                <th>Logout Time</th>
            </tr>
            <template v-for="login in logins" :key="login.uuid">
                <tr v-if="!login.active">
                    <td>{{ getBrowserInfo(login.user_agent) }}</td>
                    <td>{{ login.ip_address.split('/')[0] }}</td>
                    <td>{{ formatDateTime(login.created_at) }}</td>
                    <td>{{ formatDateTime(login.updated_at) }}</td>
                </tr>
            </template>
        </table>
    
    </div>
    
    <Empty v-else></Empty>

</template>

<script setup lang="ts">

    // @ts-ignore
    import UAParser from "ua-parser-js";
    
    import {ref} from "vue";
    import {formatDateTime} from '../../datetime';
    
    import AuthLogin from "../../models/auth/AuthLogin";
    import Empty from  '../../components/notifications/Empty.vue';
    import Heading from "../../components/elements/Heading.vue";
    import Button from "../../components/form/Button.vue";
    import Loading from "../../components/form/Loading.vue";
    
    const loading = ref(true);
    const logins = ref<Array<AuthLogin>>([]);
    
    loadLogins();
    
    function loadLogins() {
        AuthLogin.getAll().then(l => logins.value = l ?? logins.value).finally(() => loading.value = false);
    }
    
    function getBrowserInfo(ua: string) {
        const parser = new UAParser(ua);
        const browser = parser.getBrowser();
        const os = parser.getOS();
        return `${browser.name} ${browser.version} (${os.name}${os.version ? ' ' : ''}${os.version || ''})`;
    }
    
    async function disableLogin(login: any) {
        await login.disable();
        loadLogins();
    }

</script>

<style lang="scss" scoped>

    table {
        @apply text-sm my-2 border-b border-gray-200 text-gray-700 w-full;
    }

    td, th {
        @apply py-2 overflow-hidden border-b border-gray-200 relative;
        
        &:hover {
            @apply z-10 overflow-visible;
        }
        
        &.no-pad {
            @apply py-1;
        }
    }
    
    th {
        @apply font-medium border-b-2 text-left;
    }

</style>