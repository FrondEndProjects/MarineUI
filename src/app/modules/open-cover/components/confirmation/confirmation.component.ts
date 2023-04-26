import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  public activeMenu: any = 'menu1'
  public policyInfo: any;
  public routerBaseLink:any='';
  public userDetails:any;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.policyInfo = JSON.parse(sessionStorage.getItem('policyGenerated') || '{}');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
  }

  onMove() {
    sessionStorage.removeItem('ProposalNo');
    this.router.navigate([`${this.routerBaseLink}/new-open-cover/exist-opencover`]);

  }
}
