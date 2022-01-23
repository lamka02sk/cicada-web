<template>
    
    <ScreenCenter class="h-full max-w-md w-full mx-auto md:px-12 px-4 py-8">
        
        <Logo large></Logo>
        <h1 class="text-xl text-gray-600 my-4 uppercase text-center">Sign in</h1>
        
        <p class="text-sm text-gray-800 text-center mb-6">Welcome back to Cicada. Please, enter your e-mail address and password to verify your identity</p>
        
        <Form v-if="formData" @submit.prevent="login">
            
            <FormRow>
                <Text label="E-mail" name="email" type="email" placeholder="admin@cicada.cc" v-model="formData" required autocomplete="email" novalidate></Text>
            </FormRow>
            
            <FormRow>
                <Password label="Password" name="password" placeholder="********" v-model="formData" required autocomplete="password" novalidate></Password>
            </FormRow>
            
            <FormRow center>
                <Button type="submit" :disabled="submitDisabled" :status-type="formData._buttonStatus.type" :status-show="formData._buttonStatus.show">
                    <slot>Sign in</slot>
                    <template v-slot:status>
                        {{ formData._buttonStatus.label }}
                    </template>
                </Button>
            </FormRow>
        
        </Form>
    
    </ScreenCenter>
    
</template>

<script setup lang="ts">

    import {ref} from "vue";
    import {useRouter} from "vue-router";
    
    import ScreenCenter from "./../../components/layout/ScreenCenter.vue";
    import Logo from "./../../components/Logo.vue";
    import Form from "../../components/form/Form.vue";
    import FormRow from "../../components/form/FormRow.vue";
    import Text from "../../components/form/Text.vue";
    import Button from "../../components/form/Button.vue";
    import Password from "../../components/form/Password.vue";
    
    import Login from "../../models/auth/Login";
    import {useGeneralStore} from "../../store/general";
    
    const router = useRouter();
    
    (async () => {
        if(!(await useGeneralStore().isServerReady())) {
            await router.push({ name: 'auth_register' });
        }
    })();
    
    const formData = ref(new Login());
    const submitDisabled = ref(false);

    async function login() {
        
        submitDisabled.value = true;
        
        if(await formData.value.authenticate()) {
            await router.push({name: 'dashboard'});
        }
        
        submitDisabled.value = false;
    
    }

</script>