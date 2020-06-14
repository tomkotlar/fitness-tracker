import { Subject } from "rxjs";

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router, private auth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
    this.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.loginSuccess();
      })
      .catch(error => {
        console.log(error);
      });
  }

  logUser(authData: AuthData) {
  this.auth.signInWithEmailAndPassword(authData.email, authData.password)
  .then(result => {
      console.log(result)
    this.loginSuccess();
  })
  .catch(error => {
    console.log(error);
  });
  }

  logOutUser() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(["/login"]);
  }

  getUser() {
    return { ...this.user };
  }

  isUserAuth() {
    return this.user != null;
  }

  private loginSuccess() {
    this.authChange.next(true);
    this.router.navigate(["/training"]);
  }
}
