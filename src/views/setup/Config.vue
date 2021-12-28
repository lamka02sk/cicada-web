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
    
    <Alert :show="true" type="warning">
        <template v-slot:title>Alert</template>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur consectetur deserunt dicta
            eaque eius est eveniet fuga illo impedit iste libero maiores modi, praesentium provident quae ratione soluta voluptatibus?
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
            
            const submitDisabled = ref<boolean>(false);
            const status = ref<any>({
                type: 'error',
                show: true,
                label: 'Connecting'
            });
            
            return {
                status,
                submitDisabled,
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
                    
                    const validator = new Validator();
                    
                    if(!(await validator.validate(configuration.value))) {
                        console.log(validator.messages);
                        alert('invalid');
                        return;
                    }
                    
                    return;
                    
                    status.value.show = true;
                    submitDisabled.value = true;

                    const a = (await configuration.value.test())
                        ? true
                        : null;

                    // status.value.show = false;
                    submitDisabled.value = false;
                    
                }
            }
        }
    }

</script>

<style scoped>

</style>