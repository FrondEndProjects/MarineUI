import { filter } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../app-config.json';
import { MastersService } from '../masters.service';
import { DatePipe } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-RateCover',
  templateUrl: './RateCover.component.html',
  styleUrls: ['./RateCover.component.scss'],
})
export class RateCoverComponent implements OnInit {

  public showAddNewButton: boolean = true;
  public filterValue: any = '';
  queryHeader1:any[]=[];
  ProductInfo:any[]=[];closeResult: string;
  transportcode:any;
//   public tableData: any[] = [];
  public columnHeader: any[] = [];
  public countryList:any[] =[];
  CoverList:any;ExcessPercentage:any;ExcessAmount:any;
  editss: boolean = false;
    commodityname: any;
    commodityId: any;
    public branchCode: any;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    userDetails: any;remarks:any;
    minDate:any;effectiveDateStart:any;transportList:any[]=[];ContainerList:any[]=[];
  CoverNames: any;
  containercode: any;ExcessDescription:any;
  effectiveDate:any;currentBuildingIndex:any;Rate:any;Status:any;
  constructor(private router: Router, private route: ActivatedRoute,private masterSer: MastersService,private datePipe:DatePipe,private modalService: NgbModal) {

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
     this.getModeOFtransportList();
}

  ngOnInit(): void {
    this.ContainerList =[{'Code':'CO',"CodeDescription":'CONTAINER'},
    {'Code':'NC',"CodeDescription":'Non-CONTAINER'},
  ]
    // this.ProductInfo= [{
    //     "CoverId": "",
    //     "CoverName":"",
    //     "CalcType":"P",
    //     "Rate":"",
    //     "ContainerisedYn":"Y",
    //     "Status":"Y",
    //      "RegulatoryCode": "",
    //   },
    // ];
    //this.coverdropdown();
    if(this.commodityId !=null && this.commodityId!=undefined){
      this.getlist();
    }
    this.queryHeader1=[
      { key: 'TransportDescription', display: 'Mode Of Transport' },
      { key: 'CoverName', display: 'Cover Name' },
      { key: 'ContainerisedYn', display: 'Containerised Yn' },
      { key: 'Rate', display: 'Rate' },
      {key: 'Status', display: 'Status'},
      {
              key: 'actions',
              display: 'Action',
              config: {
                isEdit: true,
              },
      },
      // {
      //         key: 'Delete',
      //         display: 'Delete',
      //         config: {
      //           isDelete: true,
      //         },
      // }
    ]
  }


