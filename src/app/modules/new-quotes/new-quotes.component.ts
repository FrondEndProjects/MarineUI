import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { SessionStorageService } from '../../shared/storage/session-storage.service';
import { NewQuotesService } from './new-quotes.service';

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
  showRouting: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private newQuotesService: NewQuotesService,
    private menuService: NbMenuService,
    private sessionStorageService: SessionStorageService
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    
    this.userDetails = this.userDetails?.LoginResponse;
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    if(this.OpenCover){
      if(this.OpenCover?.name == 'adminReferral'){
            this.productId = this.OpenCover?.productId;
      } 
    }
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

    if (this.userDetails?.UserType =="Issuer"){
      this.isIssuer = true;
    }

    this.onReloadMenu();
    this.menuService.onItemClick().subscribe((data) => {
      
        console.log("Current Route on Quote",data.item.link,this.routerBaseLink  )
        if (data.item.link === `${this.routerBaseLink}/new-quotes` || data.item.link==`${this.routerBaseLink}/new-quotes/customerinfo`) {
          this.newQuotesService.quoteEditData.next(null)
          this.sessionStorageService.remove('referral');
          sessionStorage.setItem('quotesType', 'Without-Endo');
          //sessionStorage.removeItem('quotesType')
          sessionStorage.removeItem("endorsement");
          sessionStorage.removeItem("ReferenceNo");
          sessionStorage.removeItem('QuoteStatus');
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
        console.log("Activated Route",child)
        while (child) {
          if (child.firstChild) {
          } else if (child.snapshot.data && child.snapshot.data['title']) {
            
              return child.snapshot.data['title'];
            // }
            // else{return 'customerinfo'}
          } else {
            return null;
          }
        }
        return null;
      })).subscribe((customData: any) => {
        console.log(customData);
        let refNo = sessionStorage.getItem("ReferenceNo")
        // if(refNo==undefined || refNo == null){
        //   customData = 'customerinfo'
        // }
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
     this.showRouting = false;
     console.log("Router Url",this.router.url)
    if(this.router.url==`/${this.routerBaseLink}/new-quotes` || this.router.url==`/${this.routerBaseLink}/new-quotes/customer-info`){
        window.location.reload();
    }
    else this.router.navigate([`/${this.routerBaseLink}/new-quotes`]);
    // this.newQuotesService.quoteEditData.next(null)
    // this.router.navigate([`${this.routerBaseLink}/new-quotes/customer-info`]);
    // this.showRouting = true;
    
  }


}
