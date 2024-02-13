import { filter } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../app-config.json';
import { MastersService } from '../masters.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-RateCover',
  templateUrl: './RateCover.component.html',
  styleUrls: ['./RateCover.component.scss'],
})
export class RateCoverComponent implements OnInit {

  public showAddNewButton: boolean = true;
  public filterValue: any = '';
  ProductInfo:any[]=[];
//   public tableData: any[] = [];
  public columnHeader: any[] = [];
  public countryList:any[] =[];
  CoverList:any;
    commodityname: any;
    commodityId: any;
    public branchCode: any;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    userDetails: any;remarks:any;
    minDate:any;effectiveDateStart:any;
  constructor(private router: Router, private route: ActivatedRoute,private masterSer: MastersService,private datePipe:DatePipe) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => {
      if ( event.url.includes('add-edit')) {
        this.showAddNewButton = false;
      } else {
        this.showAddNewButton = true;
      }
    });
    this.minDate = new Date();

    // let ReqObj={
    //     "CommodityName":event?.CommodityName,
    //     "CommodityID":event?.CommodityId
    //   }
     let s= JSON.parse(sessionStorage.getItem('CommodityRating'));
     if(s){
           this.commodityname = s?.CommodityName;
           this.commodityId = s?.CommodityID;
     }
     this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
     console.log(this.userDetails);
     
     if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse.BranchCode;
}

  ngOnInit(): void {
    this.ProductInfo= [{
        "CoverId": "",
        "CoverName":"",
        "CalcType":"P",
        "Rate":"",
        "ContainerisedYn":"Y",
        "Status":"Y",
         "RegulatoryCode": "",
      },
    ];
    this.coverdropdown();
    if(this.commodityId !=null && this.commodityId!=undefined){
      this.getlist();
    }
  }

  addFormRow(){
    let entry={
      "CoverId": "",
      "CoverName":"",
      "CalcType":"P",
      "Rate":"",
      "ContainerisedYn":"Y",
      "Status":"Y",
       "RegulatoryCode": "",
      }

    this.ProductInfo.push(entry);
    console.log('Product Infosss',this.ProductInfo);
  }
  onDeleteRow(index:any){
    this.ProductInfo.splice(index,1);
}
  onSubmit(){

  }
  productInsert(){

  }

  goback(){
    this.router.navigateByUrl('Marine/masters/commodity/view');
  }

  public goToAddNewPage() {
    sessionStorage.setItem('commodityData', null);
    this.router.navigate(['add-edit'], { relativeTo: this.route });
  }
  coverdropdown(){
    let ReqObj = {
        "BranchCode":this.branchCode
      }
  
       this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/cover/active`, ReqObj).subscribe(
         (data: any) => {
           if (data?.Message === 'Success') {
             console.log(data);
            this.CoverList = data?.Result;
           }
         }, (err) => { }
       );
  }

  getlist(){
    let ReqObj = {
      "BranchCode":this.branchCode,
      "CommodityId":this.commodityId
    }
     this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/commodityrate/list`, ReqObj).subscribe(
       (data: any) => {
         if (data?.Message === 'Success') {
           console.log(data);
          this.ProductInfo = data?.Result;
          this.effectiveDateStart= this.onDateFormatInEdit(data?.Result[0]?.EffectiveDate);
           this.remarks = data?.Result[0]?.Remarks;
         }
         else{
          this.addFormRow();
         }
       }, (err) => { }
     );
  }
  onDateFormatInEdit(date) {
    console.log(date);
    if (date) {
      let format = date.split('-');
      if(format.length >1){
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else{
        format = date.split('/');
        if(format.length >1){
          // var NewDate = new Date(new Date(format[2], format[1], format[0]));
          // NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }

  commoditysname(row:any,i:any){
    console.log('GAa',row,this.CoverList,i)
    let n:any= row.toString();
    console.log('GAa',n)
let fil = this.CoverList.find(ele => ele.Code == row.toString())
if(fil){
  console.log('Fill Descriptionsss',fil.CodeDescription);
  this.ProductInfo[i].CoverName=fil.CodeDescription;
  console.log('Fill Descriptionsss',this.ProductInfo[i].CoverName);
}
  }

  onSaves(){
    let ReqObj = {
      "CommodityId": this.commodityId,
      "CommodityName": this.commodityname,
      "BranchCode": this.branchCode,
      "EffectiveDateStart": this.effectiveDateStart,
      "Remarks": this.remarks,
      "CommodityRateReq":this.ProductInfo
      }
      if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
        ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
      }
      else{
        ReqObj['EffectiveDateStart'] = "";
      }
       this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/commodityrate/save`, ReqObj).subscribe(
         (data: any) => {
           if (data?.Message === 'Success') {
             console.log(data);
             this.getlist();
            // this.CoverList = data?.Result;
           }
         }, (err) => { }
       );
  }
}
