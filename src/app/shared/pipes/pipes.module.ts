import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Commaseparator } from './commaseparator.pipe';
import { CountryFilterPipe } from './country-filter.pipe';
import { CurrencyPipe } from './currency.pipe';
import { MydisabledPipe } from './mydisabled.pipe';
import { FilterPipe } from './filter.pipe';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ CurrencyPipe, Commaseparator, CountryFilterPipe, MydisabledPipe,FilterPipe],
  exports : [ CurrencyPipe, Commaseparator, CountryFilterPipe, MydisabledPipe,FilterPipe ],
})
export class PipesModule { }
