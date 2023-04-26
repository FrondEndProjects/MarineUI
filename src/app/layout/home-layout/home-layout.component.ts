import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { borkerNavItems } from '../components/navbar/broker_nav';
import { adminNavItems } from '../components/navbar/admin_nav';
import { SessionStorageService } from '../../shared/storage/session-storage.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit {
  public userDetails: any;
  public productId: any;
  public menu: any;
  constructor(
    private menuService: NbMenuService,
    private sessionStorageService:SessionStorageService
  ) {
    this.menu = borkerNavItems;
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;
  }

  ngOnInit(): void {

    this.setMenuSection();

  }
  setMenuSection() {
    if (this.userDetails.UserType == 'admin') {
      this.menu = adminNavItems
    } else {
      this.menu = borkerNavItems;
    }


  }


}