  public getModeOFtransportList() {
    const ReqObj = {
      'BranchCode': this.userDetails.Result.BelongingBranch,
      'ProductId' : '3',
      OpenCoverNo : '',
    };

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/modeoftransport`, ReqObj).subscribe(
      (data: any) => {
        if (data?.Message === 'Success') {
          this.transportList = data.Result;
          //this.getCoverName();
          
        }
      },
      (err) => { },
    );
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
  // coverdropdown(){
  //   let ReqObj = {
  //       "BranchCode":this.branchCode
  //     }
  
  //      this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/cover/active`, ReqObj).subscribe(
  //        (data: any) => {
  //          if (data?.Message === 'Success') {
  //            console.log(data);
  //           this.CoverList = data?.Result;
  //          }
  //        }, (err) => { }
  //      );
  // }

  public getCoverName(type) {
    if(type=='change'){
     this.CoverNames = '';
    }
    console.log('NNNNNNNNN',this.transportcode);
    const ReqObj = {
      'BranchCode': this.userDetails.Result.BelongingBranch,
      'ProductId' : '3',
      'ModeOfTransportCode':this.transportcode,
      'OpenCoverNo':"",
      'pvType': 'cover',
    }

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/cover`, ReqObj).subscribe(
      (data: any) => {
        if (data?.Message === 'Success') {
          this.CoverList = data.Result;
        }
      },
      (err) => { },
    );
  }
  public onEdit(event,modal) {
    this.editss=false;
    this.open(modal);
    const ReqObj = {
      "CommodityId":this.commodityId,
      "BranchCode":this.branchCode,
      "CoverId":event.CoverId,
      "ContainerisedYn":event.ContainerisedYn,
      "ModeOfTransportId":event.ModeOfTransportId,
      "Type":"E"
    }

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/commodityrate/edit`, ReqObj).subscribe(
      (data: any) => {
        if (data?.Message === 'Success') {
          console.log('NNNNNNNNN',data?.Result);
         
          this.transportcode=data?.Result?.ModeOfTransportId;
          if(this.transportcode){
            this.getCoverName('direct');
          }
          this.CoverNames=data?.Result?.CoverId;
          this.containercode=data?.Result?.ContainerisedYn;
          this.effectiveDate=this.onDateFormatInEdit(data?.Result?.EffectiveDateStart);
          this.Rate=data?.Result?.Rate;
          this.Status=data?.Result?.Status;
          this.ExcessAmount = data?.Result?.ExcessAmount;
          this.ExcessDescription = data?.Result?.ExcessDesc;
          this.ExcessPercentage = data?.Result?.ExcessPercent;
          
          // this.CoverList = data.Result;
        }
      },
      (err) => { },
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

  onSaves(modal){
    let coverDesc:any; let transportDesc:any;let contdesc:any;
      if(this.CoverNames!='' && this.CoverNames!=undefined){
        let fil = this.CoverList.find(ele => ele.Code == this.CoverNames)
        if(fil){
             coverDesc = fil.CodeDescription;
        }
        else{
          coverDesc='';
        }
      }
      if(this.transportcode!='' && this.transportcode!=undefined){
        let fil = this.transportList.find(ele => ele.Code == this.transportcode)
        if(fil){
          transportDesc = fil.CodeDescription;
        }
        else{
          transportDesc='';
        }
      }
      if(this.containercode!='' && this.containercode!=undefined && this.containercode!=null){
        let fil = this.ContainerList.find(ele => ele.Code == this.containercode)
        if(fil){
          contdesc = fil.CodeDescription;
        }
        else{
          contdesc ='';
        }
      }
    
    let ReqObj = {
      // "CommodityId": this.commodityId,
      // "CommodityName": this.commodityname,
      // "BranchCode": this.branchCode,
      // "EffectiveDateStart": this.effectiveDateStart,
      // "Remarks": this.remarks,
      // "CommodityRateReq":this.ProductInfo
      "CommodityId": this.commodityId,
      "CommodityName": this.commodityname,
      "BranchCode": this.branchCode,
      "EffectiveDateStart": this.effectiveDate,
      "Remarks": this.remarks,
      "CoverId":this.CoverNames,
      "CoverName":coverDesc,
      "CalcType":"P",
      "Rate":this.Rate,
      "ContainerisedYn":this.containercode,
      "Status":this.Status,
      "ContainerisedDescription":contdesc,
      "ExcessPercent":this.ExcessPercentage,
      "ExcessAmount":this.ExcessAmount,
      "ExcessDesc":this.ExcessDescription,
      "ModeOfTransportId":this.transportcode,
      "TransportDescription":transportDesc
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
             modal.dismiss('Cross click');
             this.getlist();
            // this.CoverList = data?.Result;
           }
         }, (err) => { }
       );
  }
  // keyups($event){
  //   var newValue = this.Rate + character;
  //   if (isNaN(newValue) || hasDecimalPlace(newValue, 3)) {
  //       e.preventDefault();
  //       return false;
  //   }
  // }
//   onBlur(evt){
//     console.log('NNNNNNNN',evt)
//     if(evt.target.valueAsNumber){
//       this.Rate= evt.target.valueAsNumber.toFixed(2);
//    }
// } 

decimalFilter(event: any) {
  const reg = /^-?\d*(\.\d{0,5})?$/;
  let input = event.target.value + String.fromCharCode(event.charCode);

  if (!reg.test(input)) {
      event.preventDefault();
  }
}

  createCover(element,modal){
    this.editss=true;
    this.transportcode=null;
    this.CoverNames=null;
    this.containercode=null;
    this.effectiveDate=null;
    this.Rate=null;
    this.Status='Y';
    this.ExcessAmount=null;this.ExcessDescription=null;this.ExcessPercentage=null;
    //   let entry = {
    //     "LiabilityOccupationId":null,
    //     "TotalNoOfEmployees":null,
    //     "EmpLiabilitySi":'0',
    //     "OtherOccupation":'',
    //   }
    //   this.currentBuildingIndex = this.ProductInfo.length;
    //   this.ProductInfo.push(entry);
    // console.log('employee lists',this.ProductInfo,this.currentBuildingIndex);
   this.open(modal)
  }


  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static',ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  cancelnew(modal){
    this.ProductInfo.splice(this.currentBuildingIndex, 1);
    modal.dismiss('Cross click');
  }
  cancelnes(modal){
    modal.dismiss('Cross click');
    this.editss=false;
  }
}
