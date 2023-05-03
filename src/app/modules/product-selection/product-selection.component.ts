import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageModel } from '../../shared/storage/session-storage-model';
import { SessionStorageService } from '../../shared/storage/session-storage.service';

@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.scss'],
})
export class ProductSelectionComponent implements OnInit {
  public userDetails: any;
  public productDetails: any[]=[];
  public routerBaseLink:any='';
  public sessionStorgaeModel:SessionStorageModel

  constructor(
    private router: Router,
    private sessionStorageService:SessionStorageService
    ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;
    this.productDetails = this.userDetails?.ProductDetail;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    if(this.userDetails.UserType == 'admin' ){
      const adminProduct:any[] = this.userDetails?.ProductDetail || [];
      console.log(adminProduct);
      this.productDetails = adminProduct.filter((ele:any)=>ele.ProductId == '11');
    }
  }

  ngOnInit(): void {
  }

  onSelectProduct(item: any) {
    sessionStorage.removeItem('OpenCover');
    sessionStorage.removeItem("endorsement");
    sessionStorage.removeItem('quotesType');
    sessionStorage.removeItem('ReferenceNo');
    sessionStorage.removeItem('MissippiCode');
    sessionStorage.removeItem('ProposalNo');
    sessionStorage.removeItem('loginId');
    sessionStorage.removeItem('WithCertifi');  
    sessionStorage.removeItem('customerLoginId');
    sessionStorage.removeItem('OpenCoverNo');
   
    sessionStorage.setItem('quotesType', 'Without-Endo');
    sessionStorage.setItem('productId', item.ProductId);
    this.sessionStorageService.set('productId',item.ProductId);

    if (item.ProductId === '3') {
      sessionStorage.removeItem('ReferenceNo');
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
      ///customer-info
    }
    
    if (item.ProductId === '11') {
       if(this.userDetails.UserType == 'admin'){
        this.router.navigate([`${this.routerBaseLink}/dashboard`]);

        console.log('jjjjjjjjjjj',`${this.routerBaseLink}`)
        //this.router.navigate([`${this.routerBaseLink}/new-open-cover/exist-opencover`]);

       }else{
        this.router.navigate(['product-layout/opencover']);

       }
    }
  }
  reloadCurrentRoute() {
   
    window.location.href = `${this.routerBaseLink}/new-quotes/customer-info`;
  }

}
