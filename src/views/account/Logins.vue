<template>

    <div v-if="logins !== null">
    
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
                        <Button class="-my-1" auto="1" color="red" small="1" right="1" @click="disableLogin(login)">Disable</Button>
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

<script lang="ts">

    // @ts-ignore
    import UAParser from "ua-parser-js";
    
    import {useStore} from "vuex";
    import {computed} from "vue";
    import {formatDateTime} from '../../datetime';
    
    import AuthLogin from "../../models/auth/AuthLogin";
    import Empty from  '../../components/notifications/Empty.vue';
    import Heading from "../../components/elements/Heading.vue";
    import Button from "../../components/form/Button.vue";

    export default {
        components: { Empty, Heading, Button },
        setup() {
            
            const store = useStore();
    
            store.dispatch('user/loadLogins', true);
            const logins = computed(() => <Array<AuthLogin>>store.getters["user/getLogins"]);
    
            return {
                logins,
                getBrowserInfo(ua: string) {
                    const parser = new UAParser(ua);
                    const browser = parser.getBrowser();
                    const os = parser.getOS();
                    return `${browser.name} ${browser.version} (${os.name}${os.version ? ' ' : ''}${os.version || ''})`;
                },
                formatDateTime,
                async disableLogin(login: AuthLogin) {
                    
                    const authLogin: AuthLogin = new AuthLogin();
                    authLogin.fromJSON(login);
                    await authLogin.disable();
                    
                    store.dispatch('user/loadLogins', true);
                    
                }
            }
            
        }
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