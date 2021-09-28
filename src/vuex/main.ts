import {createStore} from 'vuex'
import config from "./config";
import system from "./system";

const store = createStore({
    modules: {
        config,
        system
    }
});

export default store;