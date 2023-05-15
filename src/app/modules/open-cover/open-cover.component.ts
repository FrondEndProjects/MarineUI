import { OpenCoverService } from './open-cover.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as Mydatas from '../../app-config.json';
import { filter, map } from 'rxjs/operators';
import { NbMenuService } from '@nebular/theme';
import { SessionStorageService } from '../../shared/storage/session-storage.service';

@Component({
  selector: 'app-open-cover',
  templateUrl: './open-cover.component.html',
  styleUrls: ['./open-cover.component.scss'],
})
export class OpenCoverComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public ProposalNo: any = '';
  public currentStep = 1;
  public numSteps = 4;
  public stepperList: any[] = [];
  stepperListSlice: any[] = [];
  constructor(
    private openCoverService: OpenCoverService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private menuService: NbMenuService,
    private sessionStorageService: SessionStorageService

  ) {
    this.stepperList = [
      { isActive:false, name: '1', title: 'newopencover', url: '/Marine/new-open-cover/new-open-cover-form'},
      { isActive:false, name: '2', title: 'countryandcommodity', url: '/Marine/new-open-cover/country-commodity-info'},
      { isActive:false, name: '3', title: 'coverageinfo', url: '/Marine/new-open-cover/coverage-info'},
      { isActive:false, name: '4', title: 'commoodityinfo', url: '/Marine/new-open-cover/commodity-info'},
      { isActive:false, name: '5', title: 'premiumcomputation', url: '/Marine/new-open-cover/premium-computation'},
      { isActive:false, name: '6', title: 'policygenerate', url: '/Marine/new-open-cover/policy-generate-cover'},
      { isActive:false, name: '7', title: 'confirmation', url: '/Marine/new-open-cover/confirmation'},
    ];

    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;

    this.menuService.onItemClick().subscribe((data) => {
      console.log(data);

      if (data.item.link === '/Marine/new-open-cover/new-open-cover-form') {
      sessionStorage.removeItem('ProposalNo');

       // this.reloadCurrentRoute();
      }
    });
    this.router
    .events
    .pipe(filter(event => event instanceof NavigationEnd))
    .pipe(map(() => {
      let child = this.activatedRoute.firstChild;
      while (child) {
        if (child.firstChild) {
          child = child.firstChild;
        } else if (child.snapshot.data && child.snapshot.data['title']) {
          return child.snapshot.data['title'];
        } else {
        }
      }
    })).subscribe((customData: any) => {
      console.log(customData);
      const index = this.stepperList.findIndex((ele: any) => ele.title === customData );
      console.log(index);
      const name:any = this.stepperList[index].name;

      this.stepperList.map((el:any)=>{
        if(el.name < name){
          el.isActive = true;
        }else{
          el.isActive = false;

        }
      })
      this.ProposalNo = sessionStorage.getItem('ProposalNo');
      if(this.ProposalNo){
        this.onEditOpenCoverForm();
      }
      console.log(this.stepperList);

    });



   }

  ngOnInit(): void {

  }
  onEditOpenCoverForm() {
    const urlLink = `${this.ApiUrl1}OpenCover/quote/edit`;
    const user = this.userDetails?.LoginResponse;
    const reqData = {
      'BranchCode': user?.BranchCode,
      'ProposalNo': this.ProposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('editData', data);
        if (data?.Result?.ProposalNo) {
          if(data?.Result?.OpenCoverNo){
            const opencover = {
              'name':'adminReferral',
              'value':data?.Result?.OpenCoverNo
            }
             sessionStorage.setItem('OpenCover',JSON.stringify(opencover));
          }

          this.openCoverService.onGetCoverEditData(data?.Result);
          sessionStorage.setItem('MissippiCode',data?.Result?.MissippiCode);

        }
      },
      (err) => { },
    );
  }
  // reloadCurrentRoute() {
  //   this.router.navigate(['/Marine/new-open-cover/new-open-cover-form']);
  //   //window.location.href ='/Marine/new-open-cover/new-open-cover-form';
  // }
  ngOnDestroy() {
    this.openCoverService.openCoverEdit.next(null)
  }
}
