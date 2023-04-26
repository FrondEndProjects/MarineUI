import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { SessionStorageService } from '../../../shared/storage/session-storage.service';
import { adminNavItems } from './admin_nav';
import { borkerNavItems } from './broker_nav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public userDetails: any;
  public productId: any;
  public menu: any;
  constructor(
    private menuService: NbMenuService,
    private sessionStorageService:SessionStorageService

  ) {
    this.menu = borkerNavItems;
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.setMenuSection();
  }

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;

  }
  setMenuSection() {
    if (this.userDetails.UserType == 'admin') {
      this.menu = adminNavItems
    } else {
      this.menu = borkerNavItems;
    }


  }

}
