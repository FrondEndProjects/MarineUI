import { MaterialModule } from '../../../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
import { DirectivesModule } from '../../../shared/Directives/directives.module';
import { TablesModule } from '../../../shared/Tables/tables.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { NbMomentDateModule } from '@nebular/moment';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { BackBtnModule } from '../../../shared/back-btn/back-btn.module';
import { ExpiredComponent } from './expiredopencover.component';
import { ExpiredRoutingModule } from './expiredopencover-routing.module';
//import { AdminReferralRoutingModule } from './pending.component-routing.module';


@NgModule({
  declarations: [
  ExpiredComponent
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
    ExpiredRoutingModule,
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
  bootstrap: [ExpiredComponent],
  providers: [
    CurrencyPipe,
  ],
})
export class ExpiredModule { }
