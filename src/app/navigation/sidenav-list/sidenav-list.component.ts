import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
 @Output() closeSideNav = new EventEmitter<void>(); 
  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
   this.closeSideNav.emit()
  }
}
