import { OpenCoverComponent } from './open-cover.component';
import { MaterialModule } from './../../shared/material/material.module';
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
import { OpenCoverService } from './open-cover.service';
import { OpenCoverRoutingModule } from './open-cover-routing.module';
import { NewOpenCoverComponent } from './components/new-open-cover/new-open-cover.component';
import { CountryCommodityInfoComponent } from './components/country-commodity-info/country-commodity-info.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CoverageInfoComponent } from './components/coverage-info/coverage-info.component';
import { CommodityInfoComponent } from './components/commodity-info/commodity-info.component';
import { PremiumComputationComponent } from './components/premium-computation/premium-computation.component';
import { PolicyGenerateCoverComponent } from './components/policy-generate-cover/policy-generate-cover.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ExistOpenCoverComponent } from './components/exist-open-cover/exist-open-cover.component';
import { OrginCountryComponent } from './components/country-commodity-info/components/orgin-country/orgin-country.component';
import { DestCountryComponent } from './components/country-commodity-info/components/dest-country/dest-country.component';
import { CustomerSelectionComponent } from './components/country-commodity-info/components/customer-selection/customer-selection.component';
import { CommoditySelectionComponent } from './components/country-commodity-info/components/commodity-selection/commodity-selection.component';
import { SaleTermComponent } from './components/country-commodity-info/components/sale-term/sale-term.component';
import { CommodityClausesTableComponent } from './components/commodity-info/components/commodity-clauses-table/commodity-clauses-table.component';
import { WarComponent } from './components/commodity-info/components/war/war.component';
import { SharePercentageComponent } from './components/commodity-info/components/share-percentage/share-percentage.component';
import { EndorsementComponent } from './components/commodity-info/components/EnodrsementAdmin/endorsementadmin.component';
import { LandTrasitComponent } from './components/commodity-info/components/land-trasit/land-trasit.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from '../../shared/date-formatt/custom-date-parser-formatter';
import { CustomAdapter } from '../../shared/date-formatt/custom-adapter';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';





@NgModule({
  declarations: [
   OpenCoverComponent,
   NewOpenCoverComponent,
   CountryCommodityInfoComponent,
   CoverageInfoComponent,
   CommodityInfoComponent,
   PremiumComputationComponent,
   PolicyGenerateCoverComponent,
   ConfirmationComponent,
   ExistOpenCoverComponent,
   OrginCountryComponent,
   DestCountryComponent,
   CustomerSelectionComponent,
   CommoditySelectionComponent,
   SaleTermComponent,
   CommodityClausesTableComponent,
   WarComponent,
   SharePercentageComponent,
   EndorsementComponent,
   LandTrasitComponent,
  ],
  imports: [
    MatTableModule,
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    DirectivesModule,
    NgSelectModule,
    MatRadioModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    OpenCoverRoutingModule,
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
    NgbModule

  ],
  bootstrap: [OpenCoverComponent],
  providers: [
    CurrencyPipe,
    OpenCoverService,
    // { provide: NgbDateAdapter, useClass: CustomAdapter },
    // { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class OpenCoverModule { }
