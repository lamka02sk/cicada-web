import {createStore} from 'vuex'
import config from "./config";
import system from "./system";
import auth from "./auth";
import user from "./user";

const store = createStore({
    modules: {
        config,
        system,
        auth,
        user
    }
});

export default store;