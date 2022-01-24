<template>
    
    <Loading show large v-if="loading"></Loading>
    
    <div v-else-if="security">
    
        <Heading tag="h2" class="mb-4">Login management</Heading>
    
        <Form @submit.prevent="saveFormData">
            
            <FormRow>
                <Number label="Automatic logout (days)" v-model="security" name="login_duration" :min="1" :max="365"></Number>
            </FormRow>
            
            <FormRow>
                <Checkbox label="2-Factor Authentication" v-model="security" name="two_factor"></Checkbox>
            </FormRow>
            
            <FormRow>
                <Button type="submit" auto :status-show="security._buttonStatus.show" :status-type="security._buttonStatus.type">
                    Save changes
                    <template v-slot:status>{{ security._buttonStatus.label }}</template>
                </Button>
            </FormRow>
            
        </Form>
        
        <Message type="danger">
            <h3 class="font-medium mb-2">Reset secure token</h3>
            <p class="text-sm">
                Each user has a unique securely generated token used for various Cicada actions. If you think your token was compromised, you can generate a new one by pressing the button below.
                Keep in mind, that this action will log you out across all of your devices.
            </p>
            <Button class="mt-4" auto color="red" @click="resetTokenConfirm">Generate a new secure token</Button>
        </Message>
    
    </div>
    
    <Empty v-else></Empty>

</template>

<script setup lang="ts">

    import {ref} from "vue";
    import {useRouter} from "vue-router";
    import axios from "axios";
    
    import Empty from '../../components/notifications/Empty.vue';
    import Form from "../../components/form/Form.vue";
    import Button from "../../components/form/Button.vue";
    import FormRow from "../../components/form/FormRow.vue";
    import Number from "../../components/form/Number.vue";
    import Checkbox from "../../components/form/Checkbox.vue";
    import UserSecurity from "../../models/user/UserSecurity";
    import Message from "../../components/notifications/Message.vue";
    import Alert from "../../components/notifications/Alert.vue";
    import Heading from "../../components/elements/Heading.vue";
    import {useAuthStore} from "../../store/auth";
    import Loading from "../../components/form/Loading.vue";
            
    const showResetTokenConfirmation = ref<boolean>(false);
    const router = useRouter();
    const auth = useAuthStore();
    
    const loading = ref(true);
    const security = ref(new UserSecurity());
    
    UserSecurity.getSecurity().then(s => security.value = s ?? security.value).finally(() => loading.value = false);
    
    function saveFormData() {
        security.value.update();
    }
    
    function resetTokenConfirm() {
        showResetTokenConfirmation.value = true;
    }
    
    async function resetToken() {
        
        showResetTokenConfirmation.value = false;
        
        try {
            await axios.get(`/user/token/refresh`);
            await auth.logout();
            await router.push({ name: 'auth_login' });
        } catch(_) {}
        
    }

</script>