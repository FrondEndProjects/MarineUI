import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../../app-config.json';
import { CommodityClausesComponent } from '../../../../../../shared/Tables/commodity-clauses/commodity-clauses.component';
import { OpenCoverService } from '../../../../open-cover.service';
@Component({
  selector: 'app-commodity-clauses-table',
  templateUrl: './commodity-clauses-table.component.html',
  styleUrls: ['./commodity-clauses-table.component.scss']
})
export class CommodityClausesTableComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public proposalNo = '';
  public userDetails: any;
  public clausesList: any[] = [];
  public filterValue: any = '';
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public innerTableData: any[] = [];
  public innerColumnHeader: any[] = [];
  public subInnerTableData: any[] = [];
  public subInnerColumnHeader: any[] = [];

  public warYN: any;
  public iscollapse: any = '';
  public isEnabledDropdown: boolean=false;

  constructor(
    private openCoverService: OpenCoverService,
    private router: Router,
  ) {
    this.proposalNo = sessionStorage.getItem('ProposalNo');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
  }

  ngOnInit(): void {
    this.onGetCoverClauses();
  }

  async onGetCoverClauses() {
    const war: any = await this.onGetWar();
    this.warYN = war?.Result;
    const urlLink = `${this.ApiUrl1}OpenCover/transport/cover/clauses`;
    const reqData = {
      "ProposalNo": this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('clauses', data);
        this.clausesList = data?.Result;
        this.columnHeader = [
          {
            key: 'CoverName',
            display: 'Cover Name',
          },
          {
            key: 'clauses',
            display: 'Clauses',
            config: {
              isEdit: true,
            },
          },
        ];
        let staticList: any[] = [
          { CoverName: 'Warranties', CoverId: '1', isColor: true, staticObj: {} },
          { CoverName: 'Exclusions', CoverId: '1', isColor: true, staticObj: {} },
          { CoverName: 'Others', isColor: true, staticObj: {} },
        ]
        if (this.warYN == 'Y') {
          staticList.splice(2, 0, { CoverName: 'War', isColor: true, staticObj: {} },)
        }
        this.tableData = [...staticList, ...this.clausesList];
        this.tableData = this.tableData.map(x=>({
          ...x,
          isClicked:false
        }));
      },
      (err) => { },
    );

  }


  onGetcommoditySelectList(item: any) {
    const urlLink = `${this.ApiUrl1}OpenCover/commodity/edit/list`;
    const reqData = {
      "ProposalNo": this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('commodity-select', data);

        this.subInnerColumnHeader = [
          {
            key: 'CommodityName',
            display: 'Commodity Name',
            config: {
              isCheckCommodity: true,
            },
          },

        ];
        this.subInnerTableData = data?.Result || [];
      },
      (err) => { },
    );

  }
  async onGetWar() {
    const urlLink = `${this.ApiUrl1}OpenCover/warsrccyn`;
    const reqData = {
      "ProposalNo": this.proposalNo,
    };
    let response = (await this.openCoverService.onPostMethodAsync(urlLink, reqData)).toPromise()
      .then(res => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    return response;

  }

  // onGetOtherClausesList(item: any) {
  //   const urlLink = `${this.ApiUrl1}OpenCover/optionalcondition/edit`;
  //   const reqData = {
  //     "ProposalNo": this.proposalNo,
  //     "CoverId":"11",
  //     "BranchCode":"01"
  //   };
  //   this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
  //     (data: any) => {
  //       console.log('commodity-select', data);

  //     },
  //     (err) => { },
  //   );

  // }

}
