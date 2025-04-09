import { NewQuotesService } from './new-quotes.service';
import { EndorsementTypeComponent } from './components/endorsement-type/endorsement-type.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
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
import { NewQuotesComponent } from './new-quotes.component';
import { NewQuotesRoutingModule } from './new-quotes-routing.module';
import { CustomerFormComponent } from './components/customer-info/components/customer-form/customer-form.component';
import { QuoteFormComponent } from './components/customer-info/components/quote-form/quote-form.component';
import { PremiumInfoComponent } from './components/premium-info/premium-info.component';
import { PolicyGenerateComponent } from './components/policy-generate/policy-generate.component';
import { BankFormComponent } from './components/customer-info/components/bank-form/bank-form.component';
import { EndorsementGridComponent } from './components/endorsement-grid/endorsement-grid.component';
import { BackBtnModule } from '../../shared/back-btn/back-btn.module';
import { BrokerFormComponent } from './components/customer-info/components/broker-form/broker-form.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from '../../shared/date-formatt/custom-date-parser-formatter';
import { CustomAdapter } from '../../shared/date-formatt/custom-adapter';
import { ClausesComponent } from './components/clauses/clauses.component';
import { NgxMaskModule } from 'ngx-mask';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import {MatRadioModule} from '@angular/material/radio';
import { NbThemeModule, NbLayoutModule} from '@nebular/theme';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [
    NewQuotesComponent,
    CustomerInfoComponent,
    QuoteFormComponent,
    CustomerFormComponent,
    BankFormComponent,
    PremiumInfoComponent,
    PolicyGenerateComponent,
    EndorsementTypeComponent,
    EndorsementGridComponent,
    BrokerFormComponent,
    ClausesComponent,
  ],
  imports: [
    CommonModule,
    NbThemeModule,
    NbLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    // BrowserAnimationsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbEvaIconsModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NewQuotesRoutingModule,
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
    BackBtnModule,
    NgbModule,
    NgxMaskModule,
    MatRadioModule,
  ],
  bootstrap: [NewQuotesComponent],
  providers: [
    CurrencyPipe,
    NewQuotesService,
    FilterPipe
    // { provide: NgbDateAdapter, useClass: CustomAdapter },
    // { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class NewQuotesModule { }
