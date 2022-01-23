<template>
    
    <Loading show large v-if="loading"></Loading>

    <Form v-else-if="notifications.isLoaded()" @submit.prevent="saveNotifications">
        
        <Heading tag="h2">E-mail notifications</Heading>
        
        <Fieldset legend="Authentication">
            <FormRow column>
                <Checkbox label="Successful login" v-model="notifications" name="auth_login" novalidate></Checkbox>
                <Checkbox label="Login attempt" v-model="notifications" name="auth_attempt" novalidate></Checkbox>
                <Checkbox label="Password change" v-model="notifications" name="auth_password_change" novalidate></Checkbox>
            </FormRow>
        </Fieldset>
    
        <Fieldset legend="Deployment">
            <FormRow column>
                <Checkbox label="Started" v-model="notifications" name="deploy_start" novalidate></Checkbox>
                <Checkbox label="Finished" v-model="notifications" name="deploy_finish" novalidate></Checkbox>
                <Checkbox label="Failed" v-model="notifications" name="deploy_fail" novalidate></Checkbox>
            </FormRow>
        </Fieldset>
    
        <FormRow>
            <Button type="submit" auto :status-show="notifications._buttonStatus.show" :status-type="notifications._buttonStatus.type">
                Save changes
                <template v-slot:status>{{ notifications._buttonStatus.label }}</template>
            </Button>
        </FormRow>
        
    </Form>
    
    <Empty v-else></Empty>

</template>

<script setup lang="ts">

    import {ref} from "vue";

    import Empty from '../../components/notifications/Empty.vue';
    import Form from "../../components/form/Form.vue";
    import Button from "../../components/form/Button.vue";
    import FormRow from "../../components/form/FormRow.vue";
    import Checkbox from "../../components/form/Checkbox.vue";
    import Heading from "../../components/elements/Heading.vue";
    import Fieldset from "../../components/form/Fieldset.vue";
    import UserNotifications from "../../models/user/UserNotifications";
    import Loading from "../../components/form/Loading.vue";

    const loading = ref(true);
    const notifications = ref(new UserNotifications());
    
    UserNotifications.getNotifications().then(n => notifications.value = n ?? notifications.value).finally(() => loading.value = false);
    
    function saveNotifications() {
        notifications.value.update();
    }

</script>
