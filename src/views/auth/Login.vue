<template>
    
    <ScreenCenter class="h-full max-w-md w-full mx-auto md:px-12 px-4 py-8">
        
        <Logo large="1"></Logo>
        <h1 class="text-xl text-gray-600 my-4 uppercase text-center">Sign in</h1>
        
        <p class="text-sm text-gray-800 text-center mb-6">Welcome back to Cicada. Please, enter your e-mail address and password to verify your identity</p>
        
        <Form v-if="formData" @submit="login">
            
            <FormRow>
                <Text label="E-mail" name="email" type="email" placeholder="admin@cicada.cc" v-model="formData" required="1" autocomplete="email" novalidate="1"></Text>
            </FormRow>
            
            <FormRow>
                <Password label="Password" name="password" placeholder="********" v-model="formData" required="1" autocomplete="new-password" novalidate="1"></Password>
            </FormRow>
            
            <FormRow :center="true">
                <Button type="submit" :disabled="submitDisabled" :status-type="status.type" :status-show="status && status.show">
                    <slot>Sign in</slot>
                    <template v-slot:status>
                        {{ status.label }}
                    </template>
                </Button>
            </FormRow>
        
        </Form>
    
    </ScreenCenter>
    
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
    
    import Validator from "../../validator/Validator";
    import Login from "../../models/auth/Login";

    export default {
        components: { ScreenCenter, Logo, Form, FormRow, Text, Button, Password, Alert },
        setup() {
        
            const store = useStore();
            const router = useRouter();
    
            (async () => {
                if(!(await store.dispatch('system/isReady'))) {
                    return router.push({ name: 'auth_register' });
                }
            })();
            
            const formData = ref<Login>(store.getters["auth/getLoginForm"]);
            const submitDisabled = ref<boolean>(false);
            const status = ref<any>({});
            
            return {
                formData,
                submitDisabled,
                status,
                async login() {
    
                    if(!formData.value) {
                        return;
                    }
    
                    submitDisabled.value = true;
                    const validator = new Validator(formData.value);
    
                    if(!(await validator.validate())) {
                        submitDisabled.value = false;
                        return;
                    }
    
                    status.value = {
                        type: 'loading',
                        show: true,
                        label: 'Signing in'
                    };
                    
                    setTimeout(async () => {
    
                        const response = await store.dispatch('auth/signIn');
    
                        if(response?.data?.success) {
        
                            status.value = {
                                type: 'success',
                                show: true,
                                label: 'Success!'
                            };
        
                            await store.dispatch('auth/clearLoginForm');
                            await router.push({name: 'dashboard'});
        
                        } else {
        
                            submitDisabled.value = false;
        
                            status.value = {
                                type: 'error',
                                show: true,
                                label: 'Invalid credentials'
                            };
        
                        }
    
                    }, 500);
                    
                }
            };
        
        }
    }

</script>