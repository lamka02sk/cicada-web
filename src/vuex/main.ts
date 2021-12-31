import {createStore} from 'vuex'
import config from "./config";
import system from "./system";
import auth from "./auth";

const store = createStore({
    modules: {
        config,
        system,
        auth
    }
});

export default store;