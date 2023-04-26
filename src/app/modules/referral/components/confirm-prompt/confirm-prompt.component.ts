import { ReferralService } from './../../referral.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as Mydatas from '../../../../app-config.json';

@Component({
  selector: 'app-confirm-prompt',
  templateUrl: './confirm-prompt.component.html',
  styleUrls: ['./confirm-prompt.component.scss']
})
export class ConfirmPromptComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;

  public reasonList:any[] = [];
  public selectedReason:any=null;
  constructor(
    public dialogRef: MatDialogRef<ConfirmPromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private referralService:ReferralService
  ) {
    this.reasonList = data?.items;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;

  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    const urlLink = `${this.ApiUrl1}menu/update/rejectquotestaus`;
    const reqData = {
      "LapsedUpdatedBy":this.userDetails?.LoginId,
      "LapsedRemarks":this.selectedReason,
      "QuoteNo":this.data?.row?.QuoteNo
    };
    this.referralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if(data?.Result == 'SUCCESS'){
          this.dialogRef.close(true);
        }
      },
      (err) => { },
    );
  }

}
