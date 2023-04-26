//import { CountryCommodityInfoComponent } from './../../country-commodity-info.component';
import { Component, OnInit,Input,Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as Mydatas from '../../../../app-config.json'
//import { OpenCoverService } from '../../../../open-cover.service';
//import * as Mydatas from '../../../../../../app-config.json';
//import { AppComponent } from '../../../../../../app.component';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-excludedpopup',
  templateUrl: './excludedpopup.component.html',
  styleUrls: ['./excludedpopup.component.scss'],
})
export class ExcludedPopUpComponent implements OnInit {
   
    @Input() list: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public countryList: any[] = [];
  public excludedCountry: any[] = [];
  public includedCountry: any[] = [];
  public africanCode: any[] = [];
  public gccCode: any[] = [];
  public cisCode: any[] = [];
  public editCode: any[] = [];

  public proposalNo: any = '';
  public excludedCountrySearch: any = '';
  public includedCountrySearch: any = '';
  public List:any[]=[];
    included: { MenuId: any; }[];


  constructor(
  
    private router: Router,
    public dialogRef: MatDialogRef<ExcludedPopUpComponent>,public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
  
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
  }

  ngOnInit(): void {

    this.List=this.data?.list
    console.log('gggggggggg',this.List);
    if (this.List.length > 0) {
        const orginCountry:any[] = this.List.map(x => ({
          ...x,
          isOrgin: false,
        }));

        this.List= orginCountry;
    }
    //this.onGetCountryList();
    //this.onGetCountryCodeList();
  }


  close(){ 
    console.log('ggggggg',this.included)
    this.dialogRef.close(this.included);}

  /*onGetCountryList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/country`;
    const reqData = {
      'BranchCode': this.userDetails.BranchCode,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        const country: any[] = data?.Result;
        if (country.length > 0) {
          const orginCountry:any[] = country.map(x => ({
            ...x,
            isOrigin: false,
          }));
          this.countryList = orginCountry;
          this.excludedCountry = orginCountry;
          this.onEdit();
        }
      },
      (err) => { },
    );
  }*/

  /*onGetCountryCodeList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/constant`;
    const reqData = {
      'BranchCode': this.userDetails.BranchCode,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.africanCode = data?.Result[0].CodeValue.split('~');
        this.gccCode = data?.Result[1].CodeValue.split('~');
        this.cisCode = data?.Result[2].CodeValue.split('~');
      },
      (err) => { },
    );
  }*/

  onSelected(arrayaside: string) {
    console.log('arrayside',arrayaside)
    if (arrayaside === 'right') {
        console.log('kkkkkkkkk',this.List)
        const selectedCountry = this.List.filter((ele: any) => ele.isOrigin == true);
        console.log('jjjjjjjjjjj',selectedCountry)
        selectedCountry.map((ele: any) =>  ele.isOrigin = false);
        this.includedCountry.push(...selectedCountry);
        for (let index = 0; index < selectedCountry.length; index++) {
          const element = selectedCountry[index];
          const idx = this.List.findIndex((ele: any) => ele.MenuId === element.MenuId);
          this.List.splice(idx, 1);
        }
      }
      if (arrayaside === 'left') {
        const selectedCountry = this.includedCountry.filter((ele: any) => ele.isOrigin === true);
        selectedCountry.map((ele: any) => ele.isOrigin = false);
        this.List.push(...selectedCountry);
        for (let index = 0; index < selectedCountry.length; index++) {
          const element = selectedCountry[index];
          const idx = this.includedCountry.findIndex((ele: any) => ele.MenuId === element.MenuId);
          this.includedCountry.splice(idx, 1);
  
        }
    }
  }
  onMoveAll(arrayaside: string) {
    
  }

  async onMoveGroupWise(name: string, arrayaside: string, list: any[]) {
    
      }


      onsubmit(){
        if (this.includedCountry.length > 0) {
            this.included =  this.includedCountry.map(x => ({
              MenuId: x.MenuId,
              MenuName:x.MenuName
    
            }));
      }
      for (let index = 0; index < this.includedCountry.length; index++) {
        const element = this.includedCountry[index];
        const idx = this.includedCountry.findIndex((ele: any) => ele.MenuId === element.MenuId);
        //this.includedCountry.splice(idx, 1);
        console.log('mmmmmmmmm',idx)
      }
      this.close()
   
  }
}

  /*onEdit() {
    const urlLink = `${this.ApiUrl1}OpenCover/originationcountry/edit`;
    const reqData = {
      'BranchCode': this.userDetails.BranchCode,
      'ProposalNo': this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        const editCountry: any[] = data?.Result?.OriginationCountryInfo || [];
         for (let index = 0; index < editCountry.length; index++) {
          const element = editCountry[index];
          this.editCode.push(element.CountryId);
          if (index === editCountry.length - 1) {
            this.onMoveGroupWise('editCode', 'right',this.editCode);
          }

         }

      },
      (err) => { },
    );
  }*/

  /*onSubmit() {
    const urlLink = `${this.ApiUrl1}OpenCover/originationcountry/save`;
    if (this.includedCountry.length > 0) {
      const includedCountry =  this.includedCountry.map(x => ({
        CountryId: x.CodeValue,
        CountryName: x.CodeDescription,
      }));
      const reqData = {
        'OriginationCountryInfo': includedCountry,
        'ProposalNo': this.proposalNo,
      };
      this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
        (data: any) => {
          console.log(data);
        },
        (err) => { },
      );
    }

  }*/


