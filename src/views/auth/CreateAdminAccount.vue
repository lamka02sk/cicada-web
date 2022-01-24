<template>
    
    <ScreenCenter class="max-w-md w-full mx-auto md:px-12 px-4 py-8">
    
        <Logo large></Logo>
        <h1 class="text-xl text-gray-600 my-4 uppercase text-center">Create admin account</h1>
        
        <p class="text-sm text-gray-800 text-center mb-6">This account will be the main account with full access to all settings and deployment options</p>
        
        <Form v-if="formData" @submit.prevent="createAccount">
            
            <FormRow>
                <Text label="E-mail" name="email" type="email" placeholder="admin@cicada.cc" v-model="formData" required autocomplete="email"></Text>
            </FormRow>
    
            <FormRow>
                <Text label="First name" name="firstname" placeholder="John" v-model="formData" required autocomplete="given-name"></Text>
                <Text label="Last name" name="lastname" placeholder="Doe" v-model="formData" required autocomplete="family-name"></Text>
            </FormRow>
    
            <FormRow>
                <Password label="Password" name="password" placeholder="********" v-model="formData" required autocomplete="new-password"></Password>
            </FormRow>
    
            <FormRow>
                <Password label="Repeat password" name="password_repeat" placeholder="********" v-model="formData" autocomplete="new-password"></Password>
            </FormRow>
            
            <FormRow :center="true">
                <Button type="submit" :disabled="submitDisabled" :status-show="formData._buttonStatus.show" :status-type="formData._buttonStatus.type">
                    <slot>Create account</slot>
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
    import Account from "../../models/auth/Account";
    import {useGeneralStore} from "../../store/general";
    import Alert from "../../models/system/Alert";
    
    const router = useRouter();
    
    (async () => {
        if(await useGeneralStore().isServerReady()) {
            await router.push({ name: 'auth_login' });
        }
    })();
    
    const formData = ref(new Account());
    const submitDisabled = ref<boolean>(false);
    
    async function createAccount() {

        if(!(await formData.value.validate())) {
            Alert.formValidation();
            return;
        }
    
        submitDisabled.value = true;
        
        if(await formData.value.create()) {
            await router.push({name: 'auth_login'});
        }
    
        submitDisabled.value = false;
        
    }

</script>