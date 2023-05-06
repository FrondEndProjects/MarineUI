import { PortfolioComponent } from './portfolio.component';
import { BackBtnModule } from '../../shared/back-btn/back-btn.module';
import { MaterialModule } from '../../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
import { DirectivesModule } from '../../shared/Directives/directives.module';
import { TablesModule } from '../../shared/Tables/tables.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { NbMomentDateModule } from '@nebular/moment';
import { CurrencyPipe } from '../../shared/pipes/currency.pipe';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgxMaskModule } from 'ngx-mask';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import { ProtfolioGridComponent } from './components/protfolio-grid/protfolio-grid.component';
import { PortfolioService } from './portfolio.service';
import { CanceledPoliciesComponent } from './components/canceled-policies/canceled-policies.component';
import { FailedPoliciesComponent } from './components/failed-policies/failed-policies.component';
import { ViewcancelpolicyComponent } from './components/viewcancelpolicy/viewcancelpolicy.component';
//import { ViewPortfolioComponent } from './components/viewportfolio/viewportfolio.component';






@NgModule({
  declarations: [
    PortfolioComponent,
    ProtfolioGridComponent,
    CanceledPoliciesComponent,
    FailedPoliciesComponent,
    ViewcancelpolicyComponent
    //ViewPortfolioComponent
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
    PortfolioRoutingModule,
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
    DragDropModule,
    NgxMaskModule.forRoot(),
    BackBtnModule
  ],
  bootstrap: [PortfolioComponent],
  providers: [
    CurrencyPipe,
    PortfolioService,
  ],
})
export class PortfolioModule { }
