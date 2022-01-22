<template>

    <div v-if="security">
    
        <Heading tag="h2" class="mb-4">Login management</Heading>
    
        <Form @submit="saveFormData">
            
            <FormRow>
                <Number label="Automatic logout (days)" v-model="security" name="login_duration" min="1" max="365"></Number>
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
    
    <Alert type="danger" v-model:show="showResetTokenConfirmation">
        <template v-slot:title>Reset secure token</template>
        Do you really wish to proceed with resetting your secure token?
        <template v-slot:actions>
            <Button color="mute" @click="showResetTokenConfirmation = false">Don't do anything</Button>
            <Button color="red" @click="resetToken">Proceed</Button>
        </template>
    </Alert>

</template>

<script setup lang="ts">

    import {computed, ref} from "vue";
    import {useStore} from "vuex";
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
            
    const showResetTokenConfirmation = ref<boolean>(false);
    const store = useStore();
    const router = useRouter();

    store.dispatch('user/loadSecurity', true);
    const security = computed(() => <UserSecurity>store.getters['user/getSecurity']);
    
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
            await store.dispatch('auth/logout');
            await router.push({ name: 'auth_login' });
        } catch(_) {}
        
    }

</script>