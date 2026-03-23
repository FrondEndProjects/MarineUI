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
    //     this.stepperList = [
    //   { isActive: true, name: 'Risk', title: 'customerinfo', url: `${this.routerBaseLink}/new-quotes/customer-info`, step: 1 },
    //   { isActive: false, name: 'Premium', title: 'premiuminfo', url: `${this.routerBaseLink}/new-quotes/premium-info`, step: 2 },
    //   { isActive: false, name: 'Document', title: 'policygenerate', url: `${this.routerBaseLink}/new-quotes/policy-generate`, step: 3 },
    //   { isActive: false, name: 'Policy', title: 'policygenerate', url: `${this.routerBaseLink}/new-quotes/policy-generate`, step: 4 },
    // ];

    this.stepperList = [
      { isActive: true, name: '1', title: 'newopencover', url: '/Marine/new-open-cover/new-open-cover-form', step: 1 },
      { isActive: false, name: '2', title: 'countryandcommodity', url: '/Marine/new-open-cover/country-commodity-info', step: 2 },
      { isActive: false, name: '3', title: 'coverageinfo', url: '/Marine/new-open-cover/coverage-info', step: 3 },
      { isActive: false, name: '4', title: 'commoodityinfo', url: '/Marine/new-open-cover/commodity-info', step: 4 },
      { isActive: false, name: '5', title: 'premiumcomputation', url: '/Marine/new-open-cover/premium-computation', step: 5 },
      { isActive: false, name: '6', title: 'policygenerate', url: '/Marine/new-open-cover/policy-generate-cover', step: 6 },
      { isActive: false, name: '7', title: 'confirmation', url: '/Marine/new-open-cover/confirmation', step: 7 },
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
        // const index = this.stepperList.findIndex((ele: any) => ele.title === customData);
        // console.log(index);
        // const name: any = this.stepperList[index].name;
        const index = this.stepperList.findIndex(
          (el: any) => el.title === customData
        );

        if (index !== -1) {
          const currentStep = this.stepperList[index].step;

          this.stepperList.forEach(step => {
            step.isActive = step.step <= currentStep;
          });
        }

        this.activatedRoute.queryParams.subscribe(params => {
          this.ProposalNo = params['ProposalNo'];
          if (this.ProposalNo) {
            this.onEditOpenCoverForm();
          }
          else {

            this.ngOnDestroy();
            sessionStorage.removeItem('OpenCoverEdit');
          }

        });
        // if(this.ProposalNo){
        //   this.onEditOpenCoverForm();
        // }
        console.log(this.stepperList);

      });



  }

  ngOnInit(): void {
    const id = this.userDetails?.Result?.InsuranceId;
    if (id !== '100044' && id !== '100053') {
      document.documentElement.style.setProperty('--teal', 'rgb(30,64,175)');
      document.documentElement.style.setProperty('--teal-dark', '#042181');
      document.documentElement.style.setProperty('--teal-d', '#042181');
    } else {
      document.documentElement.style.setProperty('--teal', '#1C7988');
      document.documentElement.style.setProperty('--teal-dark', '#145f6c');
      document.documentElement.style.setProperty('--teal-d', '#145f6c');
    }
  }
  onEditOpenCoverForm() {
    const user = this.userDetails?.LoginResponse;
    const reqData = {
      'BranchCode': user?.BranchCode,
      'ProposalNo': this.ProposalNo,
    };
    sessionStorage.setItem('OpenCoverEdit', JSON.stringify(reqData));
    // const urlLink = `${this.ApiUrl1}OpenCover/quote/edit`;
    // const user = this.userDetails?.LoginResponse;
    // const reqData = {
    //   'BranchCode': user?.BranchCode,
    //   'ProposalNo': this.ProposalNo,
    // };
    // sessionStorage.setItem('OpenCover',JSON.stringify(reqData));
    // this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
    //   (data: any) => {
    //     console.log('editData', data);
    //     if (data?.Result?.ProposalNo) {
    //       if(data?.Result?.OpenCoverNo){
    //         const opencover = {
    //           'name':'adminReferral',
    //           'value':data?.Result?.OpenCoverNo
    //         }
    //          sessionStorage.setItem('OpenCover',JSON.stringify(opencover));
    //       }

    //       this.openCoverService.onGetCoverEditData(data?.Result);
    //       sessionStorage.setItem('MissippiCode',data?.Result?.MissippiCode);

    //     }
    //   },
    //   (err) => { },
    // );
  }
  // reloadCurrentRoute() {
  //   this.router.navigate(['/Marine/new-open-cover/new-open-cover-form']);
  //   //window.location.href ='/Marine/new-open-cover/new-open-cover-form';
  // }
  ngOnDestroy() {
    this.openCoverService.openCoverEdit.next(null)
  }
}
