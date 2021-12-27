import axios from 'axios';
import store from './vuex/main'
import Notification from "./models/system/Notification";

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error);
    const notification = new Notification('error', 'Request failed', error, 10);
    store.dispatch('system/pushNotification', notification);
});