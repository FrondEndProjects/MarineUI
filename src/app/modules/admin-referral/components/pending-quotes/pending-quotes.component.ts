import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminReferralService } from '../../admin-referral.service';

@Component({
  selector: 'app-pending-quotes',
  templateUrl: './pending-quotes.component.html',
  styleUrls: ['./pending-quotes.component.scss']
})
export class PendingQuotesComponent implements OnInit {
  public searchForm!: FormGroup;
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public FilterValue:any='';
  public routerBaseLink:any='';
  public userDetails:any;

  constructor(
    private adminReferralService:AdminReferralService,
    private router:Router
  ) {
    this.searchForm = this.adminReferralService.searchForm;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;

  }

  ngOnInit(): void {
    this.sF.productName.valueChanges.subscribe(data=>console.log(data));
    this.adminReferralService.tableData.subscribe((data:any[])=>{
      this.tableData = data;
    });
    this.adminReferralService.columnHeader.subscribe((data:any[])=>{
      this.columnHeader = data;
    });

  }

  get sF() {
    return this.searchForm?.controls;
  }

  isActionBtn(item: any) {
    sessionStorage.setItem('quotesType', 'Without-Endo');
    sessionStorage.setItem('ReferenceNo', item?.ApplicationNo);
    sessionStorage.setItem('QuoteStatus',item?.QuoteStatus);
    this.router.navigate([`/${this.routerBaseLink}/new-quotes`]);
  }
}