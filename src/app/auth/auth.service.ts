import { Subject } from "rxjs";

import { User } from './user.model';
import { AuthData } from './auth-data.model';

export class AuthService {
   authChange = new Subject<boolean>();
    private user: User;

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        this.authChange.next(true)
    }

    logUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        this.authChange.next(true)
    }


    logOutUser() {
        this.user = null
        this.authChange.next(false)
    }

    getUser() {
        return { ...this.user }
    }

    isUserAuth() {
        return this.user != null
    }
}