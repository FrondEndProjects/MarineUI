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
import { QuotesRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './quotes.component';
import { ExistQuoteComponent } from './components/exist-quote/exist-quote.component';
import { LapsedQuoteComponent } from './components/lapsed-quote/lapsed-quote.component';
import { QuotesService } from './quotes.service';
import { RejectedQuoteComponent } from './components/rejected-quote/rejected-quote.component';
import { ConfirmPromptComponent } from './components/confirm-prompt/confirm-prompt.component';





@NgModule({
  declarations: [
    QuotesComponent,
    ExistQuoteComponent,
    LapsedQuoteComponent,
    RejectedQuoteComponent,
    ConfirmPromptComponent
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
    QuotesRoutingModule,
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

  ],
  bootstrap: [QuotesComponent],
  providers: [
    CurrencyPipe,
    QuotesService,
  ],
})
export class QuotesModule { }
