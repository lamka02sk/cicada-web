<template>

    <ScreenCenter class="h-full max-w-md w-full mx-auto">
        
        <Logo large="1"></Logo>
        <h1 class="text-xl text-gray-600 my-4 uppercase">Server connection</h1>
        
        <Message type="tip" icon="tips_and_updates">
            <template v-slot:description>
                To avoid manual server connection configuration on each device, you can define a default server connection
                in <code>config/connection.json</code>
            </template>
        </Message>
        
        <p class="text-sm text-gray-800 text-center mb-4">Before using the cicada web UI, server connection needs to be configured on this device</p>
    
        <Form v-if="configuration">
            <FormRow>
                <Select class="w-full" label="Protocol" :options="protocolOptions" v-model="configuration.protocol" @update:modelValue="changePort"></Select>
                <Text class="w-full" label="Domain or IP address" v-model="configuration.domain"></Text>
            </FormRow>
            <FormRow>
                <Number class="w-full" label="Port" v-model="configuration.port" :min="1" :max="65535" :step="1"></Number>
                <Text class="w-full" label="Path" v-model="configuration.path"></Text>
            </FormRow>
            <FormRow class="justify-center">
                <Button type="submit">Save configuration</Button>
            </FormRow>
        </Form>
        
    </ScreenCenter>
    
</template>

<script lang="ts">

    import {ref, watchEffect} from 'vue';
    import {useStore} from 'vuex';

    import Logo from "./../../components/Logo.vue";
    import Message from "./../../components/notifications/Message.vue";
    import ScreenCenter from "./../../components/layout/ScreenCenter.vue";
    import Form from "./../../components/form/Form.vue";
    import FormRow from "./../../components/form/FormRow.vue";
    import Select from "./../../components/form/Select.vue";
    import Text from "./../../components/form/Text.vue";
    import Number from "./../../components/form/Number.vue";
    import Button from "./../../components/form/Button.vue";
    import Connection from "../../models/config/Connection";

    export default {
        components: { Logo, Message, ScreenCenter, Form, FormRow, Select, Text, Number, Button },
        setup() {
            
            const store = useStore();
            const configuration = ref<Connection|null>(null);
            
            watchEffect(async () => {
                configuration.value = <Connection>await store.dispatch('config/getConnectionConfig');
            });
            
            return {
                protocolOptions: [
                    { value: 'http', title: 'http://' },
                    { value: 'https', title: 'https://' }
                ],
                configuration,
                changePort(value: string) {
                    if(configuration.value) {
                        configuration.value.port = value === 'http' ? 80 : 443;
                    }
                }
            }
        }
    }

</script>

<style scoped>

</style>