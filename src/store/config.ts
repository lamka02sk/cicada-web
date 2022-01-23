import {defineStore} from "pinia";
import Connection from "../models/config/Connection";

export const useConfigStore = defineStore('config', {

    state: () => ({
        connection: new Connection()
    }),

    actions: {



    }

})