import {defineStore} from "pinia";
import Session from "../models/auth/Session";
import User from "../models/user/User";

export const useAuthStore = defineStore('auth', {

    state: () => ({
        session: new Session(),
        user: new User(),
        authenticated: false
    }),

    actions: {

        async loadUser() {

            if(!this.authenticated) {
                this.user = new User();
                return;
            }

            const user = await User.getAuthenticated();

            if(user) {
                this.user = user;
            } else {
                this.user = new User();
            }

        },

        async logout() {
            if(await this.session.logout()) {
                this.$reset();
            }
        },

        async isSignedIn() : Promise<boolean> {

            if(this.authenticated) {
                return true;
            }

            return await this.signIn();

        },

        async signIn(token?: string) : Promise<boolean> {

            // Try to restore existing session
            if(!token) {

                const session = await Session.restore();

                if(session) {
                    this.loadUser();
                    return true;
                }

                this.authenticated = false;
                return false;

            }

            // New session
            const session = new Session(token);

            this.authenticated = true;
            this.session = session;

            if(await session.check()) {
                this.loadUser();
                return true;
            }

            this.authenticated = false;
            return false;

        }

    }

})