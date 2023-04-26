import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../masters.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-commodity-app-edit',
  templateUrl: './commodity-app-edit.component.html',
  styleUrls: ['./commodity-app-edit.component.scss']
})
export class CommodityAppEditComponent implements OnInit {

  public commodityForm: FormGroup;
  public transportList = [];
  public coverList = [];
  public commodityId;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public branchCode: any;
  public minDate:any;
  Warranty:any[]=[];
  Clauses:any[]=[];
  Exclusion:any[]=[];
  War:any[]=[];
  form:any;
  properties:any[]=[];
  objectKeys = Object.keys;
  clauses:any[]=[];
  Deductible1="N";
  tableData:any[]=[]; 
  clausesIDS:any;
  Clauses1: string;
  icc_a:any;
  Clauses1Code :any[]= [];
  public clickedModal: any = '';
  warrantyData:any[]=[];
  ClausesData:any[]=[];Clauses2:any[]=[];Clau:any[]=[];icc_aE:any[]=[];Exclusion1Code:any[]=[];
Exclusion1:any[]=[];icc_aW:any[]=[];Warranty1Code:any[]=[];Warranty1:any[]=[];icc_aWar:any[]=[];
War1Code:any[]=[];
War1:any[]=[];dedet1:any='N';icc_b:any;icc_bE:any[]=[];icc_bW:any[]=[];icc_bWar:any[]=[];dedet2:any='N';
Clauses2Code :any[]= [];
Exclusion2Code:any[]=[];War2Code:any[]=[];Warranty2Code:any[]=[];Clau2:any[]=[];Exclusion2:any[]=[];
Warranty2:any[]=[];War2:any[]=[];
icc_c:any;icc_cE:any[]=[];icc_cW:any[]=[];icc_cWar:any[]=[];dedet3:any='N';Clauses3Code :any[]= [];Exclusion3Code:any[]=[];
War3Code:any[]=[];
first: boolean;second: boolean;third: boolean;four: boolean;
  constructor( private router: Router,
     private route: ActivatedRoute,
     private masterSer: MastersService, private dialog: MatDialog ) {
      this.minDate = new Date();
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse?.BranchCode;

    let commodityData = JSON.parse(sessionStorage.getItem('commodityData'));

    if ( commodityData) {
      this.commodityId = commodityData
    }
    this.getExistingConveyance();
    this.getExclusion();
    //this.getWar();
    this.getWarrantyList();
  }

  ngOnInit(): void {
    this.getCommodityEdit();
    this.createForm();
  }

  checkUWValue(value) {
    return value = "N";
  }

