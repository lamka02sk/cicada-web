<template>
    
    <Loading show large v-if="loading"></Loading>

    <div v-else-if="formData.isLoaded()">
    
        <Form @submit.prevent="saveFormData">
            
            <Heading tag="h2">Hi, <strong>{{ formData.firstname }} {{ formData.lastname }}</strong>, this page is all about you</Heading>
            
            <FormRow>
                <div class="text-gray-700">
                    <p class="my-2"><strong class="font-medium">UUID:</strong> {{ formData.uuid }}</p>
                    <p class="my-2">
                        <strong class="font-medium">E-mail:</strong> {{ formData.email }}<br>
                        <em class="text-xs" v-if="!formData.admin">Contact administrator, if you need to change your e-mail address</em>
                        <em class="text-xs" v-else>You can change your e-mail address in the <router-link class="text-sky-700 font-semibold hover:underline" to="/settings">System settings</router-link></em>
                    </p>
                    <p class="my-2"><strong class="font-medium">Admin:</strong> {{ formData.admin ? 'yes, you are the boss!' : 'no, sorry, you are just a pleb' }}</p>
                </div>
            </FormRow>
            
            <FormRow>
                <Text label="First name" v-model="formData" placeholder="John" required name="firstname"></Text>
                <Text label="Last name" v-model="formData" placeholder="Doe" required name="lastname"></Text>
            </FormRow>
            
            <FormRow>
                <Button auto type="submit" :status-show="formData._buttonStatus.show" :status-type="formData._buttonStatus.type">
                    Save changes
                    <template v-slot:status>{{ formData._buttonStatus.label }}</template>
                </Button>
            </FormRow>
            
        </Form>

        <Form @submit.prevent="changePassword">
            
            <Heading tag="h2" class="mt-4">Change password</Heading>
    
            <Text label="E-mail" :model-value="formData" name="email" v-show="false" autocomplete="email" type="email"></Text>
            
            <FormRow>
                <Password label="Old password" required autocomplete="password" v-model="passwordFormData" name="old_password"></Password>
            </FormRow>
            
            <FormRow>
                <Password label="New password" required autocomplete="new-password" v-model="passwordFormData" name="password"></Password>
                <Password label="Repeat new password" required autocomplete="new-password" v-model="passwordFormData" name="password_repeat"></Password>
            </FormRow>
            
            <FormRow>
                <Button auto type="submit" :status-show="passwordFormData._buttonStatus.show" :status-type="passwordFormData._buttonStatus.type">
                    Change password
                    <template v-slot:status>{{ passwordFormData._buttonStatus.label }}</template>
                </Button>
            </FormRow>
            
        </Form>
        
    </div>
    
    <Empty v-else></Empty>

</template>

<script setup lang="ts">

    import Form from "../../components/form/Form.vue";
    import FormRow from "../../components/form/FormRow.vue";
    import Text from "../../components/form/Text.vue";
    import Button from "../../components/form/Button.vue";
    import Empty from  '../../components/notifications/Empty.vue';
    import Heading from "../../components/elements/Heading.vue";
    import Password from "../../components/form/Password.vue";
    import {ref} from "vue";
    
    import User from "../../models/user/User";
    import PasswordChange from "../../models/user/PasswordChange";
    import Loading from "../../components/form/Loading.vue";
    
    const loading = ref(true);
    const formData = ref(new User());
    const passwordFormData = ref(new PasswordChange());
    
    User.getAuthenticated().then(u => formData.value = u ?? formData.value).finally(() => loading.value = false);
    
    function saveFormData() {
        formData.value.update();
    }
    
    function changePassword() {
        passwordFormData.value.change();
    }

</script>