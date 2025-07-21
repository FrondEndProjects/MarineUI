import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminReferralService } from '../../admin-referral.service';

@Component({
  selector: 'app-rejected-quotes',
  templateUrl: './rejected-quotes.component.html',
  styleUrls: ['./rejected-quotes.component.scss']
})
export class RejectedQuotesComponent implements OnInit {

  public searchForm!: FormGroup;
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public FilterValue: any = '';
  userDetails: any;
  routerBaseLink: any;
  constructor(
    private adminReferralService: AdminReferralService,
    private router: Router
  ) {
    this.searchForm = this.adminReferralService.searchForm;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;


  }

  ngOnInit(): void {
    this.sF.productName.valueChanges.subscribe(data => console.log(data));
    this.adminReferralService.tableData.subscribe((data: any[]) => {
      this.tableData = data;
    });
    this.adminReferralService.columnHeader.subscribe((data: any[]) => {
      this.columnHeader = data;
    });

  }

  get sF() {
    return this.searchForm?.controls;
  }

  isActionBtn(item: any) {
    let productid = sessionStorage.getItem('productId');
    console.log('ProductIdsssssss', productid);
    sessionStorage.setItem('quotesType', 'Without-Endo');
    sessionStorage.setItem('ReferenceNo', item.ApplicationNo);
    sessionStorage.setItem('QuoteStatus', item.QuoteStatus);
    if (item?.OpenCoverNo) {
      const opencover = {
        'name': 'adminReferral',
        'value': item?.OpenCoverNo,
        "productId": productid
        //item?.ProductId
      }
      sessionStorage.setItem('OpenCover', JSON.stringify(opencover));
    }
    else {
      const opencover = {
        'name': 'adminReferral',
        'value': null,
        "productId": productid
      }
      sessionStorage.setItem('OpenCover', JSON.stringify(opencover));
    }
    // this.router.navigate([`/${this.routerBaseLink}/new-quotes`]);
    let value = 'referral'
    this.router.navigate([`/${this.routerBaseLink}/new-quotes`], { queryParams: { value } });
  }

}
