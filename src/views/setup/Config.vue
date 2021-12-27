<template>

    <ScreenCenter class="h-full max-w-md w-full mx-auto px-4 py-8">
        
        <div class="md:px-8 flex flex-col items-center">
            
            <Logo large="1"></Logo>
            <h1 class="text-xl text-gray-600 my-4 uppercase">Server connection</h1>
            
            <Message type="tip" icon="tips_and_updates">
                <template v-slot:description>
                    To skip this step, you can define a default connection
                    in <code>config/connection.json</code>
                </template>
            </Message>
            
            <p class="text-sm text-gray-800 text-center mb-4">Before using the cicada web UI, server connection needs to be configured on this device</p>
        
            <Form v-if="configuration">
                <FormRow>
                    <Select label="Protocol" :options="protocolOptions" v-model="configuration.protocol" @update:modelValue="changePort"></Select>
                </FormRow>
                <FormRow>
                    <Text label="Domain or IP address" placeholder="example.com" v-model="configuration.domain"></Text>
                </FormRow>
                <FormRow>
                    <Number label="Port" v-model="configuration.port" :min="1" :max="65535" :step="1"></Number>
                </FormRow>
                <FormRow>
                    <Text label="Path" v-model="configuration.path"></Text>
                </FormRow>
                <FormRow :center="true">
                    <Button type="submit" @click="checkConnection">
                        <slot>Save configuration</slot>
                        <template v-slot:addon>
                            <Loading size="xs" :show="showLoading">Connecting...</Loading>
                        </template>
                    </Button>
                </FormRow>
            </Form>
            
        </div>
        
    </ScreenCenter>
    
</template>

<script lang="ts">

    import {ref, watchEffect} from 'vue';
    import {useStore} from 'vuex';

    import Logo from "./../../components/Logo.vue";
    import Message from "./../../components/notifications/Message.vue";
    import ScreenCenter from "./../../components/layout/ScreenCenter.vue";
    import Loading from "./../../components/form/Loading.vue";
    import Form from "./../../components/form/Form.vue";
    import FormRow from "./../../components/form/FormRow.vue";
    import Select from "./../../components/form/Select.vue";
    import Text from "./../../components/form/Text.vue";
    import Number from "./../../components/form/Number.vue";
    import Button from "./../../components/form/Button.vue";
    import Connection from "../../models/config/Connection";

    export default {
        components: { Logo, Message, ScreenCenter, Form, FormRow, Select, Text, Number, Button, Loading },
        setup() {
            
            const store = useStore();
            const configuration = ref<Connection|null>(null);
            const showLoading = ref<boolean>(false);
            
            watchEffect(async () => {
                configuration.value = <Connection>await store.dispatch('config/getConnectionConfig');
            });
            
            return {
                showLoading,
                protocolOptions: [
                    { value: 'http', title: 'http://' },
                    { value: 'https', title: 'https://' }
                ],
                configuration,
                changePort(value: string) {
                    if(configuration.value) {
                        configuration.value.port = value === 'http' ? 80 : 443;
                    }
                },
                async checkConnection() {
                    
                    if(!configuration.value) {
                        return;
                    }
                    
                    showLoading.value = true;
    
                    const a = (await configuration.value.test())
                        ? true
                        : null;
                    
                    showLoading.value = false;
                    
                }
            }
        }
    }

</script>

<style scoped>

</style>