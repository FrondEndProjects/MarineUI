import { NgModule, Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  constructor() {}

  transform(value: any, country: any): any {
    if (value && value !== '') {
      const countryList: any = country.find(ele => ele.Code === value);
      console.log(country, value);
      return countryList?.CodeValue;
    } else {
      return '';
    }

  }

}
