import axios from 'axios';
import Notification from "./models/system/Notification";
import {useAuthStore} from "./store/auth";
import {useConfigStore} from "./store/config";
import {useGeneralStore} from "./store/general";

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(
    config => {

        const connectionConfig = useConfigStore().connection;
        const auth = useAuthStore();

        if(auth.authenticated && auth.session.token && config.headers) {
            config.headers.Authorization = 'Bearer ' + auth.session.token;
        }

        config.baseURL = connectionConfig.getUrl();
        return config;

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
    useGeneralStore().pushNotification(notification);

    throw `${error.message.replace('Error: ', '')}`;

});