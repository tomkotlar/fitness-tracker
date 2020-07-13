import { Subject } from "rxjs";

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { TrainingService } from "../training/training.service";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingSerive: TrainingService
  ) {}

  registerUser(authData: AuthData) {
    this.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        this.loginSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logUser(authData: AuthData) {
    this.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        this.loginSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logOutUser() {
    this.trainingSerive.cancelSubscriptions()
    this.auth.signOut()
    this.authChange.next(false);
    this.router.navigate(["/login"]);
    this.isAuthenticated = false;
  }

  isUserAuth() {
    return this.isAuthenticated;
  }

  private loginSuccess() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(["/training"]);
  }
}
