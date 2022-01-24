<template>

    <ScreenCenter class="h-full max-w-md w-full mx-auto md:px-12 px-4 py-8">
        
        <Logo large></Logo>
        <h1 class="text-xl text-gray-600 my-4 uppercase text-center">Server connection</h1>
        
        <Message type="tip" icon="tips_and_updates">
            To skip this step, you can define a default connection
            in <code>config/connection.json</code>
        </Message>
        
        <p class="text-sm text-gray-800 text-center mb-6">Before using the cicada web UI, server connection needs to be configured on this device</p>
    
        <Form v-if="configuration" @submit.prevent="checkConnection">
            <FormRow>
                <Select label="Protocol" :options="protocolOptions" name="protocol" v-model="configuration" @update:modelValue="changePort"></Select>
            </FormRow>
            <FormRow>
                <Text label="Domain or IP address" placeholder="example.com" name="domain" v-model="configuration" required></Text>
            </FormRow>
            <FormRow>
                <Number label="Port" name="port" v-model="configuration" :min="1" :max="65535" :step="1" required></Number>
            </FormRow>
            <FormRow>
                <Text label="Path" name="path" v-model="configuration" required></Text>
            </FormRow>
            <FormRow center>
                <Button type="submit" :disabled="submitDisabled" :status-type="configuration._buttonStatus.type" :status-show="configuration._buttonStatus.show">
                    <slot>Check connection</slot>
                    <template v-slot:status>
                        {{ configuration._buttonStatus.label }}
                    </template>
                </Button>
            </FormRow>
        </Form>
        
    </ScreenCenter>
    
</template>

<script setup lang="ts">

    import {ref} from 'vue';

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
    import {useRouter} from "vue-router";
    import {useConfigStore} from "../../store/config";
    import Alert from "../../models/system/Alert";
    
    const router = useRouter();
    const configuration = useConfigStore().connection;
    const submitDisabled = ref<boolean>(false);
            
    const protocolOptions = [
        { value: 'http', title: 'http://' },
        { value: 'https', title: 'https://' }
    ];
    
    function changePort(value: Connection|null) {
        if(configuration && value) {
            configuration.port = value.protocol === 'http' ? 80 : 443;
        }
    }
    
    async function checkConnection() {
        
        if(!(await configuration.validate())) {
            Alert.formValidation();
            return;
        }
    
        submitDisabled.value = true;
    
        if(await configuration.test()) {
            configuration.save();
            await router.push({ name: 'auth_login' });
        }
    
        submitDisabled.value = false;
        
    }

</script>
