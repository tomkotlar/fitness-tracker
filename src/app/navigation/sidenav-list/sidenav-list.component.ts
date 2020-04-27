import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {

 @Output() closeSideNav = new EventEmitter<void>(); 
 isAuth: boolean = false
 authSubscription: Subscription

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe( authStatus => {
      this.isAuth = authStatus
    })
  }

  onClose() {
   this.closeSideNav.emit()
  }

  onLogout() {
    this.onClose()
    this.authService.logOutUser()
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe()
  }
}
