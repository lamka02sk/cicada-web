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
                    <Select label="Protocol" :options="protocolOptions" name="protocol" v-model="configuration" @update:modelValue="changePort"></Select>
                </FormRow>
                <FormRow>
                    <Text label="Domain or IP address" placeholder="example.com" name="domain" v-model="configuration"></Text>
                </FormRow>
                <FormRow>
                    <Number label="Port" name="port" v-model="configuration" :min="1" :max="65535" :step="1"></Number>
                </FormRow>
                <FormRow>
                    <Text label="Path" name="path" v-model="configuration"></Text>
                </FormRow>
                <FormRow :center="true">
                    <Button type="submit" @click="checkConnection" :disabled="submitDisabled" :status-type="status.type" :status-show="status.show">
                        <slot>Save configuration</slot>
                        <template v-slot:status>
                            {{ status.label }}
                        </template>
                    </Button>
                </FormRow>
            </Form>
            
        </div>
        
    </ScreenCenter>
    
    <Alert v-model:show="showAlert" type="danger" :close-button="false">
        <template v-slot:title>Invalid data</template>
        Please check if all fields in the form are properly filled
    </Alert>
    
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
    import Alert from "../../components/notifications/Alert.vue";
    import Validator from "../../validator/Validator";

    export default {
        components: { Logo, Message, ScreenCenter, Form, FormRow, Select, Text, Number, Button, Alert },
        setup() {
            
            const store = useStore();
            const configuration = ref<Connection|null>(null);
            
            watchEffect(async () => {
                configuration.value = <Connection>await store.dispatch('config/getConnectionConfig');
            });
            
            const showAlert = ref<boolean>(false);
            const submitDisabled = ref<boolean>(false);
            const status = ref<any>({
                type: 'loading',
                show: false,
                label: 'Connecting'
            });
            
            return {
                showAlert,
                status,
                submitDisabled,
                protocolOptions: [
                    { value: 'http', title: 'http://' },
                    { value: 'https', title: 'https://' }
                ],
                configuration,
                changePort(value: Connection|null) {
                    if(configuration.value && value) {
                        configuration.value.port = value.protocol === 'http' ? 80 : 443;
                    }
                },
                async checkConnection() {
                    
                    if(!configuration.value) {
                        return;
                    }
                    
                    submitDisabled.value = true;
                    const validator = new Validator(configuration.value);

                    if(!(await validator.validate())) {
                        showAlert.value = true;
                        submitDisabled.value = false;
                        return;
                    }
                    
                    status.value.show = true;
                    // const a = (await configuration.value.test())
                    //     ? true
                    //     : null;

                    status.value.show = false;
                    submitDisabled.value = false;
                    
                }
            }
        }
    }

</script>

<style scoped>

</style>