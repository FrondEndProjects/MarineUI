import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { SessionStorageService } from '../../shared/storage/session-storage.service';

@Component({
  selector: 'app-new-quotes',
  templateUrl: './new-quotes.component.html',
  styleUrls: ['./new-quotes.component.scss']
})
export class NewQuotesComponent implements OnInit {

  public stepperList: any[] = [];
  public stepperListSlice: any[] = [];
  public quotesType: any = '';
  public OpenCover: any;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public brokerCode: any;
  public applicationId: any;
  public endorsement:any;
  public portfolio:any;
  public routerBaseLink:any;
  public isIssuer:boolean= false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private menuService: NbMenuService,
    private sessionStorageService: SessionStorageService
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    
    this.userDetails = this.userDetails?.LoginResponse;
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.routerBaseLink = this.userDetails?.routerBaseLink;

    // Broker
    if (this.userDetails.UserType === 'Broker' || this.userDetails.UserType === 'User') {
      this.loginId = this.userDetails?.LoginId;
      this.applicationId = '1';
    }
    // Issuer
    if (this.userDetails.UserType !== 'Broker' && this.userDetails.UserType !== 'User') {
      this.loginId = '';
      this.applicationId = this.userDetails.LoginId;
    }

    if (this.userDetails?.UserType =="RSAIssuer"){
      this.isIssuer = true;
    }

    this.onReloadMenu();
    this.menuService.onItemClick().subscribe((data) => {
      if (data.item.link === `/${this.routerBaseLink}/new-quotes`) {
        console.log(data);
        this.sessionStorageService.remove('referral');
        sessionStorage.setItem('quotesType', 'Without-Endo');
        //sessionStorage.removeItem('quotesType')
        sessionStorage.removeItem("endorsement");
        sessionStorage.removeItem("ReferenceNo");
        // sessionStorage.removeItem('QuoteStatus');
        //this.reloadCurrentRoute();
        /*sessionStorage.removeItem('OpenCover');
        sessionStorage.removeItem('quotesType');
        sessionStorage.removeItem('MissippiCode');
        sessionStorage.removeItem('ProposalNo');
        sessionStorage.removeItem('loginId');
        sessionStorage.removeItem('WithCertifi');  
        sessionStorage.removeItem('customerLoginId');
        sessionStorage.removeItem('OpenCoverNo');*/
        this.reloadCurrentRoute();
      }
    });
  }

  ngOnInit(): void {

    this.router
      .events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          } else {
            return null;
          }
        }
        return null;
      })).subscribe((customData: any) => {
        console.log(customData);
        const index = this.stepperList.findIndex((ele: any) => ele.title === customData);
        console.log(index);
        const name: any = this.stepperList[index].name;

        this.stepperList.map((el: any) => {
          if (el.name < name) {
            el.isActive = true;
          } else {
            el.isActive = false;

          }
        })

        console.log(this.stepperList);

      });
  }

  onReloadMenu() {
   
    this.quotesType = sessionStorage.getItem('quotesType');
    if (this.quotesType == 'Without-Endo') {
      this.stepperList = [
        { isActive: false, name: '1', title: 'customerinfo', url: `${this.routerBaseLink}/new-quotes/customer-info` },
        { isActive: false, name: '2', title: 'premiuminfo', url: `${this.routerBaseLink}/new-quotes/premium-info` },
        { isActive: false, name: '3', title: 'policygenerate', url: `${this.routerBaseLink}/new-quotes/policy-generate` },
      ];
    } else {
      this.stepperList = [
        { isActive: false, name: '1', title: 'endorsementgrid', url: `${this.routerBaseLink}/new-quotes/endorsement-grid` },
        { isActive: false, name: '2', title: 'endorsementtype', url: `${this.routerBaseLink}/new-quotes/endorsement-type` },
        { isActive: false, name: '3', title: 'customerinfo', url: `${this.routerBaseLink}/new-quotes/customer-info` },
        { isActive: false, name: '4', title: 'premiuminfo', url: `${this.routerBaseLink}/new-quotes/premium-info` },
        { isActive: false, name: '5', title: 'policygenerate', url: `${this.routerBaseLink}/new-quotes/policy-generate` },
      ];
    }
    //this.router.navigate([this.stepperList[0].url]);
  }
  reloadCurrentRoute() {
   
    this.router.navigate([`${this.routerBaseLink}/new-quotes/customer-info`]);
  }


}