  getCommodityEdit() {
    let ReqObj = {
      "CommodityId": this.commodityId
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/commodity/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        let commodityForm = data.Result;
        this.form =data.Result;
        this.icc_a = data.Result.IccASeaInfo;
        //this.commodityForm.controls['ModeOfTransportId'].setValue(commodityForm.ModeOfTransportId);
        this.commodityForm.controls['CommodityName'].setValue(commodityForm.CommodityName);
        this.commodityForm.controls['CommodityRate'].setValue(commodityForm.CommodityRate);
        this.commodityForm.controls['CoreApplicationCode'].setValue(commodityForm.CoreApplicationCode);
        this.commodityForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(commodityForm.EffectiveDate));
        this.commodityForm.controls['remarks'].setValue(commodityForm.Remarks);
        this.commodityForm.controls['status'].setValue(commodityForm.Status);
        //this.commodityForm.controls['Clauses'].setValue(this.icc_a.ClausesInfo);
        this.clauses= data.Result?.AllRisksLandTransitLandInfo.ClausesInfo;
        this.icc_a = data.Result?.IccASeaInfo;
        this.dedet1=data.Result?.IccASeaInfo.DeductibleYn;
        this.icc_b=data.Result?.IccBSeaInfo;
        this.dedet2=data.Result?.IccBSeaInfo.DeductibleYn;
        this.icc_c=data.Result?.IccCSeaInfo;
        this.dedet3=data.Result?.IccCSeaInfo.DeductibleYn;
        //this.icc_4=data.Result?.IccCNonDeliveryInfo;
        //this.dedet4=data.Result?.IccCNonDeliveryInfo.DeductibleYn;
        console.log('DDDDDDDDDDDD',this.dedet1)
        this.Clauses1 = this.icc_a.ClausesInfo;
        this.icc_aE=data.Result.IccASeaInfo.ExclusionInfo;
        this.icc_aW=data.Result.IccASeaInfo.WarrantyInfo;
        this.icc_aWar=data.Result.IccASeaInfo.WarInfo;
        console.log("Splitted String ",this.Clauses1);
        for(let clause of this.Clauses1){
          this.Clauses1Code.push(clause);
        }
        console.log("Splitted String Exclusion",this.icc_aE);
        for(let Ex of this.icc_aE){
          this.Exclusion1Code.push(Ex);
        }
        console.log("Splitted String Warranty",this.icc_aW);
        for(let Ex of this.icc_aW){
          this.Warranty1Code.push(Ex);
          console.log('llllllllllllll',this.Warranty1Code)
        }
        console.log("Splitted String War",this.icc_aWar);
        for(let Ex of this.icc_aWar){
          this.War1Code.push(Ex);
        }
      
          let i=0;let code:any;
          for(let cla of this.Clauses1Code){
            this.Clauses2=cla.ClausesId;
            this.Clau.push(this.Clauses2);

            //this.commodityForm.controls['Clauses'].setValue(code);
            console.log('jjjjjjjjjjj',)
            i++;
          }
          let ex=0;let Excl:any[]=[];let warranty:any[]=[];let War:any[]=[];let warr=0;
          for(let cla of this.Exclusion1Code){
            Excl=cla.ExclusionId;
            this.Exclusion1.push(Excl)
            ex++;
          }
          for(let ea of this.Warranty1Code){
            warranty=ea.WarrrantyId;
            this.Warranty1.push(warranty);
            warr++;
            
          }
          for(let war1 of this.War1Code){
            War=war1.WarId;
            this.War1.push(War);
          }

          console.log('ttttttttttttttt',this.Clau, this.Clauses2);
          this.commodityForm.controls['Clauses'].setValue(this.Clau);
          this.commodityForm.controls['Exclusion1'].setValue(this.Exclusion1);
          this.commodityForm.controls['Warranty1'].setValue(this.Warranty1);
          this.commodityForm.controls['War1'].setValue(this.War1);
          this.commodityForm.controls['dedet1'].setValue(this.dedet1);
      
        //////22222222222222222222
        this.Clauses2 = this.icc_b.ClausesInfo;
        this.icc_bE=this.icc_b.ExclusionInfo;
        this.icc_bW=this.icc_b.WarrantyInfo;
        this.icc_bWar=this.icc_b.WarInfo;
        console.log("Splitted String ",this.Clauses2);
        for(let cl2 of this.Clauses2){
          this.Clauses2Code.push(cl2);
        }
        for(let Ex of this.icc_aE){
          this.Exclusion2Code.push(Ex);
        }
        for(let Ex of this.icc_aW){
          this.Warranty2Code.push(Ex);
        }
        console.log("Splitted String War",this.icc_aWar);
        for(let Ex of this.icc_aWar){
          this.War2Code.push(Ex);
        }

        let i1=0;
        for(let cla2 of this.Clauses2Code){
          this.Clauses2=cla2.ClausesId;
          this.Clau2.push(this.Clauses2);

          //this.commodityForm.controls['Clauses'].setValue(code);
          console.log('jjjjjjjjjjj',)
          i1++;
        }
        let i11=0;let Excl2:any[]=[];let warranty2:any[]=[];let War2:any[]=[];let warr2=0;
        for(let cla2 of this.Exclusion2Code){
          Excl2=cla2.ExclusionId;
          this.Exclusion2.push(Excl2)
          i11++;
        }
        for(let ea of this.Warranty2Code){
          warranty2=ea.WarrrantyId;
          this.Warranty2.push(warranty2);
          warr2++;
          
        }
        for(let war1 of this.War2Code){
          War2=war1.WarId;
          this.War2.push(War2);
        }

        console.log('ttttttttttttttt222222',this.Clau2, this.Clauses2);
        this.commodityForm.controls['Clauses2'].setValue(this.Clau2);
        this.commodityForm.controls['Exclusion2'].setValue(this.Exclusion2);
        this.commodityForm.controls['Warranty2'].setValue(this.Warranty2);
        this.commodityForm.controls['War2'].setValue(this.War2);
        this.commodityForm.controls['dedet2'].setValue(this.dedet2);
        ////// 22222222222222222222
    

      }
    )
  }
  getWarrantyList() {
    let ReqObj = {
      "BranchCode": this.branchCode
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/commodity/warranty`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        if (data.Message === "Success") {
            this.Warranty=data.Result;
            this.Warranty = this.Warranty.map(x => ({
              isChecked: false,
              ...x
            }));  
        }
        
      }, (err) => { }
    )
  }

  getExclusion(){
    let ReqObj = {
      "BranchCode": this.branchCode
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/commodity/exclusion`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        if (data.Message === "Success") {
            this.Exclusion=data.Result;
            this.Exclusion = this.Exclusion.map(x => ({
              isChecked: false,
              ...x
            }));
        }
        

      }, (err) => { }
    )
  }

  getWar(para:any){
    let ReqObj = {
      "BranchCode": this.branchCode,
      "CoverId":para
      
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/commodity/war`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        if (data.Message === "Success") {
            this.War=data.Result;
            this.War = this.War.map(x => ({
              isChecked: false,
              ...x
            }));
            this.openDialogWithoutRef('WarCover');
            //this.opendialog('WarCover')
        }
        

      }, (err) => { }
    )
  }

  getClauses(no){
    let ReqObj = {
      "BranchCode": this.branchCode,
      "CoverId":no
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/commodity/clauses`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        if (data.Message === "Success") {
            this.Clauses=data.Result;
            
            this.Clauses = this.Clauses.map(x => ({
              isChecked: false,
              ...x
            }));
            console.log('kkkkkkkkkkkkk',this.Clauses)
          
            //this.opendialog('Clauses');
            this.openDialogWithoutRef('export');
        }
        

      }, (err) => { }
    )
  }

  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
  openDialogWithoutRef(war: string) {


    if (war === 'export') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
      this.second=false;
      this.third=false;
      this.four=false;
    }

    if (war === 'Exclusion') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    if (war === 'Warranty') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    if (war === 'WarCover') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
      this.first=false;

    }


    this.dialog.open(this.secondDialog);

  }


  getExistingConveyance() {
    const ReqObj = {
      'BranchCode': this.branchCode,
    };
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/cover/list`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        
        if (data?.Message === 'Success') {
      
          this.tableData = data?.Result;

        }
      },
      (err) => { },
    );
  }


  
  opendialog(para){
    let title; let list:any[]=[];
    if(para=='Clauses'){
      title="Clauses";
      list=this.Clauses;
    }
    else if(para=='Warranty'){
      title="Warranty";
      list=this.Warranty;
    }
    else if(para=='Exclusion'){
      title="Exclusion";
      list=this.Exclusion
    }

    else if(para=='WarCover'){
      title="WarCover";
      list=this.War

    }
    const dialogRef = this.dialog.open(PopUpComponent,{
      data: {
        title: title,
        list:list
        
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log('kkkk',result);
      this.clausesIDS=result;
      console.log('jjjjjj',)
    });
   
  }

  onDateFormatInEdit(date) {
    if (date) {
      let format = date.split('-');
      if (format.length > 1) {
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else {
        format = date.split('/');
        if (format.length > 1) {
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }
    }
  }

  public createForm() {

    this.commodityForm = new FormGroup({
      CommodityName: new FormControl('', Validators.required),
      CommodityRate : new FormControl( '', Validators.required),
      CoreApplicationCode : new FormControl( '', Validators.required),
      remarks : new FormControl( '', Validators.required),
      commodityExcessRate : new FormControl('', Validators.required),
      effectiveDate : new FormControl( '', Validators.required),
      status : new FormControl('Y'),
      Clauses:new FormControl(),
      Exclusion1:new FormControl(),
      Warranty1:new FormControl(),
      War1:new FormControl(),
      dedet1:new FormControl('N'),
      Clauses2:new FormControl(),
      Exclusion2:new FormControl(),
      Warranty2:new FormControl(),
      War2:new FormControl(),
      dedet2:new FormControl('N'),
      Clauses3:new FormControl(),
      Exclusion3:new FormControl(),
      Warranty3:new FormControl(),
      War3:new FormControl(),
      dedet3:new FormControl('N'),
      Clauses4:new FormControl(),
      Exclusion4:new FormControl(),
      Warranty4:new FormControl(),
      War4:new FormControl(),
      dedet4:new FormControl('N'),
      Clauses5:new FormControl(),
      Exclusion5:new FormControl(),
      Warranty5:new FormControl(),
      War5:new FormControl(),
      dedet5:new FormControl('N'),

    });
  }

  public goBack() {
    this.router.navigateByUrl('/Marine/masters/commodity/view');
  }
close(){
  this.dialog.closeAll();
}

onSave(){

}

onSubmit() {
  const selectedList: any[] = this.warrantyData.filter((ele: any) => ele.isChecked === true);
  let selectedListId: any = '';
  for (let index = 0; index < selectedList.length; index++) {
    const element = selectedList[index];
    selectedListId += element.ClausesId + ',';
    this.dialog.closeAll();
  }
  if (this.clickedModal === 'export') {
    this.commodityForm.controls['Clauses'].setValue(selectedListId);

  }

}

}
