<template>

    <Form v-if="notifications" @submit="saveNotifications">
        
        <Heading tag="h2">E-mail notifications</Heading>
        
        <Fieldset legend="Authentication">
            <FormRow column="1">
                <Checkbox label="Successful login" v-model="notifications" name="auth_login" novalidate="1"></Checkbox>
                <Checkbox label="Login attempt" v-model="notifications" name="auth_attempt" novalidate="1"></Checkbox>
                <Checkbox label="Password change" v-model="notifications" name="auth_password_change" novalidate="1"></Checkbox>
            </FormRow>
        </Fieldset>
    
        <Fieldset legend="Deployment">
            <FormRow column="1">
                <Checkbox label="Started" v-model="notifications" name="deploy_start" novalidate="1"></Checkbox>
                <Checkbox label="Finished" v-model="notifications" name="deploy_finish" novalidate="1"></Checkbox>
                <Checkbox label="Failed" v-model="notifications" name="deploy_fail" novalidate="1"></Checkbox>
            </FormRow>
        </Fieldset>
    
        <FormRow>
            <Button type="submit" auto="1" :status-show="notifications._buttonStatus.show" :status-type="notifications._buttonStatus.type">
                Save changes
                <template v-slot:status>{{ notifications._buttonStatus.label }}</template>
            </Button>
        </FormRow>
        
    </Form>
    
    <Empty v-else></Empty>

</template>

<script setup lang="ts">

    import {computed} from "vue";
    import {useStore} from "vuex";

    import Empty from '../../components/notifications/Empty.vue';
    import Form from "../../components/form/Form.vue";
    import Button from "../../components/form/Button.vue";
    import FormRow from "../../components/form/FormRow.vue";
    import Checkbox from "../../components/form/Checkbox.vue";
    import Heading from "../../components/elements/Heading.vue";
    import Fieldset from "../../components/form/Fieldset.vue";
    import UserNotifications from "../../models/user/UserNotifications";

    const store = useStore();

    store.dispatch('user/loadNotifications', true);
    const notifications = computed(() => <UserNotifications>store.getters['user/getNotifications']);
    
    function saveNotifications() {
        notifications.value.update();
    }

</script>

<style lang="scss" scoped>



</style>