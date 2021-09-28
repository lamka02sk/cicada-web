import {RouteRecordRaw} from "vue-router";

import Config from "../views/setup/Config.vue";

export default [
    <RouteRecordRaw> {
        name: 'configure_connection',
        path: '/configure',
        component: Config
    }
]