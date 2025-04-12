import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import * as Mydatas from '../../../../../../app-config.json';
import { NewQuotesService } from '../../../../new-quotes.service';
import { CustomerInfoComponent } from '../../customer-info.component';
import { OpenCoverLayoutComponent } from '../../../../../../layout/open-cover-layout/open-cover-layout.component';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
  selector: 'app-broker-form',
  templateUrl: './broker-form.component.html',
  styleUrls: ['./broker-form.component.scss']
})
export class BrokerFormComponent implements OnInit {

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;

  public submitted: boolean;
  public brokerForm!: FormGroup;
  public dropChannelList: any[] = [];
  public dropBrokerList: any[] = [];
  public OpenCover:any;
  @ViewChild('formDirective') public brokerFormDirective: NgForm;
  headerDetails: any;
  el: boolean;
  item:any;
  constructor(
    private _formBuilder: FormBuilder,
    private newQuotesService: NewQuotesService,
    private customerInfoComponent: CustomerInfoComponent,
    private opencoverComponent:OpenCoverLayoutComponent
  ) {
    this.userDetails = this.customerInfoComponent?.userDetails;
    this.productId = this.customerInfoComponent?.productId;
    this.brokerForm = this.customerInfoComponent.brokerForm;
    this.loginId = this.customerInfoComponent.loginId;
    this.applicationId = this.customerInfoComponent.applicationId;
    this.OpenCover = this.customerInfoComponent.OpenCover;
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));
    if(this.OpenCover){
      if(this.OpenCover?.name == 'adminReferral'){
            this.productId = this.OpenCover?.productId;
      } 
    }
    this.dropChannelList=[
      {name:'Broker',id:'broker'},
      {name:'Cash',id:'cash'},
    ]
    this.droplist();
    this.item=sessionStorage.getItem('Exist');
    
  }
  droplist(){
    const urlLink = `${this.ApiUrl1}quote/dropdown/channeltype`;
    this.newQuotesService.onGetMethodSync(urlLink).subscribe((data: any) => {
      console.log(data);
      this.dropChannelList = data?.Result;
    });
  }
  ngOnInit(): void {
    if(this.brokerF.channel.value!=null && this.brokerF.channel.value!='null'){
      this.onChangeChannel('direct');
      console.log('YYYYYYYYYYYYYYYYYYY',this.brokerF.channel.value);
    }
    else{
      this.brokerF.channel.setValue('Broker');this.onChangeChannel('direct');} 
   
  }

  get brokerF() {
    return this.brokerForm.controls;
  }

  onChangeChannel(type){
    if(type=='change') 
    {
      this.brokerForm.controls['borker'].setValue('');
    }
    var urlLink:any = this.brokerF.channel.value == 'cash'?`${this.ApiUrl1}quote/dropdown/cash`:`${this.ApiUrl1}quote/dropdown/broker`;
    const reqData = {
      "BranchCode":this.userDetails.BranchCode,
      "BrokerCode":"",
      "OriginationCountryCode":"",
      "DestinationCountryCode":"",
      "LoginId":this.loginId,
      "ModeOfTransportCode":"",
      "OpenCoverNo":this.OpenCover?.value,
      "ProductId":this.productId,
      "IncotermCode":"",
      "IncotermPercent":"",
      "CoverCode":"",
      "ChannelType": this.brokerF.channel.value
    }

    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.dropBrokerList = data?.Result;
          this.newQuotesService.BrokerList = data?.Result;
          if(this.productId=='11' && type!='change'){
            //alert("Broker Change Function")
              this.headerDetails = this.opencoverComponent?.headerDetails;
              console.log("Entry",this.headerDetails);
              if(this.headerDetails){
                  let entry = this.dropBrokerList.find(ele=>ele.CodeDescription==this.headerDetails?.BrokerName)
                  sessionStorage.setItem('dropBrokerList', JSON.stringify(this.dropBrokerList));
                  if(this.productId=='11'){
                  this.brokerForm.controls['borker'].setValue(entry.Code);
                  this.brokerForm.controls['channel'].setValue('Broker');
                  this.brokerForm.controls['channel'].disable();
                  this.brokerForm.controls['borker'].disable(); 
                  }
                  else{
                    this.brokerForm.controls['borker'].setValue(entry.Code);
                    //this.brokerForm.controls['channel'].setValue('');
                    this.brokerForm.controls['channel'].enable();
                    this.brokerForm.controls['borker'].enable();
                  }
              }
          }
        }
      },
      (err) => { },
    );
  }
  checkBrokerDisabel(){
    let value = this.brokerForm.controls['borker'].value;
    if(this.productId=='11'){
      return (value!=null && value !='' && value!=undefined);
    }
    else return false
  }
  onChangeBroker(){
    let value = this.brokerForm.controls['borker'].value;
    if(value!=''){
      this.customerInfoComponent.checkCustomerList(value);
    }
  }
}
