import { ReferralComponent } from './referral.component';
import { MaterialModule } from '../../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
// tslint:disable-next-line: max-line-length
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
import { DirectivesModule } from '../../shared/Directives/directives.module';
import { TablesModule } from '../../shared/Tables/tables.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { NbMomentDateModule } from '@nebular/moment';
import { CurrencyPipe } from '../../shared/pipes/currency.pipe';
import { DigitOnlyModule } from '@uiowa/digit-only';
import {ReferralRoutingModule } from './referral-routing.module';
import { BackBtnModule } from '../../shared/back-btn/back-btn.module';
import { ApprovedComponent } from './components/approved/approved.component';
import { UnApprovedComponent } from './components/un-approved/un-approved.component';
import { RejectedComponent } from './components/rejected/rejected.component';
import { ConfirmPromptComponent } from './components/confirm-prompt/confirm-prompt.component';

@NgModule({
  declarations: [
   ReferralComponent,
   ApprovedComponent,
   UnApprovedComponent,
   RejectedComponent,
   ConfirmPromptComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    ReferralRoutingModule,
    NbInputModule,
    NbSelectModule,
    NbPopoverModule,
    TablesModule,
    NbSearchModule,
    NbDatepickerModule,
    NbMomentDateModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
    BackBtnModule
  ],
  bootstrap: [ReferralComponent],
  providers: [
    CurrencyPipe,
    ReferralComponent
  ],
})
export class ReferralModule { }
