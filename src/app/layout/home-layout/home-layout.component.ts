import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { borkerNavItems } from '../components/navbar/broker_nav';
import { adminNavItems } from '../components/navbar/admin_nav';
import { SessionStorageService } from '../../shared/storage/session-storage.service';
import { filter } from 'rxjs/operators';
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
    this.menuService.onItemClick()
      .subscribe(({ item }) => {
        this.toggleMenu(item);
      });
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;
  }

  ngOnInit(): void {

    this.setMenuSection();
    // this.menuService.onItemClick().subscribe((data) => {
    //   if(data){
        
    //   }
    // });

  }
  onMenuItemClick(e): void {
    console.log("Event",e,this.menu)
    let entry = this.menu.find(ele=>ele.title==e.target.outerText);
    if(entry){
      if(entry['expanded'] == true) entry['expanded'] = false;
      else entry['expanded'] = true;
    }
    else{
      for(let obj of this.menu){
        if(obj.children){
          let subEntry = obj.children.find(ele=>ele.title==e.target.outerText);
          if(subEntry){obj['expanded'] = false;}
        }
      }
    }
    console.log("Event Last",e,this.menu)
    // for(let obj of this.menu){
    //  if(obj['expanded'] == true) obj['expanded'] = false;
    // }
  }
  setMenuSection() {
    if (this.userDetails.UserType == 'admin') {
      this.menu = adminNavItems
    } else {
      this.menu = borkerNavItems;
    }


  }
  toggleMenu(clickedItem: any) {
    // const parent = this.menu.find(item => item.children && item.children.includes(clickedItem));

    // this.menu = this.menu.map(item => {
    //   if (item === parent) {
    //     return { ...item, expanded: true };
    //   }
    //   if (item.children) {
    //     return { ...item, expanded: false };
    //   }
    //   return item;
    // });
  }
}
