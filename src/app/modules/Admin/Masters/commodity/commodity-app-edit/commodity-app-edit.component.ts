import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../masters.service';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { PopUpComponent } from '../../popup/popup.component';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
//import { ConsoleReporter } from 'jasmine';

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
  public branchCode: any;coverageList:any[]=[];
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
  Clauses1: any;
  icc_a:any;selectedCoverList:any[]=[];
  Clauses1Code :any[]= [];finalSelectedCovers:any=null;
  public clickedModal: any = '';
  warrantyData:any[]=[];
  ClausesData:any[]=[];
  icc_b:any;icc_c:any;icc_4:any;icc_5:any;icc_6:any;
  icc_7:any;icc_8:any;icc_9:any;icc_10:any;icc_11:any;
  icc_12:any;icc_13:any;icc_14:any;icc_15:any;icc_16:any;icc_17:any;
  icc_18:any;icc_19:any;dedet4:any;dedet5:any;dedet6:any;dedet7:any;dedet8:any;
  dedet9:any;dedet10:any;dedet11:any;dedet12:any;dedet13:any;
  dedet14:any;dedet15:any;dedet16:any;dedet17:any;dedet18:any;
  dedet19:any;
  split1:any;





  first: boolean;second: boolean;third: boolean;four: boolean;
  de1: any;
  de2: any;
  dedet3: any;
  constructor( private router: Router,
     private route: ActivatedRoute,private toastrService: NbToastrService,
     private masterSer: MastersService, private dialog: MatDialog ) {
      this.minDate = new Date();
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse?.BranchCode;

    let commodityData = JSON.parse(sessionStorage.getItem('commodityData'));

    if ( commodityData) {
      this.commodityId = commodityData;
      this.getCommodityEdit();
    }

    //this.getClauses('1');
    this.getExistingConveyance();
    this.getExclusion();
    //this.getWar();
    this.getWarrantyList();
  }

  ngOnInit(): void {
      this.createForm();
  }

  checkUWValue(value) {
    return value = "N";
  }

  getCommodityEdit() {
    let ReqObj = {
      "CommodityId": this.commodityId,
      "BranchCode": this.branchCode
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/commodity/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let commodityForm = data.Result;
          this.form =data.Result;
          let coverageList = data.Result?.CoverageReferralInfo;
          if(coverageList){
            if(coverageList.length!=0){
            this.selectedCoverList = [];let i=0;
              for(let cover of coverageList){
                  this.selectedCoverList.push(cover.CoverageReferral);
                  i+=1;
                  if(i==coverageList.length) this.onUpdateCoverages();
              }
            }
          }
          if(data.Result.IccASeaInfo){
            this.icc_a = data.Result.IccASeaInfo;
            this.icc_a = data.Result?.IccASeaInfo;
            if(data.Result?.IccASeaInfo.DeductibleYn!='' && data.Result?.IccASeaInfo.DeductibleYn!=null && data.Result?.IccASeaInfo.DeductibleYn!='string'){
              this.de1=data.Result?.IccASeaInfo.DeductibleYn;
            }
            else{
              this.de1='N';
            }
            
          }
          if(data.Result.IccBSeaInfo){
            this.icc_b=data.Result.IccBSeaInfo;
            if(data.Result?.IccBSeaInfo.DeductibleYn!='' && data.Result?.IccBSeaInfo.DeductibleYn!=null && data.Result?.IccBSeaInfo.DeductibleYn!='string'){
              this.de2=data.Result?.IccBSeaInfo.DeductibleYn;
            }
            else{
              this.de2='N';
            }
          }
          if(data.Result?.IccCSeaInfo){
            this.icc_c=data.Result?.IccCSeaInfo;
            if(data.Result?.IccCSeaInfo.DeductibleYn!='' && data.Result?.IccCSeaInfo.DeductibleYn!=null && data.Result?.IccCSeaInfo.DeductibleYn!='string'){
              this.dedet3=data.Result?.IccCSeaInfo.DeductibleYn;
            }
            else{
              this.dedet3='N';
            }
          }
          if(data.Result?.IccCNonDeliveryInfo){
            this.icc_4=data.Result?.IccCNonDeliveryInfo;
            if(data.Result?.IccCNonDeliveryInfo.DeductibleYn!='' && data.Result?.IccCNonDeliveryInfo.DeductibleYn!=null && data.Result?.IccCNonDeliveryInfo.DeductibleYn!='string'){
              this.dedet4=data.Result?.IccCNonDeliveryInfo.DeductibleYn;
            }
            else{
              this.dedet4='N';
            }
          }
          if(data.Result?.IccAFrozenMeatSeaInfo){
            this.icc_5=data.Result?.IccAFrozenMeatSeaInfo;
            if(data.Result?.IccAFrozenMeatSeaInfo.DeductibleYn!='' && data.Result?.IccAFrozenMeatSeaInfo.DeductibleYn!=null && data.Result?.IccAFrozenMeatSeaInfo.DeductibleYn!='string'){
              this.dedet5=data.Result?.IccAFrozenMeatSeaInfo.DeductibleYn;
            }
            else{
              this.dedet5='N';
            }
          }
          if(data.Result?.IccAFrozenFoodSeaInfo){
            this.icc_6=data.Result?.IccAFrozenFoodSeaInfo;
            if(data.Result?.IccAFrozenFoodSeaInfo.DeductibleYn!='' && data.Result?.IccAFrozenFoodSeaInfo.DeductibleYn!=null && data.Result?.IccAFrozenFoodSeaInfo.DeductibleYn!='string'){
              this.dedet6=data.Result?.IccAFrozenFoodSeaInfo.DeductibleYn;
            }
            else{
              this.dedet6='N';
            }
          }
          if(data.Result?.IccCFrozenMeatSeaInfo){
            this.icc_7=data.Result?.IccCFrozenMeatSeaInfo;
            if(data.Result?.IccCFrozenMeatSeaInfo.DeductibleYn!='' && data.Result?.IccCFrozenMeatSeaInfo.DeductibleYn!=null && data.Result?.IccCFrozenMeatSeaInfo.DeductibleYn!='string'){
              this.dedet7=data.Result?.IccCFrozenMeatSeaInfo.DeductibleYn;
            }
            else{
              this.dedet7='N';
            }
          }
          if(data.Result?.IccCFrozenFoodSeaInfo){
            this.icc_8=data.Result?.IccCFrozenFoodSeaInfo;
            if(data.Result?.IccCFrozenFoodSeaInfo.DeductibleYn!='' && data.Result?.IccCFrozenFoodSeaInfo.DeductibleYn!=null && data.Result?.IccCFrozenFoodSeaInfo.DeductibleYn!='string'){
              this.dedet8=data.Result?.IccCFrozenFoodSeaInfo.DeductibleYn;
            }
            else{
              this.dedet8='N';
            }
          }
          if(data.Result?.LandTransitLandInfo){
            this.icc_9=data.Result?.LandTransitLandInfo;
            if(data.Result?.LandTransitLandInfo.DeductibleYn!='' && data.Result?.LandTransitLandInfo.DeductibleYn!=null && data.Result?.LandTransitLandInfo.DeductibleYn!='string'){
              this.dedet9=data.Result?.LandTransitLandInfo.DeductibleYn;
            }
            else{
              this.dedet9='N';
            }
          }
          if(data.Result?.PostParcelCourierInfo){
            this.icc_10=data.Result?.PostParcelCourierInfo;
            if(data.Result?.PostParcelCourierInfo.DeductibleYn!='' && data.Result?.PostParcelCourierInfo.DeductibleYn!=null && data.Result?.PostParcelCourierInfo.DeductibleYn!='string'){
              this.dedet10=data.Result?.PostParcelCourierInfo.DeductibleYn;
            }
            else{
              this.dedet10='N';
            }
          }
          if(data.Result?.IccAirCargoAirInfo){
            this.icc_11=data.Result?.IccAirCargoAirInfo;
            if(data.Result?.IccAirCargoAirInfo.DeductibleYn!='' && data.Result?.IccAirCargoAirInfo.DeductibleYn!=null && data.Result?.IccAirCargoAirInfo.DeductibleYn!='string'){
              this.dedet11=data.Result?.IccAirCargoAirInfo.DeductibleYn;
            }
            else{
              this.dedet11='N';
            }
          }
          if(data.Result?.IccAirCargoAllRisksInfo){
            this.icc_12=data.Result?.IccAirCargoAllRisksInfo;
            if(data.Result?.IccAirCargoAllRisksInfo.DeductibleYn!='' && data.Result?.IccAirCargoAllRisksInfo.DeductibleYn!=null && data.Result?.IccAirCargoAllRisksInfo.DeductibleYn!='string'){
              this.dedet12=data.Result?.IccAirCargoAllRisksInfo.DeductibleYn;
            }
            else{
              this.dedet12='N';
            }
          }
          if(data.Result?.CoverageReferralInfo){
            this.icc_13=data.Result?.CoverageReferralInfo;
            if(data.Result?.CoverageReferralInfo.DeductibleYn!='' && data.Result?.CoverageReferralInfo.DeductibleYn!=null && data.Result?.CoverageReferralInfo.DeductibleYn!='string'){
              this.dedet13=data.Result?.CoverageReferralInfo.DeductibleYn;
            }
            else{
              this.dedet13='N';
            } 
          }
          if(data.Result?.AllRisksSeaAndLandInfo){
            this.icc_14=data.Result?.AllRisksSeaAndLandInfo;
            if(data.Result?.AllRisksSeaAndLandInfo.DeductibleYn!='' && data.Result?.AllRisksSeaAndLandInfo.DeductibleYn!=null && data.Result?.AllRisksSeaAndLandInfo.DeductibleYn!='string'){
              this.dedet14=data.Result?.AllRisksSeaAndLandInfo.DeductibleYn;
            }
            else{
              this.dedet14='N';
            } 
          }
          if(data.Result?.AllRisksSeaAndAirInfo){
            this.icc_15=data.Result?.AllRisksSeaAndAirInfo;
            if(data.Result?.AllRisksSeaAndAirInfo.DeductibleYn!='' && data.Result?.AllRisksSeaAndAirInfo.DeductibleYn!=null && data.Result?.AllRisksSeaAndAirInfo.DeductibleYn!='string'){
              this.dedet15=data.Result?.AllRisksSeaAndAirInfo.DeductibleYn;
            }
            else{
              this.dedet15='N';
            } 
          }
          if(data.Result?.AllRisksParcelPostAirInfo){
            this.icc_16=data.Result?.AllRisksParcelPostAirInfo;
            if(data.Result?.AllRisksParcelPostAirInfo.DeductibleYn!='' && data.Result?.AllRisksParcelPostAirInfo.DeductibleYn!=null && data.Result?.AllRisksParcelPostAirInfo.DeductibleYn!='string'){
              this.dedet16=data.Result?.AllRisksParcelPostAirInfo.DeductibleYn;
            }
            else{
              this.dedet16='N';
            } 
          }
          if(data.Result?.AllRisksLandTransitLandInfo){
            this.icc_17=data.Result?.AllRisksLandTransitLandInfo;
            if(data.Result?.AllRisksLandTransitLandInfo.DeductibleYn!='' && data.Result?.AllRisksLandTransitLandInfo.DeductibleYn!=null && data.Result?.AllRisksLandTransitLandInfo.DeductibleYn!='string'){
              this.dedet17=data.Result?.AllRisksLandTransitLandInfo.DeductibleYn;
            }
            else{
              this.dedet17='N';
            } 
          }
          if(data.Result?.AllRisksAirSeaLandInfo){
            this.icc_18=data.Result?.AllRisksAirSeaLandInfo;
            if(data.Result?.AllRisksAirSeaLandInfo.DeductibleYn!='' && data.Result?.AllRisksAirSeaLandInfo.DeductibleYn!=null && data.Result?.AllRisksAirSeaLandInfo.DeductibleYn!='string'){
              this.dedet18=data.Result?.AllRisksAirSeaLandInfo.DeductibleYn;
            }
            else{
              this.dedet18='N';
            } 
          } 
          if(data.Result?.AllRisksAirAndLandInfo){
            this.icc_19=data.Result?.AllRisksAirAndLandInfo;
            if(data.Result?.AllRisksAirAndLandInfo.DeductibleYn!='' && data.Result?.AllRisksAirAndLandInfo.DeductibleYn!=null && data.Result?.AllRisksAirAndLandInfo.DeductibleYn!='string'){
              this.dedet19=data.Result?.AllRisksAirAndLandInfo.DeductibleYn;
            }
            else{
              this.dedet19='N';
            } 
          }
          //this.commodityForm.controls['ModeOfTransportId'].setValue(commodityForm.ModeOfTransportId);
          this.commodityForm.controls['CommodityName'].setValue(commodityForm.CommodityName);
          this.commodityForm.controls['CommodityRate'].setValue(commodityForm.CommodityRate);
          this.commodityForm.controls['CoreApplicationCode'].setValue(commodityForm.CoreApplicationCode);
          this.commodityForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(commodityForm.EffectiveDate));
          this.commodityForm.controls['remarks'].setValue(commodityForm.Remarks);
          this.commodityForm.controls['status'].setValue(commodityForm.Status);
          //this.commodityForm.controls['Clauses'].setValue(commodityForm.icc_a.ClausesInfo);
           //console.log('kkkkkkkkkkk',this.commodityForm.controls['Clauses'].setValue(commodityForm.icc_a.ClausesInfo))
          //this.commodityForm.controls['Exclusion1'].setValue(commodityForm.icc_a.ExclusionInfo);
          //this.commodityForm.controls['Warranty1'].setValue(commodityForm.icc_a.WarrantyInfo);
          //this.commodityForm.controls['War1'].setValue(commodityForm.icc_a.WarInfo);
          //this.commodityForm.controls['Clauses'].setValue(this.icc_a.ClausesInfo) 
  
              if(this.icc_a){
          let Clau:any[]=[];let Clauses1:any ='';let Warranty1:any ='';let War1:any='';let Exclusion1:any='';
          if(this.icc_a.ClausesInfo!="string" && this.icc_a.ClausesInfo!='' &&this.icc_a.ClausesInfo!=null){
            this.commodityForm.controls['Clauses'].setValue(this.icc_a.ClausesInfo);
          } 
          else this.commodityForm.controls['Clauses'].setValue('');
          if(this.icc_a.WarrantyInfo!="string" && this.icc_a.WarrantyInfo!='' &&this.icc_a.WarrantyInfo!=null){
            this.commodityForm.controls['Warranty1'].setValue(this.icc_a.WarrantyInfo);
          }
          else this.commodityForm.controls['Warranty1'].setValue('');
          if(this.icc_a.WarInfo!="string" && this.icc_a.WarInfo!='' &&this.icc_a.WarInfo!=null){
            this.commodityForm.controls['War1'].setValue(this.icc_a.WarInfo);  
          }
          else this.commodityForm.controls['War1'].setValue('');
          if(this.icc_a.ExclusionInfo!="string" && this.icc_a.ExclusionInfo!='' &&this.icc_a.ExclusionInfo!=null){
            this.commodityForm.controls['Exclusion1'].setValue(this.icc_a.ExclusionInfo);
          }
          else this.commodityForm.controls['Exclusion1'].setValue('');
          this.commodityForm.controls['dedet1'].setValue(this.de1);
              }
              if(this.icc_b){
                  let Clau:any[]=[];let Clauses1:any ='';let Warranty1:any ='';let War1:any='';let Exclusion1:any='';
                  console.log('kkkkkkkkkkkk',this.icc_b.ClausesInfo)
                  if(this.icc_b.ClausesInfo!="string" && this.icc_b.ClausesInfo!='' &&this.icc_b.ClausesInfo!=null){
                    this.commodityForm.controls['Clauses2'].setValue(this.icc_b.ClausesInfo);
                  }
                  else this.commodityForm.controls['Clauses2'].setValue(Clauses1);
                  if(this.icc_b.WarrantyInfo!="string" && this.icc_b.WarrantyInfo!='' &&this.icc_b.WarrantyInfo!=null){
                    this.commodityForm.controls['Warranty2'].setValue(this.icc_b.WarrantyInfo);
                  }
                  else this.commodityForm.controls['Warranty2'].setValue(Warranty1)
                  if(this.icc_b.WarInfo!="string" && this.icc_b.WarInfo!='' &&this.icc_b.WarInfo!=null){
                    this.commodityForm.controls['War2'].setValue(this.icc_b.WarInfo);
                  }
                  else this.commodityForm.controls['War2'].setValue('')
                  if(this.icc_b.ExclusionInfo!="string" && this.icc_b.ExclusionInfo!='' &&this.icc_b.ExclusionInfo!=null){
                    this.commodityForm.controls['Exclusion2'].setValue(this.icc_b.ExclusionInfo);
                  }
                  else this.commodityForm.controls['Exclusion2'].setValue('')
                  this.commodityForm.controls['dedet2'].setValue(this.de2);
              }   
              if(this.icc_c){
                let Clau:any[]=[];let Clauses1:any ='';let Warranty1:any ='';let War1:any='';let Exclusion1:any='';
                console.log('kkkkkkkkkkkk',this.icc_c.ClausesInfo)
                if(this.icc_c.ClausesInfo!="string" && this.icc_c.ClausesInfo!='' &&this.icc_c.ClausesInfo!=null){
                  Clauses1 = this.icc_c.ClausesInfo;
                }
                if(this.icc_c.WarrantyInfo!="string" && this.icc_c.WarrantyInfo!='' &&this.icc_c.WarrantyInfo!=null){
                  Warranty1 = this.icc_c.WarrantyInfo;
                }
                if(this.icc_c.WarInfo!="string" && this.icc_c.WarInfo!='' &&this.icc_c.WarInfo!=null){
                  War1 = this.icc_c.WarInfo
                }
                if(this.icc_c.ExclusionInfo!="string" && this.icc_c.ExclusionInfo!='' &&this.icc_c.ExclusionInfo!=null){
                  Exclusion1 = this.icc_c.ExclusionInfo
                }
                this.commodityForm.controls['Clauses3'].setValue(Clauses1);
                this.commodityForm.controls['dedet3'].setValue(this.dedet3);
                this.commodityForm.controls['Warranty3'].setValue(Warranty1);
                this.commodityForm.controls['War3'].setValue(War1);
                this.commodityForm.controls['Exclusion3'].setValue(Exclusion1);
              }    
                if(this.icc_4){
                  let Clau:any[]=[];let Clauses1:any ='';let Warranty1:any ='';let War1:any='';let Exclusion1:any='';
                
                if(this.icc_4.ClausesInfo!="string" && this.icc_4.ClausesInfo!='' &&this.icc_4.ClausesInfo!=null){
                    Clauses1 = this.icc_4.ClausesInfo
                }
                if(this.icc_4.WarrantyInfo!="string" && this.icc_4.WarrantyInfo!='' &&this.icc_4.WarrantyInfo!=null){
                    Warranty1 = this.icc_4.WarrantyInfo
                }
                if(this.icc_4.WarInfo!="string" && this.icc_4.WarInfo!='' &&this.icc_4.WarInfo!=null){
                    War1 = this.icc_4.WarInfo
                }
                if(this.icc_4.ExclusionInfo!="string" && this.icc_4.ExclusionInfo!='' &&this.icc_4.ExclusionInfo!=null){
                  Exclusion1 = this.icc_4.ExclusionInfo
                }
                  this.commodityForm.controls['Clauses4'].setValue(Clauses1);
                  this.commodityForm.controls['dedet4'].setValue(this.dedet4);
                  this.commodityForm.controls['Warranty4'].setValue(Warranty1);
                  this.commodityForm.controls['War4'].setValue(War1);
                  this.commodityForm.controls['Exclusion4'].setValue(Exclusion1);
              }  
              if(this.icc_5){
                    let Clau:any[]=[];let Clauses1:any ='';let Warranty1:any ='';let War1:any='';let Exclusion1:any='';
                  if(this.icc_5.ClausesInfo!="string" && this.icc_5.ClausesInfo!='' &&this.icc_5.ClausesInfo!=null){
                      Clauses1 = this.icc_5.ClausesInfo
                  }
                if(this.icc_5.WarrantyInfo){
                  for (let index = 0; index < this.icc_5.WarrantyInfo.length; index++) {
                    const element = this.icc_5.WarrantyInfo;
                    console.log('ccccllllll',element)
                      Warranty1 =element;
                  }
                }
                if(this.icc_5.WarInfo){
                  for (let index = 0; index < this.icc_5.WarInfo.length; index++) {
                    const element = this.icc_5.WarInfo;
                      War1 = element;
                  }
                    
                }
                if(this.icc_5.ExclusionInfo){
                  for (let index = 0; index < this.icc_5.ExclusionInfo.length; index++) {
                    const element = this.icc_5.ExclusionInfo;
                    //console.log('ccccllllll',element)
                      Exclusion1 = element;
                  }
                }
                  this.commodityForm.controls['Clauses5'].setValue(Clauses1);
                  this.commodityForm.controls['dedet5'].setValue(this.dedet5);
                this.commodityForm.controls['Warranty5'].setValue(Warranty1);
              this.commodityForm.controls['War5'].setValue(War1);
            this.commodityForm.controls['Exclusion5'].setValue(Exclusion1);
               }  
              if(this.icc_6){
                      let Clau:any[]=[];let Clauses1:any ='';let Warranty1:any ='';let War1:any='';let Exclusion1:any='';
                    console.log('kkkkkkkkkkkk',this.icc_6.ClausesInfo)
                    if(this.icc_6.ClausesInfo){
                    for (let index = 0; index < this.icc_6.ClausesInfo.length; index++) {
                      const element = this.icc_6.ClausesInfo;
                      console.log('ccccllllll',element)
                       Clauses1 = element;
                      
                    }
                  }
                  if(this.icc_6.WarrantyInfo){
                    for (let index = 0; index < this.icc_6.WarrantyInfo.length; index++) {
                      const element = this.icc_6.WarrantyInfo;
                      console.log('ccccllllll',element)
                        Warranty1 =element;
                    }
                  }
                  if(this.icc_6.WarInfo){
                    for (let index = 0; index < this.icc_6.WarInfo.length; index++) {
                      const element = this.icc_6.WarInfo;
                        War1 = element;
                    }
                      
                  }
                  if(this.icc_6.ExclusionInfo){
                    for (let index = 0; index < this.icc_6.ExclusionInfo.length; index++) {
                      const element = this.icc_6.ExclusionInfo;
                      //console.log('ccccllllll',element)
                        Exclusion1 = element;
                    }
                  }
                    this.commodityForm.controls['Clauses6'].setValue(this.icc_6.ClausesInfo);
                    this.commodityForm.controls['dedet6'].setValue(this.dedet6);
                    this.commodityForm.controls['Warranty6'].setValue(Warranty1);
                    this.commodityForm.controls['War6'].setValue(War1);
                    this.commodityForm.controls['Exclusion6'].setValue(Exclusion1);
              }  
              if(this.icc_7){
                        let Clau:any[]=[];let Clauses1:any ='';let Warranty1:any ='';let War1:any='';let Exclusion1:any='';
                      console.log('kkkkkkkkkkkk',this.icc_7.ClausesInfo)
                      if(this.icc_7.ClausesInfo){
                      for (let index = 0; index < this.icc_7.ClausesInfo.length; index++) {
                        const element = this.icc_7.ClausesInfo;
                        console.log('ccccllllll',element)
                         Clauses1 = element;
                        
                      }
                    }
                    if(this.icc_7.WarrantyInfo){
                      for (let index = 0; index < this.icc_7.WarrantyInfo.length; index++) {
                        const element = this.icc_7.WarrantyInfo;
                        console.log('ccccllllll',element)
                          Warranty1 =element;
                      }
                    }
                    if(this.icc_7.WarInfo){
                      for (let index = 0; index < this.icc_7.WarInfo.length; index++) {
                        const element = this.icc_7.WarInfo;
                          War1 = element;
                      }
                        
                    }
                    if(this.icc_7.ExclusionInfo){
                      for (let index = 0; index < this.icc_7.ExclusionInfo.length; index++) {
                        const element = this.icc_7.ExclusionInfo;
                        //console.log('ccccllllll',element)
                          Exclusion1 = element;
                      }
                    }
                      this.commodityForm.controls['Clauses7'].setValue(Clauses1);
                      this.commodityForm.controls['dedet7'].setValue(this.dedet7);
                      this.commodityForm.controls['Warranty7'].setValue(Warranty1);
                      this.commodityForm.controls['War7'].setValue(War1);
                      this.commodityForm.controls['Exclusion7'].setValue(Exclusion1);
              }  
              if(this.icc_8){
                          let Clau:any[]=[];let Clauses1:any ='';let Warranty1:any ='';let War1:any='';let Exclusion1:any='';
                        console.log('kkkkkkkkkkkk',this.icc_8.ClausesInfo)
                        if(this.icc_8.ClausesInfo){
                        for (let index = 0; index < this.icc_8.ClausesInfo.length; index++) {
                          const element = this.icc_8.ClausesInfo;
                          console.log('ccccllllll',element)
                           Clauses1 = element;
                          
                        }
                      }
                      if(this.icc_8.WarrantyInfo){
                        for (let index = 0; index < this.icc_8.WarrantyInfo.length; index++) {
                          const element = this.icc_8.WarrantyInfo;
                          console.log('ccccllllll',element)
                            Warranty1 =element;
                        }
                      }
                      if(this.icc_8.WarInfo){
                        for (let index = 0; index < this.icc_8.WarInfo.length; index++) {
                          const element = this.icc_8.WarInfo;
                            War1 = element;
                        }
                          
                      }
                      if(this.icc_8.ExclusionInfo){
                        for (let index = 0; index < this.icc_8.ExclusionInfo.length; index++) {
                          const element = this.icc_8.ExclusionInfo;
                          //console.log('ccccllllll',element)
                            Exclusion1 = element;
                        }
                      }
                        this.commodityForm.controls['Clauses8'].setValue(Clauses1);
                        this.commodityForm.controls['dedet8'].setValue(this.dedet8);
                      this.commodityForm.controls['Warranty8'].setValue(Warranty1);
                    this.commodityForm.controls['War8'].setValue(War1);
                  this.commodityForm.controls['Exclusion8'].setValue(Exclusion1);
              }  
              if(this.icc_9){
                            let Clau:any[]=[];let Clauses1:any ='';let Warranty1:any ='';let War1:any='';let Exclusion1:any='';
                          console.log('kkkkkkkkkkkk',this.icc_9.ClausesInfo)
                          if(this.icc_9.ClausesInfo){
                          for (let index = 0; index < this.icc_9.ClausesInfo.length; index++) {
                            const element = this.icc_9.ClausesInfo;
                            console.log('ccccllllll',element)
                             Clauses1 = element;
                            
                          }
                        }
                        if(this.icc_9.WarrantyInfo){
                          for (let index = 0; index < this.icc_9.WarrantyInfo.length; index++) {
                            const element = this.icc_9.WarrantyInfo;
                            console.log('ccccllllll',element)
                              Warranty1 =element;
                          }
                        }
                        if(this.icc_9.WarInfo){
                          for (let index = 0; index < this.icc_9.WarInfo.length; index++) {
                            const element = this.icc_9.WarInfo;
                              War1 = element;
                          }
                            
                        }
                        if(this.icc_9.ExclusionInfo){
                          for (let index = 0; index < this.icc_9.ExclusionInfo.length; index++) {
                            const element = this.icc_9.ExclusionInfo;
                            //console.log('ccccllllll',element)
                              Exclusion1 = element;
                          }
                        }
                          this.commodityForm.controls['Clauses9'].setValue(Clauses1);
                          this.commodityForm.controls['dedet9'].setValue(this.dedet9);
                          this.commodityForm.controls['Warranty9'].setValue(Warranty1);
                          this.commodityForm.controls['War9'].setValue(War1);
                          this.commodityForm.controls['Exclusion9'].setValue(Exclusion1);
              }  
              if(this.icc_10){
                              let Clau:any[]=[];let Clauses1:any ='';let Warranty1:any ='';let War1:any='';let Exclusion1:any='';
                            console.log('kkkkkkkkkkkk',this.icc_10.ClausesInfo)
                            if(this.icc_10.ClausesInfo){
                            for (let index = 0; index < this.icc_10.ClausesInfo.length; index++) {
                              const element = this.icc_10.ClausesInfo;
                              console.log('ccccllllll',element)
                               Clauses1 = element;
                              
                            }
                          }
                          if(this.icc_10.WarrantyInfo){
                            for (let index = 0; index < this.icc_10.WarrantyInfo.length; index++) {
                              const element = this.icc_10.WarrantyInfo;
                              console.log('ccccllllll',element)
                                Warranty1 =element;
                            }
                          }
                          if(this.icc_10.WarInfo){
                            for (let index = 0; index < this.icc_10.WarInfo.length; index++) {
                              const element = this.icc_10.WarInfo;
                                War1 = element;
                            }
                              
                          }
                          if(this.icc_10.ExclusionInfo){
                            for (let index = 0; index < this.icc_10.ExclusionInfo.length; index++) {
                              const element = this.icc_10.ExclusionInfo;
                              //console.log('ccccllllll',element)
                                Exclusion1 = element;
                            }
                          }
                            this.commodityForm.controls['Clauses10'].setValue(Clauses1);
                            this.commodityForm.controls['dedet10'].setValue(this.dedet10);
                          this.commodityForm.controls['Warranty10'].setValue(Warranty1);
                        this.commodityForm.controls['War10'].setValue(War1);
                      this.commodityForm.controls['Exclusion10'].setValue(Exclusion1);
              }
              if(this.icc_11){
                let Clau:any[]=[];let Clauses1:any ='';let Warranty1:any ='';let War1:any='';let Exclusion1:any='';
              if(this.icc_12.ClausesInfo){
                for (let index = 0; index < this.icc_11.ClausesInfo.length; index++) {
                  const element = this.icc_11.ClausesInfo;
                  console.log('ccccllllll',element)
                  Clauses1 = element;
                  
                }
              }
              if(this.icc_11.WarrantyInfo){
                for (let index = 0; index < this.icc_11.WarrantyInfo.length; index++) {
                  const element = this.icc_11.WarrantyInfo;
                  console.log('ccccllllll',element)
                    Warranty1 =element;
                }
              }
              if(this.icc_11.WarInfo){
                for (let index = 0; index < this.icc_11.WarInfo.length; index++) {
                  const element = this.icc_11.WarInfo;
                    War1 = element;
                }
                  
              }
              if(this.icc_11.ExclusionInfo){
                for (let index = 0; index < this.icc_11.ExclusionInfo.length; index++) {
                  const element = this.icc_11.ExclusionInfo;
                  //console.log('ccccllllll',element)
                    Exclusion1 = element;
                }
              }
              this.commodityForm.controls['Clauses11'].setValue(Clauses1);
              this.commodityForm.controls['dedet11'].setValue(this.dedet12);
            this.commodityForm.controls['Warranty11'].setValue(Warranty1);
          this.commodityForm.controls['War11'].setValue(War1);
        this.commodityForm.controls['Exclusion11'].setValue(Exclusion1);
              }
              if(this.icc_12){
                let Clau:any[]=[];let Clauses1:any ='';let Warranty1:any ='';let War1:any='';let Exclusion1:any='';
              if(this.icc_12.ClausesInfo){
                for (let index = 0; index < this.icc_12.ClausesInfo.length; index++) {
                  const element = this.icc_12.ClausesInfo;
                  console.log('ccccllllll',element)
                  Clauses1 = element;
                  
                }
              }
              if(this.icc_12.WarrantyInfo){
                for (let index = 0; index < this.icc_12.WarrantyInfo.length; index++) {
                  const element = this.icc_12.WarrantyInfo;
                  console.log('ccccllllll',element)
                    Warranty1 =element;
                }
              }
              if(this.icc_12.WarInfo){
                for (let index = 0; index < this.icc_12.WarInfo.length; index++) {
                  const element = this.icc_12.WarInfo;
                    War1 = element;
                }
                  
              }
              if(this.icc_12.ExclusionInfo){
                for (let index = 0; index < this.icc_12.ExclusionInfo.length; index++) {
                  const element = this.icc_12.ExclusionInfo;
                  //console.log('ccccllllll',element)
                    Exclusion1 = element;
                }
              }
              this.commodityForm.controls['Clauses12'].setValue(Clauses1);
              this.commodityForm.controls['dedet12'].setValue(this.dedet12);
            this.commodityForm.controls['Warranty12'].setValue(Warranty1);
          this.commodityForm.controls['War12'].setValue(War1);
        this.commodityForm.controls['Exclusion12'].setValue(Exclusion1);
              }
              if(this.icc_14){
                let Clau:any[]=[];let Clauses1:any ='';let Warranty1:any ='';let War1:any='';let Exclusion1:any='';
                            console.log('kkkkkkkkkkkk',this.icc_14.ClausesInfo)
                            if(this.icc_14.ClausesInfo){
                            for (let index = 0; index < this.icc_14.ClausesInfo.length; index++) {
                              const element = this.icc_14.ClausesInfo;
                              console.log('ccccllllll',element)
                               Clauses1 = element;
                              
                            }
                          }
                          if(this.icc_14.WarrantyInfo){
                            for (let index = 0; index < this.icc_14.WarrantyInfo.length; index++) {
                              const element = this.icc_14.WarrantyInfo;
                              console.log('ccccllllll',element)
                                Warranty1 =element;
                            }
                          }
                          if(this.icc_14.WarInfo){
                            for (let index = 0; index < this.icc_14.WarInfo.length; index++) {
                              const element = this.icc_14.WarInfo;
                                War1 = element;
                            }
                              
                          }
                          if(this.icc_14.ExclusionInfo){
                            for (let index = 0; index < this.icc_14.ExclusionInfo.length; index++) {
                              const element = this.icc_14.ExclusionInfo;
                              //console.log('ccccllllll',element)
                                Exclusion1 = element;
                            }
                          }
                            this.commodityForm.controls['Clauses14'].setValue(Clauses1);
                            this.commodityForm.controls['dedet14'].setValue(this.dedet10);
                          this.commodityForm.controls['Warranty14'].setValue(Warranty1);
                        this.commodityForm.controls['War14'].setValue(War1);
                      this.commodityForm.controls['Exclusion14'].setValue(Exclusion1);
              }
              if(this.icc_15){
                let Clau:any[]=[];let Clauses1:any ='';let Warranty1:any ='';let War1:any='';let Exclusion1:any='';
                            console.log('kkkkkkkkkkkk',this.icc_15.ClausesInfo)
                            if(this.icc_15.ClausesInfo){
                            for (let index = 0; index < this.icc_15.ClausesInfo.length; index++) {
                              const element = this.icc_15.ClausesInfo;
                              console.log('ccccllllll',element)
                               Clauses1 = element;
                              
                            }
                          }
                          if(this.icc_15.WarrantyInfo){
                            for (let index = 0; index < this.icc_15.WarrantyInfo.length; index++) {
                              const element = this.icc_15.WarrantyInfo;
                              console.log('ccccllllll',element)
                                Warranty1 =element;
                            }
                          }
                          if(this.icc_15.WarInfo){
                            for (let index = 0; index < this.icc_15.WarInfo.length; index++) {
                              const element = this.icc_14.WarInfo;
                                War1 = element;
                            }
                              
                          }
                          if(this.icc_15.ExclusionInfo){
                            for (let index = 0; index < this.icc_15.ExclusionInfo.length; index++) {
                              const element = this.icc_15.ExclusionInfo;
                              //console.log('ccccllllll',element)
                                Exclusion1 = element;
                            }
                          }
                            this.commodityForm.controls['Clauses15'].setValue(Clauses1);
                            this.commodityForm.controls['dedet15'].setValue(this.dedet10);
                          this.commodityForm.controls['Warranty15'].setValue(Warranty1);
                        this.commodityForm.controls['War15'].setValue(War1);
                      this.commodityForm.controls['Exclusion15'].setValue(Exclusion1);
              }
              if(this.icc_17){
                let Clau:any[]=[];let Clauses1:any ='';let Warranty1:any ='';let War1:any='';let Exclusion1:any='';
                            console.log('kkkkkkkkkkkk',this.icc_17.ClausesInfo)
                            if(this.icc_15.ClausesInfo){
                            for (let index = 0; index < this.icc_17.ClausesInfo.length; index++) {
                              const element = this.icc_17.ClausesInfo;
                              console.log('ccccllllll',element)
                               Clauses1 = element;
                              
                            }
                          }
                          if(this.icc_17.WarrantyInfo){
                            for (let index = 0; index < this.icc_17.WarrantyInfo.length; index++) {
                              const element = this.icc_17.WarrantyInfo;
                              console.log('ccccllllll',element)
                                Warranty1 =element;
                            }
                          }
                          if(this.icc_17.WarInfo){
                            for (let index = 0; index < this.icc_17.WarInfo.length; index++) {
                              const element = this.icc_17.WarInfo;
                                War1 = element;
                            }
                              
                          }
                          if(this.icc_17.ExclusionInfo){
                            for (let index = 0; index < this.icc_17.ExclusionInfo.length; index++) {
                              const element = this.icc_17.ExclusionInfo;
                              //console.log('ccccllllll',element)
                                Exclusion1 = element;
                            }
                          }
                            this.commodityForm.controls['Clauses17'].setValue(Clauses1);
                            this.commodityForm.controls['dedet17'].setValue(this.dedet10);
                          this.commodityForm.controls['Warranty17'].setValue(Warranty1);
                        this.commodityForm.controls['War17'].setValue(War1);
                      this.commodityForm.controls['Exclusion17'].setValue(Exclusion1);
              }
              if(this.icc_18){
                let Clau:any[]=[];let Clauses1:any ='';let Warranty1:any ='';let War1:any='';let Exclusion1:any='';
                            console.log('kkkkkkkkkkkk',this.icc_18.ClausesInfo)
                            if(this.icc_15.ClausesInfo){
                            for (let index = 0; index < this.icc_18.ClausesInfo.length; index++) {
                              const element = this.icc_18.ClausesInfo;
                              console.log('ccccllllll',element)
                               Clauses1 = element;
                              
                            }
                          }
                          if(this.icc_18.WarrantyInfo){
                            for (let index = 0; index < this.icc_18.WarrantyInfo.length; index++) {
                              const element = this.icc_18.WarrantyInfo;
                              console.log('ccccllllll',element)
                                Warranty1 =element;
                            }
                          }
                          if(this.icc_18.WarInfo){
                            for (let index = 0; index < this.icc_18.WarInfo.length; index++) {
                              const element = this.icc_18.WarInfo;
                                War1 = element;
                            }
                              
                          }
                          if(this.icc_18.ExclusionInfo){
                            for (let index = 0; index < this.icc_18.ExclusionInfo.length; index++) {
                              const element = this.icc_18.ExclusionInfo;
                              //console.log('ccccllllll',element)
                                Exclusion1 = element;
                            }
                          }
                            this.commodityForm.controls['Clauses18'].setValue(Clauses1);
                            this.commodityForm.controls['dedet18'].setValue(this.dedet10);
                          this.commodityForm.controls['Warranty18'].setValue(Warranty1);
                        this.commodityForm.controls['War18'].setValue(War1);
                      this.commodityForm.controls['Exclusion18'].setValue(Exclusion1);
              }
        }
          
      }
    )
  }



  checkUWValues(rowData,isChecked){
    console.log('hhhhhhhh',isChecked);

    //this.handleSelected(rowData);
//return rowData.isChecked == this.commodityForm.controls['Clauses'];
//return rowData.isChecked == isChecked.true
  }
  checkWValues(rowData,isChecked){
    console.log('hhhhhhhh',isChecked)
    //this.handleSelected(rowData);
   return rowData.isChecked == this.commodityForm.controls['Warranty1'];
  }

  getWarrantyList() {
    let ReqObj = {
      "BranchCode": this.branchCode
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/commodity/warranty`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        if (data.Result) {
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

        if (data.Result) {
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
        if (data.Result) {
          this.War=data.Result;
          if(para=='1'){
            let id
            if(this.commodityForm.controls['War1'].value!=null){
            id = this.commodityForm.controls['War1'].value.split(',');
            this.setWarSelections(id,'WarCover1');
            }
            else{
              id = [];
              this.setWarSelections(id,'WarCover1'); 
            }
            
          }
          if(para=='2'){
            // let id = this.commodityForm.controls['War2'].value.split(',');
            // this.setWarSelections(id,'WarCover2');
            let id
            if(this.commodityForm.controls['War2'].value!=null){
            id = this.commodityForm.controls['War2'].value.split(',');
            this.setWarSelections(id,'WarCover2');
            }
            else{
              id = [];
              this.setWarSelections(id,'WarCover2');
            } 
          }
          if(para=='3'){
            let id
            if(this.commodityForm.controls['War3'].value!=null){
            id = this.commodityForm.controls['War3'].value.split(',');
            this.setWarSelections(id,'WarCover3');
            }
            else{
              id = [];
              this.setWarSelections(id,'WarCover3');
            } 
            // let id = this.commodityForm.controls['War3'].value.split(',');
            // this.setWarSelections(id,'WarCover3');
          }
          if(para=='4'){
            let id
            if(this.commodityForm.controls['War4'].value!=null){
            id = this.commodityForm.controls['War4'].value.split(',');
            this.setWarSelections(id,'WarCover4');
            }
            else{
              id = [];
              this.setWarSelections(id,'WarCover4');
            } 
          //   let id = this.commodityForm.controls['War4'].value.split(',');
          // this.setWarSelections(id,'WarCover4');
        }
          if(para=='5'){
            let id
            if(this.commodityForm.controls['War5'].value!=null){
            id = this.commodityForm.controls['War5'].value.split(',');
            this.setWarSelections(id,'WarCover5');
            }
            else{
              id = [];
              this.setWarSelections(id,'WarCover5');
            } 
          //   let id = this.commodityForm.controls['War5'].value.split(',');
          // this.setWarSelections(id,'WarCover5');
        }
          if(para=='6'){
            let id
            if(this.commodityForm.controls['War6'].value!=null){
            id = this.commodityForm.controls['War6'].value.split(',');
            this.setWarSelections(id,'WarCover6');
            }
            else{
              id = [];
              this.setWarSelections(id,'WarCover6');
            } 
          //   let id = this.commodityForm.controls['War6'].value.split(',');
          // this.setWarSelections(id,'WarCover6');
        }
          if(para=='7'){
            let id
            if(this.commodityForm.controls['War7'].value!=null){
            id = this.commodityForm.controls['War7'].value.split(',');
            this.setWarSelections(id,'WarCover7');
            }
            else{
              id = [];
              this.setWarSelections(id,'WarCover7');
            } 
          //   let id = this.commodityForm.controls['War7'].value.split(',');
          // this.setWarSelections(id,'WarCover7');
          }
          if(para=='8'){
            let id
            if(this.commodityForm.controls['War8'].value!=null){
            id = this.commodityForm.controls['War8'].value.split(',');
            this.setWarSelections(id,'WarCover8');
            }
            else{
              id = [];
              this.setWarSelections(id,'WarCover8');
            } 
          //   let id = this.commodityForm.controls['War7'].value.split(',');
          // this.setWarSelections(id,'WarCover7');
          }
          if(para=='11'){
            let id
            if(this.commodityForm.controls['War11'].value!=null){
            id = this.commodityForm.controls['War11'].value.split(',');
            this.setWarSelections(id,'WarCover11');
            }
            else{
              id = [];
              this.setWarSelections(id,'WarCover11');
            } 
          //   let id = this.commodityForm.controls['War7'].value.split(',');
          // this.setWarSelections(id,'WarCover7');
          }
          if(para=='12'){
          //   let id = this.commodityForm.controls['War9'].value.split(',');
          // this.setWarSelections(id,'WarCover12');
          let id
          if(this.commodityForm.controls['War9'].value!=null){
          id = this.commodityForm.controls['War9'].value.split(',');
          this.setWarSelections(id,'WarCover12');
          }
          else{
            id = [];
            this.setWarSelections(id,'WarCover12');
          } 
        }
          if(para=='13'){
            let id
            if(this.commodityForm.controls['War10'].value!=null){
            id = this.commodityForm.controls['War10'].value.split(',');
            this.setWarSelections(id,'WarCover13');
            }
            else{
              id = [];
              this.setWarSelections(id,'WarCover13');
            } 
          //   let id = this.commodityForm.controls['War10'].value.split(',');
          // this.setWarSelections(id,'WarCover13');
        }
          if(para=='9'){
            let id
            if(this.commodityForm.controls['War12'].value!=null){
            id = this.commodityForm.controls['War12'].value.split(',');
            this.setWarSelections(id,'WarCover9');
            }
            else{
              id = [];
              this.setWarSelections(id,'WarCover9');
            } 
          //   let id = this.commodityForm.controls['War12'].value.split(',');
          // this.setWarSelections(id,'WarCover9');
        }
          if(para=='15'){
            let id
            if(this.commodityForm.controls['War15'].value!=null){
            id = this.commodityForm.controls['War15'].value.split(',');
            this.setWarSelections(id,'WarCover15');
            }
            else{
              id = [];
              this.setWarSelections(id,'WarCover15');
            } 
          //   let id = this.commodityForm.controls['War14'].value.split(',');
          // this.setWarSelections(id,'WarCover15');
        }
          if(para=='14'){
            let id
            if(this.commodityForm.controls['War14'].value!=null){
            id = this.commodityForm.controls['War14'].value.split(',');
            this.setWarSelections(id,'WarCover14');
            }
            else{
              id = [];
              this.setWarSelections(id,'WarCover14');
            } 
          //   let id = this.commodityForm.controls['War15'].value.split(',');
          // this.setWarSelections(id,'WarCover14');
        }
          if(para=='17'){
            let id
            if(this.commodityForm.controls['War17'].value!=null){
            id = this.commodityForm.controls['War17'].value.split(',');
            this.setWarSelections(id,'WarCover17');
            }
            else{
              id = [];
              this.setWarSelections(id,'WarCover17');
            } 
            }
          //   let id = this.commodityForm.controls['War18'].value.split(',');
          // this.setWarSelections(id,'WarCover17');
          if(para=='10'){
            let id
            if(this.commodityForm.controls['War11'].value!=null){
            id = this.commodityForm.controls['War11'].value.split(',');
            this.setWarSelections(id,'WarCover10');
            }
            else{
              id = [];
              this.setWarSelections(id,'WarCover10');} 
            }
          if(para=='18'){
            let id
            if(this.commodityForm.controls['War18'].value!=null){
            id = this.commodityForm.controls['War18'].value.split(',');
            this.setWarSelections(id,'WarCover18');
            }
            else{
              id = [];
              this.setWarSelections(id,'WarCover18');} 
            }
            //let id = this.commodityForm.controls['War11'].value.split(',');
          //this.setWarSelections(id,'WarCover10');}
        }
        else{
          let type: NbComponentStatus = 'danger';
          const config = {
            status: type,
            destroyByClick: true,
            duration: 4000,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            preventDuplicates: false,
          };
          this.toastrService.show(
            'War',
            'No Data Available',
            config);
        }

        // if (data.Message === "Success") {
        //     this.War=data.Result;
        //     this.War = this.War.map(x => ({
        //       isChecked: false,
        //       ...x
        //     }));
        //     if(para=='1'){this.openDialogWithoutRef('WarCover1')} 
        //     if(para=='2'){this.openDialogWithoutRef('WarCover2')}
        //     if(para=='3'){this.openDialogWithoutRef('WarCover3')}
        //     if(para=='4'){this.openDialogWithoutRef('WarCover4')}
        //     if(para=='5'){this.openDialogWithoutRef('WarCover5')}
        //     if(para=='6'){this.openDialogWithoutRef('WarCover6')}
        //     if(para=='7'){this.openDialogWithoutRef('WarCover7')}
        //     if(para=='8'){this.openDialogWithoutRef('WarCover8')}
        //     if(para=='12'){this.openDialogWithoutRef('WarCover12')}
        //     if(para=='13'){this.openDialogWithoutRef('WarCover13')}
        //     if(para=='9'){this.openDialogWithoutRef('WarCover9')}
        //     if(para=='10'){this.openDialogWithoutRef('WarCover10')}
        //     if(para=='11'){this.openDialogWithoutRef('WarCover11')}
        //     if(para=='14'){this.openDialogWithoutRef('WarCover14')}
        //     if(para=='15'){this.openDialogWithoutRef('WarCover15')}
        //     if(para=='16'){this.openDialogWithoutRef('WarCover16')}
        //     if(para=='17'){this.openDialogWithoutRef('WarCover17')}
        //     if(para=='18'){this.openDialogWithoutRef('WarCover18')}
        //     //this.opendialog('WarCover')
        // }
        

      }, (err) => { }
    )
  }
  
  setWarranties(type){
      let value = this.commodityForm.controls[type].value;
      if(value!=null && value!='' && value!=undefined){
       
        let id = this.commodityForm.controls[type].value.split(',');
        this.setWarrantiesSelection(id,type);
      }
      else{
        this.setWarrantiesSelection([],type);
      }
  }
  onUpdateCoverages(){
    this.finalSelectedCovers = "";
    if(this.selectedCoverList.length!=0){
      let i=0;
      if(this.selectedCoverList.length==1){
        this.finalSelectedCovers=this.selectedCoverList[0];
        this.close();
      }
      else{
        for(let cover of this.selectedCoverList){
              if(i==0){this.finalSelectedCovers=cover;i+=1;}
              else{this.finalSelectedCovers=this.finalSelectedCovers+','+cover; i+=1;}
              if(i==this.selectedCoverList.length){
                this.close();
              }
        } 
      }
    }
    console.log("Final Selected Covers",this.selectedCoverList,this.finalSelectedCovers)
  }
  onSelectcover(rowData){
      let entry = this.selectedCoverList.some(ele=>ele==rowData.CoverId);
      if(entry){
          let index = this.selectedCoverList.findIndex(ele=>ele==rowData.CoverId);
          this.selectedCoverList.splice(index,1);
      }
      else{
        this.selectedCoverList.push(rowData.CoverId);
      }
  }
  setWarrantiesSelection(data,type){
    if(data.length!=0){
      if(this.Warranty.length!=0){
        let i=0;
        for(let warranty of this.Warranty){
          console.log('Warranty1',warranty)
              let entry = data.some(ele=>ele==warranty.WarrantyId);
              warranty['isChecked']=entry;
              i+=1;
              if(i==this.Warranty.length)  this.openDialogWithoutRef(type)
        }
      }
      else  this.openDialogWithoutRef(type)
    }
    else{
      if(this.Warranty.length!=0){
        let i=0;
        for(let warranty of this.Warranty){
          warranty['isChecked'] = false;
          i+=1;
          if(i==this.Warranty.length){
            this.openDialogWithoutRef(type)
          }
        }
      }
      else this.openDialogWithoutRef(type);
    } 
  }



  setExclusion(type){
    let value = this.commodityForm.controls[type].value;
    if(value!=null && value!='' && value!=undefined){
      let id = this.commodityForm.controls[type].value.split(',');
      this.setExclusionSelection(id,type);
    }
    else{
      let id=[]
      this.setExclusionSelection(id,type);
    }
}
setExclusionSelection(data,type){
  if(data.length!=0){
    if(this.Exclusion.length!=0){
      let i=0;
      for(let warranty of this.Exclusion){
        console.log('Warranty1',warranty)
            let entry = data.some(ele=>ele==warranty.ExclusionId);
            warranty['isChecked']=entry;
            i+=1;
            if(i==this.Exclusion.length)  this.openDialogWithoutRef(type)
      }
    }
    else  this.openDialogWithoutRef(type)
  }
  else if(this.Exclusion.length!=0){
    let i=0;
    for(let exclusion of this.Exclusion){
      exclusion['isChecked'] = false;
      i+=1;
      if(i==this.Exclusion.length){
        this.openDialogWithoutRef(type)
      }
    }
  }
  else this.openDialogWithoutRef(type)
}


setWars(type){
  let value = this.commodityForm.controls[type].value;
  if(value!=null && value!='' && value!=undefined){
    let id = this.commodityForm.controls[type].value.split(',');
    this.setWarsSelection(id,type);
  }
  else {
    let id=[]
  this.setWarsSelection(id,type);
}
}
setWarsSelection(data,type){
if(data.length!=0){
  if(this.War.length!=0){
    let i=0;
    for(let warranty of this.War){
      console.log('Warranty1',warranty)
          let entry = data.some(ele=>ele==warranty.WarId);
          warranty['isChecked']=entry;
          i+=1;
          if(i==this.War.length)  this.openDialogWithoutRef(type)
    }
  }
  else  this.openDialogWithoutRef(type)
}
else this.openDialogWithoutRef(type)
}




  getClauses(no){
    let ReqObj = {
      "BranchCode": this.branchCode,
      "CoverId":no
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/commodity/clauses`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        if (data.Result) {
            this.Clauses=data.Result;
            if(no=='1'){
              let id
            if(this.commodityForm.controls['Clauses'].value!=null){
            id = this.commodityForm.controls['Clauses'].value.split(',');
            this.setClausesSelection(id,'export1');
            }
            else{
              id = [];
              this.setClausesSelection(id,'export1'); 
            }
            
              // let id = this.commodityForm.controls['Clauses'].value.split(',');
              // this.setClausesSelection(id,'export1');
            }
            if(no=='2'){
              let id
              if(this.commodityForm.controls['Clauses2'].value!=null){
              id = this.commodityForm.controls['Clauses2'].value.split(',');
              this.setClausesSelection(id,'export2');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export2'); 
              }
              // let id = this.commodityForm.controls['Clauses2'].value.split(',');
              // this.setClausesSelection(id,'export2');
            }
            if(no=='3'){
              let id
              if(this.commodityForm.controls['Clauses3'].value!=null){
              id = this.commodityForm.controls['Clauses3'].value.split(',');
              this.setClausesSelection(id,'export3');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export3'); 
              }
              // let id = this.commodityForm.controls['Clauses3'].value.split(',');
              // this.setClausesSelection(id,'export3');
            }
            if(no=='4'){
            //   let id = this.commodityForm.controls['Clauses4'].value.split(',');
            // this.setClausesSelection(id,'export4');
            let id
            if(this.commodityForm.controls['Clauses4'].value!=null){
            id = this.commodityForm.controls['Clauses4'].value.split(',');
            this.setClausesSelection(id,'export4');
            }
            else{
              id = [];
              this.setClausesSelection(id,'export4'); 
            }
          }
            if(no=='5'){
              let id
              if(this.commodityForm.controls['Clauses5'].value!=null){
              id = this.commodityForm.controls['Clauses5'].value.split(',');
              this.setClausesSelection(id,'export5');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export5'); 
              }
            //   let id = this.commodityForm.controls['Clauses5'].value.split(',');
            // this.setClausesSelection(id,'export5');
          }
            if(no=='6'){
              let id
              if(this.commodityForm.controls['Clauses6'].value!=null){
              id = this.commodityForm.controls['Clauses6'].value.split(',');
              this.setClausesSelection(id,'export6');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export6'); 
              }
            //   let id = this.commodityForm.controls['Clauses6'].value.split(',');
            // this.setClausesSelection(id,'export6');
          }
            if(no=='7'){
              let id
              if(this.commodityForm.controls['Clauses7'].value!=null){
              id = this.commodityForm.controls['Clauses7'].value.split(',');
              this.setClausesSelection(id,'export7');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export7'); 
              }
            //   let id = this.commodityForm.controls['Clauses7'].value.split(',');
            // this.setClausesSelection(id,'export7');
          }
            if(no=='8'){
              let id
              if(this.commodityForm.controls['Clauses8'].value!=null){
              id = this.commodityForm.controls['Clauses8'].value.split(',');
              this.setClausesSelection(id,'export8');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export8'); 
              }
            //   let id = this.commodityForm.controls['Clauses8'].value.split(',');
            // this.setClausesSelection(id,'export8');
          }
            if(no=='12'){
              let id
              if(this.commodityForm.controls['Clauses12'].value!=null){
              id = this.commodityForm.controls['Clauses12'].value.split(',');
              this.setClausesSelection(id,'export12');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export12'); 
              }
            //   let id = this.commodityForm.controls['Clauses12'].value.split(',');
            // this.setClausesSelection(id,'export12');
          }
            if(no=='13'){
              let id
              if(this.commodityForm.controls['Clauses13'].value!=null){
              id = this.commodityForm.controls['Clauses13'].value.split(',');
              this.setClausesSelection(id,'export13');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export13'); 
              }
            //   let id = this.commodityForm.controls['Clauses13'].value.split(',');
            // this.setClausesSelection(id,'export13');
          }
            if(no=='9'){
              let id
              if(this.commodityForm.controls['Clauses9'].value!=null){
              id = this.commodityForm.controls['Clauses9'].value.split(',');
              this.setClausesSelection(id,'export9');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export9'); 
              }
            //   let id = this.commodityForm.controls['Clauses9'].value.split(',');
            // this.setClausesSelection(id,'export9');
          }
            if(no=='10'){
              let id
              if(this.commodityForm.controls['Clauses10'].value!=null){
              id = this.commodityForm.controls['Clauses10'].value.split(',');
              this.setClausesSelection(id,'export10');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export10'); 
              }
            //   let id = this.commodityForm.controls['Clauses10'].value.split(',');
            // this.setClausesSelection(id,'export10');
          }
            if(no=='11'){
              let id
              if(this.commodityForm.controls['Clauses11'].value!=null){
              id = this.commodityForm.controls['Clauses11'].value.split(',');
              this.setClausesSelection(id,'export11');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export11'); 
              }
            //   let id = this.commodityForm.controls['Clauses11'].value.split(',');
            // this.setClausesSelection(id,'export11');
          }
            if(no=='14'){
              let id
              if(this.commodityForm.controls['Clauses14'].value!=null){
              id = this.commodityForm.controls['Clauses14'].value.split(',');
              this.setClausesSelection(id,'export14');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export14'); 
              }
            //   let id = this.commodityForm.controls['Clauses14'].value.split(',');
            // this.setClausesSelection(id,'export14');
          }
            if(no=='15'){
              let id
              if(this.commodityForm.controls['Clauses15'].value!=null){
              id = this.commodityForm.controls['Clauses15'].value.split(',');
              this.setClausesSelection(id,'export15');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export15'); 
              }
            //   let id = this.commodityForm.controls['Clauses15'].value.split(',');
            // this.setClausesSelection(id,'export15');
          }
            if(no=='16'){
              let id
              if(this.commodityForm.controls['Clauses16'].value!=null){
              id = this.commodityForm.controls['Clauses16'].value.split(',');
              this.setClausesSelection(id,'export16');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export16'); 
              }
              // let id = this.commodityForm.controls['Clauses16'].value.split(',');
              // this.setClausesSelection(id,'export16');
            }
            if(no=='17'){
              let id
              if(this.commodityForm.controls['Clauses17'].value!=null){
              id = this.commodityForm.controls['Clauses17'].value.split(',');
              this.setClausesSelection(id,'export17');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export17'); 
              }
            //   let id = this.commodityForm.controls['Clauses17'].value.split(',');
            // this.setClausesSelection(id,'export17');
          }
            if(no=='18'){
              let id
              if(this.commodityForm.controls['Clauses18'].value!=null){
              id = this.commodityForm.controls['Clauses18'].value.split(',');
              this.setClausesSelection(id,'export18');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export18'); 
              }
              // let id = this.commodityForm.controls['Clauses18'].value.split(',');
              // this.setClausesSelection(id,'export18');
            }
            if(no=='19'){
              let id
              if(this.commodityForm.controls['Clauses19'].value!=null){
              id = this.commodityForm.controls['Clauses19'].value.split(',');
              this.setClausesSelection(id,'export19');
              }
              else{
                id = [];
                this.setClausesSelection(id,'export19'); 
              }
              // let id = this.commodityForm.controls['Clauses19'].value.split(',');
              // this.setClausesSelection(id,'export19');
            }
        }
        else{
          let type: NbComponentStatus = 'danger';
          const config = {
            status: type,
            destroyByClick: true,
            duration: 4000,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            preventDuplicates: false,
          };
          this.toastrService.show(
            'Clauses',
            'No Data Available',
            config);
        }
      }, (err) => { }
    )
  }
  setClausesSelection(data,type){
    if(data.length!=0){
      if(this.Clauses.length!=0){
        let i=0;
        for(let clause of this.Clauses){
              let entry = data.some(ele=>ele==clause.ClausesId);
              clause['isChecked']=entry;
              i+=1;
              if(i==this.Clauses.length)  this.openDialogWithoutRef(type)
        }
      }
      else  this.openDialogWithoutRef(type)
    }
    else this.openDialogWithoutRef(type)
  }
  setWarSelections(data,type){
    if(data.length!=0){
      if(this.War.length!=0){
        let i=0;
        for(let clause of this.War){
              let entry = data.some(ele=>ele==clause.WarId);
              clause['isChecked']=entry;
              i+=1;
              if(i==this.War.length)  this.openDialogWithoutRef(type)
        }
      }
      else  this.openDialogWithoutRef(type)
    }
    else this.openDialogWithoutRef(type)
  }
  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
  @ViewChild('firstDialog', { static: true }) firstDialog: TemplateRef<any>;
  openDialogWithoutRef(war: string) {

      console.log('jjjjjjjj',war)
    if (war === 'export1') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion1') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty1') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover1') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    else if (war === 'export2') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion2') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty2') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover2') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }

    else if (war === 'export3') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion3') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty3') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover3') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    if (war === 'export4') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion4') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty4') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover4') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    if (war === 'export5') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion5') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty5') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover5') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    if (war === 'export6') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion6') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty6') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover6') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    else if (war === 'export7') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion7') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty7') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover7') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    else if (war === 'export8') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion8') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty8') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover8') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    if (war === 'export9') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion9') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty9') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover9') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    if (war === 'export10') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion10') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty10') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover10') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    if (war === 'export11') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion11') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty11') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover11') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    if (war === 'export12') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion12') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty12') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover12') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }  if (war === 'export13') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion13') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty13') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover13') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    if (war === 'export14') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion14') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty14') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover14') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    if (war === 'export15') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion15') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty15') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover15') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    if (war === 'export16') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion16') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty16') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover16') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    if (war === 'export17') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion17') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty17') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover17') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    if (war === 'export18') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion18') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty18') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover18') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    if (war === 'export19') {
      this.clickedModal = war;
      this.warrantyData = this.Clauses;
      this.first=true;
       this.second=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Exclusion19') {
      this.clickedModal = war;
      this.warrantyData = this.Exclusion;
      this.second=true;
      this.first=false;
      this.third=false;
      this.four=false;
    }
    else if (war === 'Warranty19') {
      this.clickedModal = war;
      this.warrantyData = this.Warranty;
      this.third=true;
      this.second=false;
      this.first=false;
      this.four=false;
    }
    else if (war === 'WarCover19') {
      this.clickedModal = war;
      this.warrantyData = this.War;
      this.four=true;
      this.third=false;
      this.second=false;
       this.first=false;
    }
    

    this.dialog.open(this.secondDialog);

  }
  checkCoverSelection(rowData){
    return this.selectedCoverList.some(ele=>ele==rowData.CoverId);
  }
  getCoverageList(){
    const ReqObj = {
      'BranchCode': this.branchCode,
    };
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/cover/list`, ReqObj).subscribe(
      (data: any) => {
        if (data?.Message === 'Success') {
          this.coverageList = data.Result;
          this.dialog.open(this.firstDialog)
        }
      },
      (err) => { },
    );
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


  
  /*opendialog(para){
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
   
  }*/

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
      Clauses6:new FormControl(),
      Exclusion6:new FormControl(),
      Warranty6:new FormControl(),
      War6:new FormControl(),
      dedet6:new FormControl('N'),
      Clauses7:new FormControl(),
      Exclusion7:new FormControl(),
      Warranty7:new FormControl(),
      War7:new FormControl(),
      dedet7:new FormControl('N'),
      Clauses8:new FormControl(),
      Exclusion8:new FormControl(),
      Warranty8:new FormControl(),
      War8:new FormControl(),
      dedet8:new FormControl('N'),
      Clauses9:new FormControl(),
      Exclusion9:new FormControl(),
      Warranty9:new FormControl(),
      War9:new FormControl(),
      dedet9:new FormControl('N'),
      Clauses10:new FormControl(),
      Exclusion10:new FormControl(),
      Warranty10:new FormControl(),
      War10:new FormControl(),
      dedet10:new FormControl('N'),
      Clauses11:new FormControl(),
      Exclusion11:new FormControl(),
      Warranty11:new FormControl(),
      War11:new FormControl(),
      dedet11:new FormControl('N'),
      Clauses12:new FormControl(),
      Exclusion12:new FormControl(),
      Warranty12:new FormControl(),
      War12:new FormControl(),
      dedet12:new FormControl('N'),
      Clauses13:new FormControl(),
      Exclusion13:new FormControl(),
      Warranty13:new FormControl(),
      War13:new FormControl(),
      dedet13:new FormControl('N'),
      Clauses14:new FormControl(),
      Exclusion14:new FormControl(),
      Warranty14:new FormControl(),
      War14:new FormControl(),
      dedet14:new FormControl('N'),
      Clauses15:new FormControl(),
      Exclusion15:new FormControl(),
      Warranty15:new FormControl(),
      War15:new FormControl(),
      dedet15:new FormControl('N'),
      Clauses16:new FormControl(),
      Exclusion16:new FormControl(),
      Warranty16:new FormControl(),
      War16:new FormControl(),
      dedet16:new FormControl('N'),
      Clauses17:new FormControl(),
      Exclusion17:new FormControl(),
      Warranty17:new FormControl(),
      War17:new FormControl(),
      dedet17:new FormControl('N'),
      Clauses18:new FormControl(),
      Exclusion18:new FormControl(),
      Warranty18:new FormControl(),
      War18:new FormControl(),
      dedet18:new FormControl('N'),
      Clauses19:new FormControl(),
      Exclusion19:new FormControl(),
      Warranty19:new FormControl(),
      War19:new FormControl(),
      dedet19:new FormControl('N'),
  
    });
  }

  public goBack() {
    this.router.navigateByUrl('/Marine/masters/commodity/view');
  }

  /*onclauses(){
    
  let RegionList= [];let values;let Clauses1=[];let Clauses3=[];
  let Clauses4=[];let Clauses5=[]; let Clauses6=[]; let Clauses7=[];
  let Clauses8=[];let Clauses9=[]; let Clauses10=[]; let List :any[]=[];
  if(this.commodityForm.controls['Clauses'].value!=""){
    let value =this.commodityForm.controls['Clauses'].value
  console.log('kkkkkkk',value);
  for(let i=0;i<=value?.length;i++){
    values=value.split(',')
  }
  if(values?.length!=0){
    let i=0;
      for(let u of values){ 
        console.log('lllllllllllll',u)     
      let entryRegion={"ClausesId":u}    
      RegionList.push(entryRegion);
      i++;
      //if(i==values.length)this.onSave(RegionList)
      //this.AttachedBranches(RegionList);
    }
  }
  }
  if(this.commodityForm.controls['Clauses2'].value!=""){
    let value =this.commodityForm.controls['Clauses2'].value
  console.log('kkkkkkk',value);
  for(let i=0;i<=value?.length;i++){
    values=value.split(',')
  }
  if(values?.length!=0){
    let i=0;
      for(let u of values){ 
        console.log('lllllllllllll',u)     
      let entryRegion={"ClausesId":u}    
      Clauses1.push(entryRegion);
      i++;
     //if(i==values.length)this.onSave(Clauses1)
      //this.AttachedBranches(RegionList);
    }
  }
  }
  if(this.commodityForm.controls['Clauses3'].value!=""){
    let value =this.commodityForm.controls['Clauses3'].value
  console.log('kkkkkkk',value);
  for(let i=0;i<=value?.length;i++){
    values=value.split(',')
  }
  if(values?.length!=0){
    let i=0;
      for(let u of values){ 
        console.log('lllllllllllll',u)     
      let entryRegion={"ClausesId":u}    
      Clauses3.push(entryRegion);
      i++;
      //if(i==values.length)this.onSave(RegionList)
      //this.AttachedBranches(RegionList);
    }
  }
  }
  if(this.commodityForm.controls['Clauses4'].value!=""){
    let value =this.commodityForm.controls['Clauses4'].value
  console.log('kkkkkkk',value);
  for(let i=0;i<=value?.length;i++){
    values=value.split(',')
  }
  if(values?.length!=0){
    let i=0;
      for(let u of values){ 
        console.log('lllllllllllll',u)     
      let entryRegion={"ClausesId":u}    
      Clauses4.push(entryRegion);
      i++;
      //if(i==values.length)this.onSave(RegionList)
      //this.AttachedBranches(RegionList);
    }
  }
  }
  if(this.commodityForm.controls['Clauses5'].value!=""){
    let value =this.commodityForm.controls['Clauses5'].value
  console.log('kkkkkkk',value);
  for(let i=0;i<=value?.length;i++){
    values=value.split(',')
  }
  if(values?.length!=0){
    let i=0;
      for(let u of values){ 
        console.log('lllllllllllll',u)     
      let entryRegion={"ClausesId":u}    
      Clauses5.push(entryRegion);
      i++;
     //if(i==values.length)this.onSave(Clauses1)
      //this.AttachedBranches(RegionList);
    }
  }
  }
  if(this.commodityForm.controls['Clauses6'].value!=""){
    let value =this.commodityForm.controls['Clauses6'].value
  console.log('kkkkkkk',value);
  for(let i=0;i<=value?.length;i++){
    values=value.split(',')
  }
  if(values?.length!=0){
    let i=0;
      for(let u of values){ 
        console.log('lllllllllllll',u)     
      let entryRegion={"ClausesId":u}    
      Clauses6.push(entryRegion);
      i++;
      //if(i==values.length)this.onSave(RegionList)
      //this.AttachedBranches(RegionList);
    }
  }
  }
  if(this.commodityForm.controls['Clauses7'].value!=""){
    let value =this.commodityForm.controls['Clauses7'].value
  console.log('kkkkkkk',value);
  for(let i=0;i<=value?.length;i++){
    values=value.split(',')
  }
  if(values?.length!=0){
    let i=0;
      for(let u of values){ 
        console.log('lllllllllllll',u)     
      let entryRegion={"ClausesId":u}    
      Clauses7.push(entryRegion);
      i++;
      //if(i==values.length)this.onSave(RegionList)
      //this.AttachedBranches(RegionList);
    }
  }
  }
  if(this.commodityForm.controls['Clauses8'].value!=""){
    let value =this.commodityForm.controls['Clauses8'].value
  console.log('kkkkkkk',value);
  for(let i=0;i<=value?.length;i++){
    values=value.split(',')
  }
  if(values?.length!=0){
    let i=0;
      for(let u of values){ 
        console.log('lllllllllllll',u)     
      let entryRegion={"ClausesId":u}    
      Clauses8.push(entryRegion);
      i++;
      //if(i==values.length)this.onSave(RegionList)
      //this.AttachedBranches(RegionList);
    }
  }
  }
  if(this.commodityForm.controls['Clauses9'].value!=""){
    let value =this.commodityForm.controls['Clauses9'].value
  console.log('kkkkkkk',value);
  for(let i=0;i<=value?.length;i++){
    values=value.split(',')
  }
  if(values?.length!=0){
    let i=0;
      for(let u of values){ 
        console.log('lllllllllllll',u)     
      let entryRegion={"ClausesId":u}    
      Clauses9.push(entryRegion);
      i++;
      //if(i==values.length)this.onSave(RegionList)
      //this.AttachedBranches(RegionList);
    }
  }
  }
      console.log('rrrrrrrrrrrrrr',RegionList)
      console.log('jjjjjjjjjjj',Clauses1)
      let commonObj = {
        "ClausesList": RegionList,
        "Clauses1":Clauses1,
        "Clauses2":Clauses3,
        "Clauses3":Clauses4,
        "Clauses4":Clauses5,
        "Clauses5":Clauses6,
        "Clauses6":Clauses7,
        "Clauses7":Clauses8,
        "Clauses8":Clauses9,
      }
      //List = List.concat(RegionList,Clauses1,Clauses3);
      //console.log('jjjjjjjjjj',)
      this.onwarranty(commonObj)   
  }
  onwarranty(commonObj){
    let Warr1= [];let values;let Warr2=[];let Warr3=[];
    let Warr4=[];let Warr5=[]; let Warr6=[]; let Warr7=[];
    let Warr8=[];let Warr9=[]; let Waar10=[]; let List :any[]=[];
    if(this.commodityForm.controls['Warranty1'].value!=""){
      let value =this.commodityForm.controls['Warranty1'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarrrantyId":u}    
        Warr1.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['Warranty2'].value!=""){
      let value =this.commodityForm.controls['Warranty2'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarrrantyId":u}    
        Warr2.push(entryRegion);
        i++;
       //if(i==values.length)this.onSave(Clauses1)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['Warranty3'].value!=""){
      let value =this.commodityForm.controls['Warranty3'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarrrantyId":u}    
        Warr3.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['Warranty4'].value!=""){
      let value =this.commodityForm.controls['Warranty4'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarrrantyId":u}    
        Warr4.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['Warranty5'].value!=""){
      let value =this.commodityForm.controls['Warranty5'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarrrantyId":u}    
        Warr5.push(entryRegion);
        i++;
       //if(i==values.length)this.onSave(Clauses1)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['Warranty6'].value!=""){
      let value =this.commodityForm.controls['Warranty6'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarrrantyId":u}    
         Warr6.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['Warranty7'].value!=""){
      let value =this.commodityForm.controls['Warranty7'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarrrantyId":u}    
        Warr7.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['Warranty8'].value!=""){
      let value =this.commodityForm.controls['Warranty8'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarrrantyId":u}    
        Warr8.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['Warranty9'].value!=""){
      let value =this.commodityForm.controls['Warranty9'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarrrantyId":u}    
        Warr9.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
        let WarrObj = {
          "Warr1": Warr1,
          "Warr2":Warr2,
          "Warr3":Warr3,
          "Warr4":Warr4,
          "Warr5":Warr5,
          "Warr6":Warr6,
          "Warr7":Warr7,
          "Warr8":Warr8,
          "Warr9":Warr9,
        }
        //List = List.concat(RegionList,Clauses1,Clauses3);
        //console.log('jjjjjjjjjj',)
        this.Exclusions(commonObj,WarrObj)      
  }

  Exclusions(commonObj,WarrObj){
    let Exclusion1= [];let values;let Exclusion2=[];let Exclusion3=[];
    let Exclusion4=[];let Exclusion5=[]; let Exclusion6=[]; let Exclusion7=[];
    let Exclsuion8=[];let Exclusion9=[]; let Exclusion10=[]; let List :any[]=[];
    if(this.commodityForm.controls['Exclusion1'].value!=""){
      let value =this.commodityForm.controls['Exclusion1'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"ExclusionId":u}    
        Exclusion1.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['Exclusion2'].value!=""){
      let value =this.commodityForm.controls['Exclusion2'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"ExclusionId":u}    
        Exclusion2.push(entryRegion);
        i++;
       //if(i==values.length)this.onSave(Clauses1)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['Exclusion3'].value!=""){
      let value =this.commodityForm.controls['Exclusion3'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"ExclusionId":u}    
        Exclusion3.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['Exclusion4'].value!=""){
      let value =this.commodityForm.controls['Exclusion4'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"ExclusionId":u}    
        Exclusion4.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['Exclusion5'].value!=""){
      let value =this.commodityForm.controls['Exclusion5'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"ExclusionId":u}    
        Exclusion5.push(entryRegion);
        i++;
       //if(i==values.length)this.onSave(Clauses1)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['Exclusion6'].value!=""){
      let value =this.commodityForm.controls['Exclusion6'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"ExclusionId":u}    
        Exclusion6.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['Exclusion7'].value!=""){
      let value =this.commodityForm.controls['Exclusion7'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"ExclusionId":u}    
        Exclusion7.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['Exclusion8'].value!=""){
      let value =this.commodityForm.controls['Exclusion8'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"ExclusionId":u}    
          Exclsuion8.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['Exclusion9'].value!=""){
      let value =this.commodityForm.controls['Exclusion9'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"ExclusionId":u}    
        Exclusion9.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }

        let ExclusionObj = {
          "ClausesList": Exclusion1,
          "Clauses1":Exclusion2,
          "Clauses2":Exclusion3,
          "Clauses3":Exclusion4,
          "Clauses4":Exclusion5,
          "Clauses5":Exclusion6,
          "Clauses6":Exclusion7,
          "Clauses7":Exclsuion8,
          "Clauses8":Exclusion9,
        }
        this.onwar(commonObj,WarrObj,ExclusionObj)
  }

  onwar(commonObj,WarrObj,ExclusionObj){
    let war1= [];let values;let war2=[];let war3=[];
    let war4=[];let war5=[]; let war6=[]; let war7=[];
    let war8=[];let war9=[]; let war10=[]; let List :any[]=[];
    if(this.commodityForm.controls['War1'].value!=""){
      let value =this.commodityForm.controls['War1'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarId":u}    
        war1.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['War2'].value!=""){
      let value =this.commodityForm.controls['War2'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarId":u}    
        war2.push(entryRegion);
        i++;
       //if(i==values.length)this.onSave(Clauses1)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['War3'].value!=""){
      let value =this.commodityForm.controls['War3'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarId":u}    
        war3.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['War4'].value!=""){
      let value =this.commodityForm.controls['War4'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarId":u}    
        war4.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['War5'].value!=""){
      let value =this.commodityForm.controls['War5'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarId":u}    
        war5.push(entryRegion);
        i++;
       //if(i==values.length)this.onSave(Clauses1)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['War6'].value!=""){
      let value =this.commodityForm.controls['War6'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarId":u}    
        war6.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['War7'].value!=""){
      let value =this.commodityForm.controls['War7'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarId":u}    
        war7.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['War8'].value!=""){
      let value =this.commodityForm.controls['War8'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarId":u}    
        war8.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }
    if(this.commodityForm.controls['War9'].value!=""){
      let value =this.commodityForm.controls['War9'].value
    console.log('kkkkkkk',value);
    for(let i=0;i<=value?.length;i++){
      values=value.split(',')
    }
    if(values?.length!=0){
      let i=0;
        for(let u of values){ 
          console.log('lllllllllllll',u)     
        let entryRegion={"WarId":u}    
        war9.push(entryRegion);
        i++;
        //if(i==values.length)this.onSave(RegionList)
        //this.AttachedBranches(RegionList);
      }
    }
    }

        let warObj = {
          "ClausesList": war1,
          "Clauses1":war2,
          "Clauses2":war3,
          "Clauses3":war4,
          "Clauses4":war5,
          "Clauses5":war6,
          "Clauses6":war7,
          "Clauses7":war8,
          "Clauses8":war9,
        }

        this.onSave(commonObj,WarrObj,ExclusionObj,warObj)
  }*/
onFormSubmit(){
  if(this.finalSelectedCovers=='' || this.finalSelectedCovers==null || this.finalSelectedCovers==undefined){
    this.finalSelectedCovers='';
    this.onSave([]);
  }
  else{
    let splitList = this.finalSelectedCovers.split(',');
    if(splitList.length!=0){
      let i=0;let finalList:any[]=[];
      for(let cover of splitList){
          let entry = {
            "CoverageReferral":cover
          }
          finalList.push(entry);
          i+=1;
          if(i==splitList.length){this.onSave(finalList)}
      }
    }
    else this.onSave([]);
  }
}
 public onSave(finalList){
  let split;let split1; let com
     if(this.commodityId){
     com=this.commodityId
     }
     else{
      com=""
     }

  console.log('EFFFFFFF',this.commodityForm.controls['effectiveDate'])
  let effectiveDate = this.commodityForm.controls['effectiveDate'].value ? moment(new Date(this.commodityForm.controls['effectiveDate'].value)).format('DD/MM/YYYY') : "";
   console.log('EEEEEEEEEE',effectiveDate);
 // this.onclauses(this.commodityForm.controls['Clauses'].value);
  //this.onclauses(this.commodityForm.controls['Clauses2'].value);
  let clauses1 = "",warranty1 ="",Exc1="",War1 ="";let clauses2 ="",warranty2 ="",Exc2="",War2 ="";
  let clauses4 = "",warranty4 ="",Exc4="",War4 ="";let clauses5 ="",warranty5 ="",Exc5="",War5 ="";
  let clauses3 = "",warranty3 ="",Exc3="",War3 ="";let clauses6 ="",warranty6 ="",Exc6="",War6 ="";
  let clauses7 = "",warranty7 ="",Exc7="",War7 ="";let clauses8 ="",warranty8 ="",Exc8="",War8 ="";
  let clauses9 = "",warranty9 ="",Exc9="",War9 ="";let clauses10 ="",warranty10 ="",Exc10="",War10 ="";
  let clauses11 = "",warranty11 ="",Exc11="",War11 ="";let clauses13 ="",warranty13 ="",Exc13="",War13 ="";
  let clauses12 = "",warranty12 ="",Exc12="",War12 ="";let clauses14 ="",warranty14 ="",Exc14="",War14 ="";
  let clauses15 = "",warranty15 ="",Exc15="",War15 ="";let clauses16 ="",warranty16 ="",Exc16="",War16 ="";
  let clauses17 = "",warranty17 ="",Exc17="",War17 ="";let clauses18 ="",warranty18 ="",Exc18="",War18 ="";

  if(this.commodityForm.controls['Clauses'].value!="" || this.commodityForm.controls['Clauses'].value!=undefined ||
  this.commodityForm.controls['Clauses'].value!=null){
    clauses1 = this.commodityForm.controls['Clauses'].value
  }
  if(this.commodityForm.controls['Exclusion1'].value!="" || this.commodityForm.controls['Exclusion1'].value!=undefined ||
  this.commodityForm.controls['Exclusion1'].value!=null){
    Exc1=this.commodityForm.controls['Exclusion1'].value
  }
  if(this.commodityForm.controls['Warranty1'].value!="" || this.commodityForm.controls['Warranty1'].value!=undefined ||
  this.commodityForm.controls['Warranty1'].value!=null){
    warranty1=this.commodityForm.controls['Warranty1'].value
  }
  if(this.commodityForm.controls['War1'].value!="" || this.commodityForm.controls['War1'].value!=undefined ||
  this.commodityForm.controls['War1'].value!=null){
   War1=this.commodityForm.controls['War1'].value
  }
  if(this.commodityForm.controls['Clauses2'].value!=""|| this.commodityForm.controls['Clauses2'].value!=undefined ||
  this.commodityForm.controls['Clauses2'].value!=null){
    clauses2 = this.commodityForm.controls['Clauses2'].value
  }
  if(this.commodityForm.controls['Exclusion2'].value!="" || this.commodityForm.controls['Exclusion2'].value!=undefined ||
  this.commodityForm.controls['Exclusion2'].value!=null){
    Exc2=this.commodityForm.controls['Exclusion2'].value
  }
  if(this.commodityForm.controls['Warranty2'].value!="" || this.commodityForm.controls['Warranty2'].value!=undefined ||
  this.commodityForm.controls['Warranty2'].value!=null){
    warranty2=this.commodityForm.controls['Warranty2'].value
  }
  if(this.commodityForm.controls['War2'].value!="" || this.commodityForm.controls['War2'].value!=undefined ||
  this.commodityForm.controls['War2'].value!=null){
   War2=this.commodityForm.controls['War2'].value
  }
  if(this.commodityForm.controls['Clauses3'].value!=""|| this.commodityForm.controls['Clauses3'].value!=undefined ||
  this.commodityForm.controls['Clauses3'].value!=null){
    clauses3 = this.commodityForm.controls['Clauses3'].value
  }
  if(this.commodityForm.controls['Exclusion3'].value!="" || this.commodityForm.controls['Exclusion3'].value!=undefined ||
  this.commodityForm.controls['Exclusion3'].value!=null){
    Exc3=this.commodityForm.controls['Exclusion3'].value
  }
  if(this.commodityForm.controls['Warranty3'].value!="" || this.commodityForm.controls['Warranty3'].value!=undefined ||
  this.commodityForm.controls['Warranty3'].value!=null){
    warranty3=this.commodityForm.controls['Warranty3'].value
  }
  if(this.commodityForm.controls['War3'].value!="" || this.commodityForm.controls['War3'].value!=undefined ||
  this.commodityForm.controls['War3'].value!=null){
   War3=this.commodityForm.controls['War3'].value
  }
  if(this.commodityForm.controls['Clauses4'].value!=""|| this.commodityForm.controls['Clauses4'].value!=undefined ||
  this.commodityForm.controls['Clauses4'].value!=null){
    clauses4 = this.commodityForm.controls['Clauses4'].value
  }
  if(this.commodityForm.controls['Exclusion4'].value!="" || this.commodityForm.controls['Exclusion4'].value!=undefined ||
  this.commodityForm.controls['Exclusion4'].value!=null){
    Exc4=this.commodityForm.controls['Exclusion4'].value
  }
  if(this.commodityForm.controls['Warranty4'].value!="" || this.commodityForm.controls['Warranty4'].value!=undefined ||
  this.commodityForm.controls['Warranty4'].value!=null){
    warranty4=this.commodityForm.controls['Warranty4'].value
  }
  if(this.commodityForm.controls['War4'].value!="" || this.commodityForm.controls['War4'].value!=undefined ||
  this.commodityForm.controls['War4'].value!=null){
   War4=this.commodityForm.controls['War4'].value
  }
  if(this.commodityForm.controls['Clauses5'].value!=""|| this.commodityForm.controls['Clauses5'].value!=undefined ||
  this.commodityForm.controls['Clauses5'].value!=null){
    clauses5 = this.commodityForm.controls['Clauses5'].value
  }
  if(this.commodityForm.controls['Exclusion5'].value!="" || this.commodityForm.controls['Exclusion5'].value!=undefined ||
  this.commodityForm.controls['Exclusion5'].value!=null){
    Exc5=this.commodityForm.controls['Exclusion5'].value
  }
  if(this.commodityForm.controls['Warranty5'].value!="" || this.commodityForm.controls['Warranty5'].value!=undefined ||
  this.commodityForm.controls['Warranty5'].value!=null){
    warranty5=this.commodityForm.controls['Warranty5'].value
  }
  if(this.commodityForm.controls['War5'].value!="" || this.commodityForm.controls['War5'].value!=undefined ||
  this.commodityForm.controls['War5'].value!=null){
   War5=this.commodityForm.controls['War5'].value
  }
  if(this.commodityForm.controls['Clauses6'].value!=""|| this.commodityForm.controls['Clauses6'].value!=undefined ||
  this.commodityForm.controls['Clauses6'].value!=null){
    clauses6 = this.commodityForm.controls['Clauses6'].value
  }
  if(this.commodityForm.controls['Exclusion6'].value!="" || this.commodityForm.controls['Exclusion6'].value!=undefined ||
  this.commodityForm.controls['Exclusion6'].value!=null){
    Exc6=this.commodityForm.controls['Exclusion6'].value
  }
  if(this.commodityForm.controls['Warranty6'].value!="" || this.commodityForm.controls['Warranty6'].value!=undefined ||
  this.commodityForm.controls['Warranty6'].value!=null){
    warranty6=this.commodityForm.controls['Warranty6'].value
  }
  if(this.commodityForm.controls['War6'].value!="" || this.commodityForm.controls['War6'].value!=undefined ||
  this.commodityForm.controls['War6'].value!=null){
   War6=this.commodityForm.controls['War6'].value
  }
  if(this.commodityForm.controls['Clauses7'].value!=""|| this.commodityForm.controls['Clauses7'].value!=undefined ||
  this.commodityForm.controls['Clauses7'].value!=null){
    clauses7 = this.commodityForm.controls['Clauses7'].value
  }
  if(this.commodityForm.controls['Exclusion7'].value!="" || this.commodityForm.controls['Exclusion7'].value!=undefined ||
  this.commodityForm.controls['Exclusion7'].value!=null){
    Exc7=this.commodityForm.controls['Exclusion7'].value
  }
  if(this.commodityForm.controls['Warranty7'].value!="" || this.commodityForm.controls['Warranty7'].value!=undefined ||
  this.commodityForm.controls['Warranty7'].value!=null){
    warranty7=this.commodityForm.controls['Warranty7'].value
  }
  if(this.commodityForm.controls['War7'].value!="" || this.commodityForm.controls['War7'].value!=undefined ||
  this.commodityForm.controls['War7'].value!=null){
   War7=this.commodityForm.controls['War7'].value
  }
  if(this.commodityForm.controls['Clauses8'].value!=""|| this.commodityForm.controls['Clauses8'].value!=undefined ||
  this.commodityForm.controls['Clauses8'].value!=null){
    clauses8 = this.commodityForm.controls['Clauses8'].value
  }
  if(this.commodityForm.controls['Exclusion8'].value!="" || this.commodityForm.controls['Exclusion8'].value!=undefined ||
  this.commodityForm.controls['Exclusion8'].value!=null){
    Exc8=this.commodityForm.controls['Exclusion8'].value
  }
  if(this.commodityForm.controls['Warranty8'].value!="" || this.commodityForm.controls['Warranty8'].value!=undefined ||
  this.commodityForm.controls['Warranty8'].value!=null){
    warranty8=this.commodityForm.controls['Warranty8'].value
  }
  if(this.commodityForm.controls['War8'].value!="" || this.commodityForm.controls['War8'].value!=undefined ||
  this.commodityForm.controls['War8'].value!=null){
   War8=this.commodityForm.controls['War8'].value
  }
  if(this.commodityForm.controls['Clauses9'].value!=""|| this.commodityForm.controls['Clauses9'].value!=undefined ||
  this.commodityForm.controls['Clauses9'].value!=null){
    clauses9 = this.commodityForm.controls['Clauses9'].value
  }
  if(this.commodityForm.controls['Exclusion9'].value!="" || this.commodityForm.controls['Exclusion9'].value!=undefined ||
  this.commodityForm.controls['Exclusion9'].value!=null){
    Exc9=this.commodityForm.controls['Exclusion9'].value
  }
  if(this.commodityForm.controls['Warranty9'].value!="" || this.commodityForm.controls['Warranty9'].value!=undefined ||
  this.commodityForm.controls['Warranty9'].value!=null){
    warranty9=this.commodityForm.controls['Warranty9'].value
  }
  if(this.commodityForm.controls['War9'].value!="" || this.commodityForm.controls['War9'].value!=undefined ||
  this.commodityForm.controls['War9'].value!=null){
   War9=this.commodityForm.controls['War9'].value
  }
  if(this.commodityForm.controls['Clauses10'].value!=""|| this.commodityForm.controls['Clauses10'].value!=undefined ||
  this.commodityForm.controls['Clauses10'].value!=null){
    clauses10 = this.commodityForm.controls['Clauses10'].value
  }
  if(this.commodityForm.controls['Exclusion10'].value!="" || this.commodityForm.controls['Exclusion10'].value!=undefined ||
  this.commodityForm.controls['Exclusion10'].value!=null){
    Exc10=this.commodityForm.controls['Exclusion10'].value
  }
  if(this.commodityForm.controls['Warranty10'].value!="" || this.commodityForm.controls['Warranty10'].value!=undefined ||
  this.commodityForm.controls['Warranty10'].value!=null){
    warranty10=this.commodityForm.controls['Warranty10'].value
  }
  if(this.commodityForm.controls['War10'].value!="" || this.commodityForm.controls['War10'].value!=undefined ||
  this.commodityForm.controls['War10'].value!=null){
   War10=this.commodityForm.controls['War10'].value
  }
  if(this.commodityForm.controls['Clauses11'].value!=""|| this.commodityForm.controls['Clauses11'].value!=undefined ||
  this.commodityForm.controls['Clauses11'].value!=null){
    clauses11 = this.commodityForm.controls['Clauses11'].value
  }
  if(this.commodityForm.controls['Exclusion11'].value!="" || this.commodityForm.controls['Exclusion11'].value!=undefined ||
  this.commodityForm.controls['Exclusion11'].value!=null){
    Exc11=this.commodityForm.controls['Exclusion11'].value
  }
  if(this.commodityForm.controls['Warranty11'].value!="" || this.commodityForm.controls['Warranty11'].value!=undefined ||
  this.commodityForm.controls['Warranty11'].value!=null){
    warranty11=this.commodityForm.controls['Warranty11'].value
  }
  if(this.commodityForm.controls['War11'].value!="" || this.commodityForm.controls['War11'].value!=undefined ||
  this.commodityForm.controls['War11'].value!=null){
   War11=this.commodityForm.controls['War11'].value
  }
  if(this.commodityForm.controls['Clauses12'].value!=""|| this.commodityForm.controls['Clauses12'].value!=undefined ||
  this.commodityForm.controls['Clauses12'].value!=null){
    clauses12 = this.commodityForm.controls['Clauses12'].value
  }
  if(this.commodityForm.controls['Exclusion11'].value!="" || this.commodityForm.controls['Exclusion11'].value!=undefined ||
  this.commodityForm.controls['Exclusion11'].value!=null){
    Exc12=this.commodityForm.controls['Exclusion11'].value
  }
  if(this.commodityForm.controls['Warranty12'].value!="" || this.commodityForm.controls['Warranty12'].value!=undefined ||
  this.commodityForm.controls['Warranty12'].value!=null){
    warranty12=this.commodityForm.controls['Warranty12'].value
  }
  if(this.commodityForm.controls['Exclusion12'].value!="" || this.commodityForm.controls['Exclusion12'].value!=undefined ||
  this.commodityForm.controls['Exclusion12'].value!=null){
    Exc12=this.commodityForm.controls['Exclusion12'].value
  }
  if(this.commodityForm.controls['War12'].value!="" || this.commodityForm.controls['War12'].value!=undefined ||
  this.commodityForm.controls['War12'].value!=null){
   War12=this.commodityForm.controls['War12'].value
  }
  if(this.commodityForm.controls['Clauses13'].value!=""|| this.commodityForm.controls['Clauses13'].value!=undefined ||
  this.commodityForm.controls['Clauses13'].value!=null){
    clauses13 = this.commodityForm.controls['Clauses13'].value
  }
  if(this.commodityForm.controls['Exclusion13'].value!="" || this.commodityForm.controls['Exclusion13'].value!=undefined ||
  this.commodityForm.controls['Exclusion13'].value!=null){
    Exc13=this.commodityForm.controls['Exclusion13'].value
  }
  if(this.commodityForm.controls['Warranty13'].value!="" || this.commodityForm.controls['Warranty13'].value!=undefined ||
  this.commodityForm.controls['Warranty13'].value!=null){
    warranty13=this.commodityForm.controls['Warranty13'].value
  }
  if(this.commodityForm.controls['War13'].value!="" || this.commodityForm.controls['War13'].value!=undefined ||
  this.commodityForm.controls['War13'].value!=null){
   War13=this.commodityForm.controls['War13'].value
  }
  if(this.commodityForm.controls['Clauses14'].value!=""|| this.commodityForm.controls['Clauses14'].value!=undefined ||
  this.commodityForm.controls['Clauses14'].value!=null){
    clauses14 = this.commodityForm.controls['Clauses14'].value
  }
  if(this.commodityForm.controls['Exclusion14'].value!="" || this.commodityForm.controls['Exclusion14'].value!=undefined ||
  this.commodityForm.controls['Exclusion14'].value!=null){
    Exc14=this.commodityForm.controls['Exclusion14'].value
  }
  if(this.commodityForm.controls['Warranty14'].value!="" || this.commodityForm.controls['Warranty14'].value!=undefined ||
  this.commodityForm.controls['Warranty14'].value!=null){
    warranty14=this.commodityForm.controls['Warranty14'].value
  }
  if(this.commodityForm.controls['War14'].value!="" || this.commodityForm.controls['War14'].value!=undefined ||
  this.commodityForm.controls['War14'].value!=null){
   War14=this.commodityForm.controls['War14'].value
  }
  if(this.commodityForm.controls['Clauses15'].value!=""|| this.commodityForm.controls['Clauses15'].value!=undefined ||
  this.commodityForm.controls['Clauses15'].value!=null){
    clauses15 = this.commodityForm.controls['Clauses15'].value
  }
  if(this.commodityForm.controls['Exclusion15'].value!="" || this.commodityForm.controls['Exclusion15'].value!=undefined ||
  this.commodityForm.controls['Exclusion15'].value!=null){
    Exc15=this.commodityForm.controls['Exclusion15'].value
  }
  if(this.commodityForm.controls['Warranty15'].value!="" || this.commodityForm.controls['Warranty15'].value!=undefined ||
  this.commodityForm.controls['Warranty15'].value!=null){
    warranty15=this.commodityForm.controls['Warranty15'].value
  }
  if(this.commodityForm.controls['War15'].value!="" || this.commodityForm.controls['War15'].value!=undefined ||
  this.commodityForm.controls['War15'].value!=null){
   War15=this.commodityForm.controls['War15'].value
  }
  if(this.commodityForm.controls['Clauses17'].value!=""|| this.commodityForm.controls['Clauses17'].value!=undefined ||
  this.commodityForm.controls['Clauses17'].value!=null){
    clauses17 = this.commodityForm.controls['Clauses17'].value
  }
  if(this.commodityForm.controls['Exclusion17'].value!="" || this.commodityForm.controls['Exclusion17'].value!=undefined ||
  this.commodityForm.controls['Exclusion17'].value!=null){
    Exc17=this.commodityForm.controls['Exclusion17'].value
  }
  if(this.commodityForm.controls['Warranty17'].value!="" || this.commodityForm.controls['Warranty17'].value!=undefined ||
  this.commodityForm.controls['Warranty17'].value!=null){
    warranty17=this.commodityForm.controls['Warranty17'].value
  }
  if(this.commodityForm.controls['War17'].value!="" || this.commodityForm.controls['War17'].value!=undefined ||
  this.commodityForm.controls['War17'].value!=null){
   War17=this.commodityForm.controls['War17'].value
  }
  if(this.commodityForm.controls['Clauses18'].value!="" || this.commodityForm.controls['Clauses18'].value!=undefined ||
  this.commodityForm.controls['Clauses18'].value!=null){
    clauses18=this.commodityForm.controls['Clauses18'].value
  }
  if(this.commodityForm.controls['Exclusion18'].value!="" || this.commodityForm.controls['Exclusion18'].value!=undefined ||
  this.commodityForm.controls['Exclusion18'].value!=null){
    Exc18=this.commodityForm.controls['Exclusion18'].value
  }
  if(this.commodityForm.controls['Warranty18'].value!="" || this.commodityForm.controls['Warranty18'].value!=undefined ||
  this.commodityForm.controls['Warranty18'].value!=null){
    warranty18=this.commodityForm.controls['Warranty18'].value
  }
  if(this.commodityForm.controls['War18'].value!="" || this.commodityForm.controls['War18'].value!=undefined ||
  this.commodityForm.controls['War18'].value!=null){
   War18=this.commodityForm.controls['War18'].value
  }
  const ReqObj = {
  
    'BranchCode': this.branchCode,
      "CommodityName":this.commodityForm.controls['CommodityName'].value,
      "CommodityRate":this.commodityForm.controls['CommodityRate'].value,
      "CoreApplicationCode":this.commodityForm.controls['CoreApplicationCode'].value,
      "CommodityId":com,
      "CoverageReferralInfo": finalList,
      "EffectiveDate":effectiveDate,
      "Remarks":this.commodityForm.controls['remarks'].value,
      "Status":this.commodityForm.controls['status'].value, 
       "IccASeaInfo": {
          "ClausesInfo":clauses1,
          "DeductibleYn":  this.commodityForm.controls['dedet1'].value,
          "ExclusionInfo":Exc1, 
          "WarInfo":War1, 
          "WarrantyInfo":warranty1
        },
        "IccBSeaInfo": {
          "ClausesInfo":clauses2,
          "DeductibleYn":this.commodityForm.controls['dedet2'].value,
          "ExclusionInfo":Exc2,
          "WarInfo":War2,
          "WarrantyInfo":warranty2,
        },
        "IccCSeaInfo": {
          "ClausesInfo":clauses3,
          "DeductibleYn":this.commodityForm.controls['dedet3'].value,
          "ExclusionInfo":Exc3,
          "WarInfo":War3,
          "WarrantyInfo":warranty3,
        },
        "IccCNonDeliveryInfo": {
          "ClausesInfo":clauses4,
          "DeductibleYn":  this.commodityForm.controls['dedet4'].value,
          "ExclusionInfo":Exc4,
          "WarInfo":War4,
          "WarrantyInfo":warranty4 
        },
        "IccCFrozenFoodSeaInfo": {
          "ClausesInfo":clauses8,
          "DeductibleYn": this.commodityForm.controls['dedet8'].value,
          "ExclusionInfo":Exc8,
          "WarInfo":War8,
          "WarrantyInfo":warranty8
        },
        "IccCFrozenMeatSeaInfo": {
          "ClausesInfo":clauses7,
          "DeductibleYn": this.commodityForm.controls['dedet7'].value,
          "ExclusionInfo":Exc7,
          "WarInfo":War7,
          "WarrantyInfo":warranty7
        },
        "IccAFrozenFoodSeaInfo": {
          "ClausesInfo": clauses6,
          "DeductibleYn": this.commodityForm.controls['dedet5'].value,
          "ExclusionInfo": Exc6,
          "WarInfo": War6,
          "WarrantyInfo": warranty6
        },
        "IccAFrozenMeatSeaInfo": {
          "ClausesInfo":clauses5,
          "DeductibleYn":this.commodityForm.controls['dedet5'].value,
          "ExclusionInfo": Exc5,
          "WarInfo": War5,
          "WarrantyInfo": warranty5
        },
        "LandTransitLandInfo": {
          "ClausesInfo":clauses9,
          "DeductibleYn":this.commodityForm.controls['dedet9'].value,
          "ExclusionInfo":Exc9,
          "WarInfo":War9,
          "WarrantyInfo":warranty9
        },
        "PostParcelCourierInfo": {
          "ClausesInfo":clauses10,
          "DeductibleYn":this.commodityForm.controls['dedet10'].value,
          "ExclusionInfo":Exc10,
          "WarInfo":War10,
          "WarrantyInfo":warranty10
        },
          "AllRisksAirAndLandInfo": {
            "ClausesInfo": "",
            "DeductibleYn": "",
            "ExclusionInfo": "",
            "WarInfo": "",
            "WarrantyInfo": ""
          },
          "AllRisksAirSeaLandInfo": {
            "ClausesInfo": clauses18,
            "DeductibleYn": this.commodityForm.controls['dedet18'].value,
            "ExclusionInfo": Exc18,
            "WarInfo": War18,
            "WarrantyInfo": warranty18
          },
          "AllRisksLandTransitLandInfo": {
            "ClausesInfo":clauses17,
            "DeductibleYn":this.commodityForm.controls['dedet17'].value,
            "ExclusionInfo": Exc17,
            "WarInfo": War17,
            "WarrantyInfo": warranty17
          },
          "AllRisksParcelPostAirInfo": {
            "ClausesInfo": "",
            "DeductibleYn": "",
            "ExclusionInfo": "",
            "WarInfo": "",
            "WarrantyInfo": ""
          },
          "AllRisksSeaAndAirInfo": {
            "ClausesInfo": clauses15,
            "DeductibleYn": this.commodityForm.controls['dedet15'].value,
            "ExclusionInfo": Exc15,
            "WarInfo": War15,
            "WarrantyInfo": warranty15
          },
          "AllRisksSeaAndLandInfo": {
            "ClausesInfo": clauses14,
            "DeductibleYn": this.commodityForm.controls['dedet14'].value,
            "ExclusionInfo": Exc14,
            "WarInfo":War14,
            "WarrantyInfo":warranty14
          },
          "IccAirCargoAirInfo": {
            "ClausesInfo": clauses11,
            "DeductibleYn":this.commodityForm.controls['dedet11'].value,
            "ExclusionInfo": Exc11,
            "WarInfo": War11,
            "WarrantyInfo": warranty11
          },
          "IccAirCargoAllRisksInfo": {
            "ClausesInfo": clauses12,
            "DeductibleYn": this.commodityForm.controls['dedet12'].value,
            "ExclusionInfo": Exc12,
            "WarInfo": War12,
            "WarrantyInfo": warranty12
          },
      }
  this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/commodity/save`, ReqObj).subscribe(
    (data: any) => {
      console.log(data.Message);
      if(data?.Result){
        this.router.navigate(['/Marine/masters/commodity/view'])
      }
      else if (data.Errors) {
        for (let entry of data.Errors) {
          let type: NbComponentStatus = 'danger';
          const config = {
            status: type,
            destroyByClick: true,
            duration: 4000,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            preventDuplicates: false,
          };
          this.toastrService.show(
            entry.Field,
            entry.Message,
            config);
        }
      }
    })
 }
  // get transport list
  public getModeOFtransportList() {
    const ReqObj = {
      'BranchCode': this.branchCode,
      ProductId : '03',
      OpenCoverNo : '',
    };

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/modeoftransport`, ReqObj).subscribe(
      (data: any) => {
        if (data?.Message === 'Success') {
          this.transportList = data.Result;
        }
      },
      (err) => { },
    );
  }


  onSubmit() {
    const selectedList: any[] = this.warrantyData.filter((ele: any) => ele.isChecked === true);
    const selectedClausesList: any[] = this.Clauses.filter((ele: any) => ele.isChecked === true);
    const selectedExclusionList: any[] = this.Exclusion.filter((ele: any) => ele.isChecked === true);
    const selectedWarList: any[] = this.War.filter((ele: any) => ele.isChecked === true);
    let selectedListId: any = '';let lastCommaRemoved:any,selectedClausesId='',selectedExclusionId:any='',selectedWarId:any='';    /*for (let index = 0; index < selectedList.length; index++) {
      const element = selectedList[index];
      selectedListId += element.ClausesId + ',';
      this.dialog.closeAll();
    }*/
    if (this.clickedModal === 'export1') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId += element.ClausesId;
        }
        else if(index !== 0){
          selectedClausesId += ',' + element.ClausesId;
         }
    
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty1') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId += element.WarrantyId;
        }
        else if(index !== 0){
          selectedListId += ',' + element.WarrantyId;
         }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty1'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion1') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        //selectedListId += element.ExclusionId + ',';
        if(index === 0){
          selectedExclusionId += element.ExclusionId;
        }
        else if(index !== 0){
          selectedExclusionId += ',' + element.ExclusionId;
         }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Exclusion1'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover1') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId += element.WarId;
        }
        else if(index !== 0){
          selectedWarId += ',' + element.WarId;
         }
        //selectedListId += element.WarId + ',';
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War1'].setValue(selectedWarId);
    }
    else if (this.clickedModal === 'export2') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId += element.ClausesId;
        }
        else if(index !== 0){
          selectedClausesId += ',' + element.ClausesId;
         }
        //selectedListId += element.ClausesId + ',';
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses2'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty2') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId += element.WarrantyId;
        }
        else if(index !== 0){
          selectedListId += ',' + element.WarrantyId;
         }
        //selectedListId += element.WarrantyId + ',';
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty2'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion2') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
       // selectedListId += element.ExclusionId + ',';
       if(index === 0){
        selectedExclusionId += element.ExclusionId;
      }
      else if(index !== 0){
        selectedExclusionId += ',' + element.ExclusionId;
       }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Exclusion2'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover2') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId += element.WarId;
        }
        else if(index !== 0){
          selectedWarId += ',' + element.WarId;
         }
        //selectedListId += element.WarId + ',';
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War2'].setValue(selectedWarId);
    }
    else if (this.clickedModal === 'export3') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId += element.ClausesId;
        }
        else if(index !== 0){
          selectedClausesId += ',' + element.ClausesId;
         }
        //selectedListId += element.ClausesId + ',';
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses3'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty3') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId += element.WarrantyId;
        }
        else if(index !== 0){
          selectedListId += ',' + element.WarrantyId;
         }
        //selectedListId += element.WarrantyId + ',';
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty3'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion3') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        if(index === 0){
          selectedExclusionId += element.ExclusionId;
        }
        else if(index !== 0){
          selectedExclusionId += ',' + element.ExclusionId;
         }
        //selectedListId += element.ExclusionId + ',';
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Exclusion3'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover3') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId += element.WarId;
        }
        else if(index !== 0){
          selectedWarId += ',' + element.WarId;
         }
        //selectedListId += element.WarId + ',';
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War3'].setValue(selectedWarId);
    }
    if (this.clickedModal === 'export4') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId += element.ClausesId;
        }
        else if(index !== 0){
          selectedClausesId += ',' + element.ClausesId;
         }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses4'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty4') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId += element.WarrantyId;
        }
        else if(index !== 0){
          selectedListId += ',' + element.WarrantyId;
         }
        this.dialog.closeAll();
      }
     
      this.commodityForm.controls['Warranty4'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion4') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        if(index === 0){
          selectedExclusionId += element.ExclusionId;
        }
        else if(index !== 0){
          selectedExclusionId += ',' + element.ExclusionId;
         }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Exclusion4'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover4') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId += element.WarId;
        }
        else if(index !== 0){
          selectedWarId += ',' + element.WarId;
         }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War4'].setValue(selectedWarId);
    }
    if (this.clickedModal === 'export5') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId += element.ClausesId;
        }
        else if(index !== 0){
          selectedClausesId += ',' + element.ClausesId;
         }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses5'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty5') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
         selectedListId= element.WarrantyId;
        }
        else if(index !== 0){
          selectedListId += ',' + element.WarrantyId;
         }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty5'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion5') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        if(index === 0){
          selectedExclusionId= element.ExclusionId;
         }
         else if(index !== 0){
           selectedExclusionId += ',' + element.ExclusionId;
          }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Exclusion5'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover5') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId= element.WarId;
         }
         else if(index !== 0){
           selectedWarId += ',' + element.WarId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War5'].setValue(selectedWarId);
    }

    if (this.clickedModal === 'export6') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId= element.ClausesId;
         }
         else if(index !== 0){
           selectedClausesId += ',' + element.ClausesId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses6'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty6') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId= element.WarrantyId;
         }
         else if(index !== 0){
           selectedListId += ',' + element.WarrantyId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty6'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion6') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        if(index === 0){
          selectedExclusionId= element.ExclusionId;
         }
         else if(index !== 0){
          selectedExclusionId+= ','+ element.ExclusionId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Exclusion6'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover6') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId= element.WarId;
         }
         else if(index !== 0){
          selectedWarId+= ','+ element.WarId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War6'].setValue(selectedWarId);
    }
    if (this.clickedModal === 'export7') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId= element.ClausesId;
         }
         else if(index !== 0){
          selectedClausesId+= ','+ element.ClausesId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses7'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty7') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId= element.WarrantyId;
         }
         else if(index !== 0){
          selectedListId+= ','+ element.WarrantyId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty7'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion7') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        if(index === 0){
          selectedExclusionId= element.ExclusionId;
         }
         else if(index !== 0){
          selectedExclusionId+= ','+ element.ExclusionId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Exclusion7'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover7') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId= element.WarId;
         }
         else if(index !== 0){
          selectedWarId+= ','+ element.WarId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War7'].setValue(selectedWarId);
    }
    else if (this.clickedModal === 'export7') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId= element.ClausesId;
         }
         else if(index !== 0){
          selectedClausesId+= ','+ element.ClausesId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses7'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty7') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId= element.WarrantyId;
         }
         else if(index !== 0){
          selectedListId+= ','+ element.WarrantyId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty7'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion7') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        if(index === 0){
          selectedExclusionId= element.ExclusionId;
         }
         else if(index !== 0){
          selectedExclusionId+= ','+element.ExclusionId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Exclusion7'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover7') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId= element.WarId;
         }
         else if(index !== 0){
          selectedWarId+= ','+ element.WarId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War7'].setValue(selectedWarId);
    }
    if (this.clickedModal === 'export8') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId= element.ClausesId;
         }
         else if(index !== 0){
          selectedClausesId += ','+ element.ClausesId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses8'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty8') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId= element.WarrantyId;
         }
         else if(index !== 0){
          selectedListId += ','+element.WarrantyId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty8'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion8') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        if(index === 0){
          selectedExclusionId= element.ExclusionId;
         }
         else if(index !== 0){
          selectedExclusionId += ','+element.ExclusionId;
        }
        this.dialog.closeAll();
      } 
      this.commodityForm.controls['Exclusion8'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover8') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId= element.WarId;
         }
         else if(index !== 0){
          selectedWarId += ','+element.WarId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War8'].setValue(selectedWarId);
    }
    if (this.clickedModal === 'export11') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId= element.ClausesId;
         }
         else if(index !== 0){
          selectedClausesId += ','+element.ClausesId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses11'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty11') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId= element.WarrantyId;
         }
         else if(index !== 0){
          selectedListId += ','+element.WarrantyId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty11'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion11') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        if(index === 0){
          selectedExclusionId= element.ExclusionId;
         }
         else if(index !== 0){
          selectedExclusionId += ','+element.ExclusionId;
        }
        this.dialog.closeAll();
      } 
      this.commodityForm.controls['Exclusion11'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover11') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId= element.WarId;
         }
         else if(index !== 0){
          selectedWarId += ','+element.WarId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War11'].setValue(selectedWarId);
    }
    
    if (this.clickedModal === 'export12') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId= element.ClausesId;
         }
         else if(index !== 0){
          selectedClausesId += ','+element.ClausesId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses12'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty12') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId= element.WarrantyId;
         }
         else if(index !== 0){
          selectedListId += ','+element.WarrantyId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty12'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion12') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        if(index === 0){
          selectedExclusionId= element.ExclusionId;
         }
         else if(index !== 0){
          selectedExclusionId += ','+element.ExclusionId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Exclusion12'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover12') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId= element.WarId;
         }
         else if(index !== 0){
          selectedWarId += ','+element.WarId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War9'].setValue(selectedWarId);
    }
    if (this.clickedModal === 'export13') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId= element.ClausesId;
         }
         else if(index !== 0){
          selectedClausesId += ','+element.ClausesId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses10'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty13') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId= element.WarrantyId;
         }
         else if(index !== 0){
          selectedListId += ','+element.WarrantyId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty10'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion13') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        if(index === 0){
          selectedExclusionId= element.ExclusionId;
         }
         else if(index !== 0){
          selectedExclusionId += ','+element.ExclusionId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Exclusion10'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover13') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId= element.WarId;
         }
         else if(index !== 0){
          selectedWarId += ','+element.WarId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War10'].setValue(selectedWarId);
    }
    if (this.clickedModal === 'export10') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId= element.ClausesId;
         }
         else if(index !== 0){
          selectedClausesId += ','+element.ClausesId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses11'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty10') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId= element.WarrantyId;
         }
         else if(index !== 0){
          selectedListId += ','+element.WarrantyId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty11'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion10') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        if(index === 0){
          selectedExclusionId= element.ExclusionId;
         }
         else if(index !== 0){
          selectedExclusionId += ','+element.ExclusionId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Exclusion11'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover10') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId= element.WarId;
         }
         else if(index !== 0){
          selectedWarId += ','+element.WarId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War11'].setValue(selectedWarId);
    }
    if (this.clickedModal === 'export9') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId= element.ClausesId;
         }
         else if(index !== 0){
          selectedClausesId += ','+element.ClausesId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses12'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty9') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId= element.WarrantyId;
         }
         else if(index !== 0){
          selectedListId += ','+element.WarrantyId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty12'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion9') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        if(index === 0){
          selectedExclusionId= element.ExclusionId;
         }
         else if(index !== 0){
          selectedExclusionId += ','+element.ExclusionId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Exclusion12'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover9') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId= element.WarId;
         }
         else if(index !== 0){
          selectedWarId += ','+element.WarId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War12'].setValue(selectedWarId);
    }
    if (this.clickedModal === 'export15') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId= element.ClausesId;
         }
         else if(index !== 0){
          selectedClausesId += ','+element.ClausesId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses15'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty15') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId= element.WarrantyId;
         }
         else if(index !== 0){
          selectedListId += ','+element.WarrantyId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty15'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion15') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        if(index === 0){
          selectedExclusionId= element.ExclusionId;
         }
         else if(index !== 0){
          selectedExclusionId += ','+element.ExclusionId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Exclusion15'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover15') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId= element.WarId;
         }
         else if(index !== 0){
          selectedWarId += ','+element.WarId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War15'].setValue(selectedWarId);
    }
    if (this.clickedModal === 'export14') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId= element.ClausesId;
         }
         else if(index !== 0){
          selectedClausesId += ','+element.ClausesId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses14'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty14') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId= element.WarrantyId;
         }
         else if(index !== 0){
          selectedListId += ','+element.WarrantyId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty14'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion14') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        if(index === 0){
          selectedExclusionId= element.ExclusionId;
         }
         else if(index !== 0){
          selectedExclusionId += ','+element.ExclusionId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Exclusion14'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover14') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId= element.WarId;
         }
         else if(index !== 0){
          selectedWarId += ','+element.WarId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War14'].setValue(selectedWarId);
    }
    if (this.clickedModal === 'export17') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId= element.ClausesId;
         }
         else if(index !== 0){
          selectedClausesId += ','+element.ClausesId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses17'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty17') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId= element.WarrantyId;
         }
         else if(index !== 0){
          selectedListId += ','+element.WarrantyId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty17'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion17') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        if(index === 0){
          selectedExclusionId= element.ExclusionId;
         }
         else if(index !== 0){
          selectedExclusionId += ','+element.ExclusionId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Exclusion17'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover17') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId= element.WarId;
         }
         else if(index !== 0){
          selectedWarId += ','+element.WarId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War17'].setValue(selectedWarId);
    }
    if (this.clickedModal === 'export18') {
      for (let index = 0; index < selectedClausesList.length; index++) {
        const element = selectedClausesList[index];
        if(index === 0){
          selectedClausesId= element.ClausesId;
         }
         else if(index !== 0){
          selectedClausesId += ','+element.ClausesId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Clauses18'].setValue(selectedClausesId);
    }
    else if (this.clickedModal === 'Warranty18') {
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        if(index === 0){
          selectedListId= element.WarrantyId;
         }
         else if(index !== 0){
          selectedListId += ','+element.WarrantyId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Warranty18'].setValue(selectedListId);
    }
    else if (this.clickedModal === 'Exclusion18') {
      for (let index = 0; index < selectedExclusionList.length; index++) {
        const element = selectedExclusionList[index];
        if(index === 0){
          selectedExclusionId= element.ExclusionId;
         }
         else if(index !== 0){
          selectedExclusionId += ','+element.ExclusionId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['Exclusion18'].setValue(selectedExclusionId);
    }
    else if (this.clickedModal === 'WarCover18') {
      for (let index = 0; index < selectedWarList.length; index++) {
        const element = selectedWarList[index];
        if(index === 0){
          selectedWarId= element.WarId;
         }
         else if(index !== 0){
          selectedWarId += ','+element.WarId;
        }
        this.dialog.closeAll();
      }
      this.commodityForm.controls['War18'].setValue(selectedWarId);
    }
    

  }
close(){
  this.dialog.closeAll();
}

}

