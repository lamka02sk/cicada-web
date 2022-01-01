<template>
    
    <ScreenCenter class="h-full max-w-md w-full mx-auto md:px-12 px-4 py-8">
    
        <Logo large="1"></Logo>
        <h1 class="text-xl text-gray-600 my-4 uppercase text-center">Create admin account</h1>
        
        <p class="text-sm text-gray-800 text-center mb-6">This account will be the main account with full access to all settings and deployment options</p>
        
        <Form v-if="formData" @submit="createAccount">
            
            <FormRow>
                <Text label="E-mail" name="email" type="email" placeholder="admin@cicada.cc" v-model="formData" required="1" autocomplete="email"></Text>
            </FormRow>
    
            <FormRow>
                <Text label="First name" name="firstname" placeholder="John" v-model="formData" required="1" autocomplete="given-name"></Text>
                <Text label="Last name" name="lastname" placeholder="Doe" v-model="formData" required="1" autocomplete="family-name"></Text>
            </FormRow>
    
            <FormRow>
                <Password label="Password" name="password" placeholder="********" v-model="formData" required="1" autocomplete="new-password"></Password>
            </FormRow>
    
            <FormRow>
                <Password label="Repeat password" name="password_repeat" placeholder="********" v-model="formData" autocomplete="new-password"></Password>
            </FormRow>
            
            <FormRow :center="true">
                <Button type="submit" :disabled="submitDisabled" :status-show="status && status.show" :status-type="status.type">
                    <slot>Create account</slot>
                    <template v-slot:status>
                        {{ status.label }}
                    </template>
                </Button>
            </FormRow>
            
        </Form>
    
    </ScreenCenter>
    
    <Alert v-model:show="showAlert" type="danger" :close-button="false">
        <template v-slot:title>Invalid data</template>
        Please check if all fields in the form are properly filled
    </Alert>
    
</template>

<script lang="ts">

    import {ref} from "vue";
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";

    import ScreenCenter from "./../../components/layout/ScreenCenter.vue";
    import Logo from "./../../components/Logo.vue";
    import Form from "../../components/form/Form.vue";
    import FormRow from "../../components/form/FormRow.vue";
    import Text from "../../components/form/Text.vue";
    import Button from "../../components/form/Button.vue";
    import Password from "../../components/form/Password.vue";
    import Alert from "../../components/notifications/Alert.vue";
    
    import Account from "../../models/auth/Account";
    import Validator from "../../validator/Validator";
    
    export default {
        components: { ScreenCenter, Logo, Form, FormRow, Text, Button, Password, Alert },
        setup() {
            
            const store = useStore();
            const router = useRouter();
            
            (async () => {
                if(await store.dispatch('system/isReady')) {
                    return router.push({ name: 'auth_login' });
                }
            })();
            
            const formData = ref<Account>(store.getters["auth/getRegisterForm"]);
            const showAlert = ref<boolean>(false);
            const submitDisabled = ref<boolean>(false);
            const status = ref<any>({});
            
            return {
                formData,
                showAlert,
                submitDisabled,
                status,
                async createAccount() {
    
                    if(!formData.value) {
                        return;
                    }
    
                    submitDisabled.value = true;
                    const validator = new Validator(formData.value);
    
                    if(!(await validator.validate())) {
                        showAlert.value = true;
                        submitDisabled.value = false;
                        return;
                    }
    
                    status.value = {
                        type: 'loading',
                        show: true,
                        label: 'Creating account'
                    };
                    
                    setTimeout(async () => {
    
                        const response = await store.dispatch('auth/createAccount');
    
                        if(response?.data?.success) {
        
                            status.value = {
                                type: 'success',
                                show: true,
                                label: 'Account was created'
                            };
        
                            await router.push({name: 'auth_login'});
        
                        } else {
        
                            submitDisabled.value = false;
        
                            status.value = {
                                type: 'error',
                                show: true,
                                label: 'Failed to create account'
                            };
        
                        }
    
                    }, 500);
                    
                }
            };
            
        }
    }

</script>