import { CountryCommodityInfoComponent } from './../../country-commodity-info.component';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OpenCoverService } from '../../../../open-cover.service';
import * as Mydatas from '../../../../../../app-config.json';
import { AppComponent } from '../../../../../../app.component';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-orgin-country',
  templateUrl: './orgin-country.component.html',
  styleUrls: ['./orgin-country.component.scss'],
})
export class OrginCountryComponent implements OnInit {
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


  constructor(
    private openCoverService: OpenCoverService,
    private router: Router,
    private appComponent: AppComponent,
    private countryCommodityInfoComponent: CountryCommodityInfoComponent,

  ) {
    this.proposalNo = this.countryCommodityInfoComponent.proposalNo;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
  }

  ngOnInit(): void {
    this.onGetCountryList();
    this.onGetCountryCodeList();
  }

  onGetCountryList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/country`;
    const reqData = {
      'BranchCode': this.userDetails.BelongingBranch,
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
  }

  onGetCountryCodeList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/constant`;
    const reqData = {
      'BranchCode': this.userDetails.BelongingBranch,
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
  }

  onSelected(arrayaside: string) {
    this.excludedCountrySearch = null;
    this.includedCountrySearch = null;
    if (arrayaside === 'right') {
      console.log('yyyyyyyyyyyy',this.excludedCountry)
      const selectedCountry = this.excludedCountry.filter((ele: any) => ele.isOrigin === true);
      selectedCountry.map((ele: any) => ele.isOrigin = false);
      this.includedCountry.push(...selectedCountry);
      for (let index = 0; index < selectedCountry.length; index++) {
        const element = selectedCountry[index];
        const idx = this.excludedCountry.findIndex((ele: any) => ele.CodeValue === element.CodeValue);
        this.excludedCountry.splice(idx, 1);
      }
    }
    if (arrayaside === 'left') {
      const selectedCountry = this.includedCountry.filter((ele: any) => ele.isOrigin === true);
      selectedCountry.map((ele: any) => ele.isOrigin = false);
      this.excludedCountry.push(...selectedCountry);
      for (let index = 0; index < selectedCountry.length; index++) {
        const element = selectedCountry[index];
        const idx = this.includedCountry.findIndex((ele: any) => ele.CodeValue === element.CodeValue);
        this.includedCountry.splice(idx, 1);

      }
    }
  }
  onMoveAll(arrayaside: string) {
    if (arrayaside === 'right') {
      this.includedCountry = [...this.includedCountry, ...this.excludedCountry];
      this.excludedCountry = [];
    }
    if (arrayaside === 'left') {
      this.excludedCountry = [...this.excludedCountry, ...this.includedCountry];
      this.includedCountry = [];
    }
  }

  async onMoveGroupWise(name: string, arrayaside: string, list: any[]) {
    if (arrayaside === 'right') {
      let result: any[] = await this.excludedCountry.filter(ele => list.some(Code => ele.CodeValue === Code));
      if (result.length > 0) {
        this.includedCountry.push(...result);
        console.log(this.excludedCountry, result, list,this.includedCountry);
        for (let index = 0; index < list.length; index++) {
          const element = list[index];
          const idx = this.excludedCountry.findIndex((ele: any) => ele.CodeValue === element);
          if (idx !== -1) {
            this.excludedCountry.splice(idx, 1);
          }
        }
      }



    }
    if (arrayaside === 'left') {
      let result: any[] = await this.includedCountry.filter(ele => list.some(Code => ele.CodeValue === Code));
      if (result.length > 0) {
        console.log(result, this.includedCountry);
        this.excludedCountry.push(...result);
        for (let index = 0; index < list.length; index++) {
          const element = list[index];
          const idx = this.includedCountry.findIndex((ele: any) => ele.CodeValue === element);
          if (idx !== -1) {
            this.includedCountry.splice(idx, 1);
          }
        }
      }
    }
  }

  onEdit() {
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
  }

  onSubmit() {
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
          this.excludedCountrySearch = null;
          this.includedCountrySearch = null;
        },
        (err) => { },
      );
    }

  }



}
