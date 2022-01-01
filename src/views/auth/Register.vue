<template>
    
    <ScreenCenter class="h-full max-w-md w-full mx-auto md:px-12 px-4 py-8">
    
        <Logo large="1"></Logo>
        <h1 class="text-xl text-gray-600 my-4 uppercase text-center">Create admin account</h1>
        
        <p class="text-sm text-gray-800 text-center mb-4">This account will be the main account with full access to all settings and deployment options</p>
        
        <Form v-if="formData">
            
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
                <Button type="submit">
                    <slot>Create account</slot>
                    <template v-slot:status>
                    
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
    
    import Register from "../../models/auth/Register";
    
    export default {
        components: { ScreenCenter, Logo, Form, FormRow, Text, Button, Password },
        setup() {
            
            const store = useStore();
            const router = useRouter();
            
            (async () => {
                if(await store.dispatch('system/isReady')) {
                    return router.push({ name: 'auth_login' });
                }
            })();
            
            const formData = ref<Register>(store.getters["auth/getRegisterForm"]);
            
            return {
                formData
            };
            
        }
    }

</script>