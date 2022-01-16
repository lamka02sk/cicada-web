import axios, {AxiosError} from 'axios';
import store from './vuex/main'
import Notification from "./models/system/Notification";
import {Exception} from "sass";

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(
    config => {

        const connectionConfig = store.getters['config/connectionConfig'] ?? null;

        if(!connectionConfig) {
            return config;
        }

        const session = store.getters['auth/getSession'] ?? null;

        if(session && config.headers) {
            config.headers.Authorization = 'Bearer ' + session.token;
        }

        config.baseURL = connectionConfig.getUrl();
        return config;

    }, error => {

    }
);

axios.interceptors.response.use(response => {

    if(!response.data.success) {
        throw `${response.data.status} [${response.data.message}]`;
    }

    return response;

}, error => {

    if(error.response && error.response.data) {
        throw `${error.response.data.status} [${error.response.data.message}]`;
    }

    const notification = new Notification('error', 'Request failed', error, 10);
    store.dispatch('system/pushNotification', notification);

    throw `${error.message.replace('Error: ', '')}`;

});