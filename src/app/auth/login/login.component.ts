import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup
  isLoading = false
  private loadingSubs: Subscription
  constructor( private authService: AuthService, private uiService: UIService ) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading
    })
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] })
    })
  }

  onSubmit( ) {
    this.authService.logUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe()
  }

}
