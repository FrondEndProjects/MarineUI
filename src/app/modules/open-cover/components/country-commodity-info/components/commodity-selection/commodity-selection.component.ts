import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../../../app-config.json';
import { AppComponent } from '../../../../../../app.component';
import { OpenCoverService } from '../../../../open-cover.service';
import { CountryCommodityInfoComponent } from '../../country-commodity-info.component';
@Component({
  selector: 'app-commodity-selection',
  templateUrl: './commodity-selection.component.html',
  styleUrls: ['./commodity-selection.component.scss'],
})
export class CommoditySelectionComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public proposalNo = '';
  public userDetails: any;
  public filterValue: any = '';
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public OpenCover:any;

  constructor(
    private openCoverService: OpenCoverService,
    private countryCommodityInfoComponent: CountryCommodityInfoComponent,
    private appComponent: AppComponent,
  ) {
    this.proposalNo = this.countryCommodityInfoComponent.proposalNo;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));


  }

  ngOnInit(): void {
    this.onEdit();
  }

  onSelectCustomer(item: any) {
    console.log(item);
  }

  onEdit() {
    const urlLink = `${this.ApiUrl1}OpenCover/commodity/edit`;
    const reqData = {
      'BranchCode': this.userDetails.BranchCode,
      'ProposalNo': this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        this.tableData = data?.Result?.CommodityInfo.map((ele:any)=>({
          ...ele,
          Fragile:ele.Fragile == null || ele.Fragile == 'false' ? false : true,
          isChecked:ele.OptedCommodity == null || ele.OptedCommodity == 'false'? false : true
        }))
        console.log(data);

      },
      (err) => { },
    );

  }
  onSubmit() {
    const filterCheckedList = this.tableData.filter((ele: any) => ele.isChecked === true);
    console.log(filterCheckedList);
    const CommodityInfo: any[] = filterCheckedList.map(x => ({
      "CommodityDescription": x.CommodityDescription,
      "CommodityId": x.CommodityId,
      "CommodityName": x.CommodityName,
      "CommodityTypeId": '0',
      "Fragile": x.Fragile
    }));
    const urlLink = `${this.ApiUrl1}OpenCover/commodity/save`;
    const reqData = {
      "CommodityInfo": CommodityInfo,
      "OpenCoverNo": this.OpenCover?.value,
      "ProposalNo": this.proposalNo
    }
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
      },
      (err) => { },
    );

  }

}
