import { map, filter } from 'rxjs/operators';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as Mydatas from '../../../../app-config.json';
import { NewQuotesComponent } from '../../new-quotes.component';
import { NewQuotesService } from '../../new-quotes.service';
import { SessionStorageService } from '../../../../shared/storage/session-storage.service';

@Component({
  selector: 'app-clauses',
  templateUrl: './clauses.component.html',
  styleUrls: ['./clauses.component.scss']
})
export class ClausesComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public ReferenceNo:any;
  public quotesType:any;
  public premiumDetails:any;

  public clausesList:any[] = [];

  public Clauses:any[] = [];
  public Wars:any[] = [];
  public Warranties:any[] = [];
  public Exclusions:any[] = [];
  public OpenCover:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private newQuotesService: NewQuotesService,
    public dialogRef: MatDialogRef<ClausesComponent>,
    private sessionStorageService: SessionStorageService
  ) {
    this.ReferenceNo = sessionStorage.getItem('ReferenceNo');
    this.quotesType = sessionStorage.getItem('quotesType');
    this.premiumDetails = this.data.premiumDetails;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;

    if(this.data.name === 'Edit'){
      this.Clauses = this.data?.list?.Clauses == null ? [] : this.data?.list?.Clauses?.map(x=>({
        isCheck:true,
        ...x
      }));
      this.Wars = this.data?.list?.Wars == null ? [] : this.data?.list?.Wars?.map(x=>({
        isCheck:true,
        ...x
      }));
      this.Warranties = this.data?.list?.Warranties == null ? [] : this.data?.list?.Warranties?.map(x=>({
        isCheck:true,
        ...x
      }));
      this.Exclusions = this.data?.list?.Exclusions == null ? [] : this.data?.list?.Exclusions?.map(x=>({
        isCheck:true,
        ...x
      }));
    }else{
       this.clausesList = this.data?.list?.map(x=>({
        isCheck:false,
        ...x
      }));
    }



  }

  ngOnInit(): void {
    console.log(this.data);
  }

  onSubmit(){
    if(this.data.name === 'Edit'){
        this.onEditClause();
    }else{
      var Clauses:any[] = [];
      var War:any[] = [];
      var Exclusions:any[] = [];
      var Warranties:any[] = [];
      if(this.data.name =='Clauses'){
        Clauses = this.clausesList.filter(x=>x.isCheck === true).map(y=>({
          Code:y.Code,
          CodeDesc:y.CodeDesc
        }))
      }
      if(this.data.name =='War'){
        War = this.clausesList.filter(x=>x.isCheck === true).map(y=>({
          Code:y.Code,
          CodeDesc:y.CodeDesc
        }))
      }
      if(this.data.name =='Exclusions'){
        Exclusions = this.clausesList.filter(x=>x.isCheck === true).map(y=>({
          Code:y.Code,
          CodeDesc:y.CodeDesc
        }))
      }
      if(this.data.name =='Warranties'){
        Warranties = this.clausesList.filter(x=>x.isCheck === true).map(y=>({
          Code:y.Code,
          CodeDesc:y.CodeDesc
        }))
      }

      this.onAddClauses(
        Clauses,
        War,
        Exclusions,
        Warranties
      );
    }
  }


  onAddClauses(
    Clauses,
    War,
    Exclusions,
    Warranties
  ){

    const urlLink = `${this.ApiUrl1}quote/conditions/add`;
    const reqData = {
      "ApplicationNo":this.ReferenceNo,
      "QuoteNo":this.premiumDetails.QuoteDetails?.QuoteNo,
      "BranchCode":this.userDetails?.BranchCode,
      "CoverId":this.OpenCover?.coverId,
      "Conditions":{
        "Clauses":Clauses,
        "Wars":War,
        "Warranties":Exclusions,
        "Exclusions":Warranties
      },
      "ConditionsType":this.data?.conditionType
    }

    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
         this.dialogRef.close(false);
      },
      (err) => { },
    );
  }


  onEditClause(){
    const Clauses = this.Clauses.filter(x=>x.isCheck === true).map(y=>({
      Code:y.Code,
      CodeDesc:y.CodeDesc
    }));
    const Wars = this.Wars.filter(x=>x.isCheck === true).map(y=>({
      Code:y.Code,
      CodeDesc:y.CodeDesc
    }));
    const Warranties = this.Warranties.filter(x=>x.isCheck === true).map(y=>({
      Code:y.Code,
      CodeDesc:y.CodeDesc
    }));
    const Exclusions = this.Exclusions.filter(x=>x.isCheck === true).map(y=>({
      Code:y.Code,
      CodeDesc:y.CodeDesc
    }));
    const urlLink = `${this.ApiUrl1}quote/conditions/modify`;
    const reqData ={
      "ApplicationNo":this.ReferenceNo,
      "QuoteNo":this.premiumDetails.QuoteDetails?.QuoteNo,
      "BranchCode":this.userDetails?.BranchCode,
      "Conditions": {
        "Clauses": Clauses,
        "Wars": Wars,
        "Warranties":Warranties,
        "Exclusions":Exclusions
      }
    }
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.dialogRef.close(false);

      },
      (err) => { },
    );
  }

}
