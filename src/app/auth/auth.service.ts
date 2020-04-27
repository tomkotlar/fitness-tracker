import { Subject } from "rxjs";

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
   authChange = new Subject<boolean>();
    private user: User;


 constructor(private router: Router) {}

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        this.loginSuccess() 
    }

    logUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        this.loginSuccess() 
    }


    logOutUser() {
        this.user = null
        this.authChange.next(false)
        this.router.navigate(['/login'])
    }

    getUser() {
        return { ...this.user }
    }

    isUserAuth() {
        return this.user != null
    }

   private loginSuccess() {
        this.authChange.next(true)
        this.router.navigate(['/training'])
    }
}