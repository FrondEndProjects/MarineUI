import { NgModule, Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'countryFilter',
})
export class CountryFilterPipe implements PipeTransform {
  constructor() {}
  transform( country: any[], value: any): any {
    if (value && value !== '') {
      const filterValue = value.toLowerCase();
      return country.filter(option => option?.CodeDescription.toLowerCase().includes(filterValue));
    } else {
      return country;
    }

  }
}
