<template>

    <Form v-if="formData" @submit="saveFormData">
        
        <FormRow>
            <h2 class="text-gray-700 text-2xl">Hi, <strong>{{ formData.firstname }} {{ formData.lastname }}</strong>, this page is all about you</h2>
        </FormRow>
        
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
            <Text label="First name" v-model="formData" placeholder="John" required="1" name="firstname"></Text>
            <Text label="Last name" v-model="formData" placeholder="Doe" required="1" name="lastname"></Text>
        </FormRow>
        
        <FormRow>
            <Button auto="1" type="submit" :status-show="formData._buttonStatus.show" :status-type="formData._buttonStatus.type">
                Save changes
                <template v-slot:status>{{ formData._buttonStatus.label }}</template>
            </Button>
        </FormRow>
        
    </Form>
    
    <Empty v-else></Empty>

</template>

<script lang="ts">

    import Form from "../../components/form/Form.vue";
    import FormRow from "../../components/form/FormRow.vue";
    import Text from "../../components/form/Text.vue";
    import Button from "../../components/form/Button.vue";
    import Empty from  '../../components/notifications/Empty.vue';
    import {computed} from "vue";
    import {useStore} from "vuex";
    
    import User from "../../models/auth/User";

    export default {
        components: { Form, FormRow, Text, Button, Empty },
        setup() {
        
            const store = useStore();
            
            store.dispatch('auth/loadUser', true);
            const formData = computed(() => <User>store.getters["auth/getUser"]);
            
            return {
                formData,
                saveFormData() {
                    formData.value.update();
                }
            }
            
        }
    }

</script>