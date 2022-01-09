<template>

    <div v-if="security">
    
        <Form @submit="saveFormData">
            
            <FormRow>
                <Number label="Automatic logout (days)" v-model="security" name="login_duration" min="1" max="365"></Number>
            </FormRow>
            
            <FormRow>
                <Checkbox label="2-Factor Authentication" v-model="security" name="two_factor"></Checkbox>
            </FormRow>
            
            <FormRow>
                <Button type="submit" auto="1" :status-show="security._buttonStatus.show" :status-type="security._buttonStatus.type">
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
            <Button class="mt-4" auto="1" color="red">Generate a new secure token</Button>
        </Message>
    
    </div>
    
    <Empty v-else></Empty>

</template>

<script lang="ts">

    import {computed} from "vue";
    import {useStore} from "vuex";
    import Empty from '../../components/notifications/Empty.vue';
    import Form from "../../components/form/Form.vue";
    import Button from "../../components/form/Button.vue";
    import FormRow from "../../components/form/FormRow.vue";
    import Number from "../../components/form/Number.vue";
    import Checkbox from "../../components/form/Checkbox.vue";
    import UserSecurity from "../../models/user/UserSecurity";
    import Message from "../../components/notifications/Message.vue";

    export default {
        components: { Empty, Form, FormRow, Number, Button, Checkbox, Message },
        setup() {
            
            const store = useStore();
    
            store.dispatch('user/loadSecurity', true);
            const security = computed(() => <UserSecurity>store.getters['user/getSecurity']);
            
            return {
                security,
                saveFormData() {
                    security.value.update();
                }
            }
            
        }
    }

</script>