import { NgModule, Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'commaseparator',
})
export class Commaseparator implements PipeTransform {
  constructor() { }

  transform(value: any): any {
    if (value) {
      console.log(value);
      // const cooma: any = value?.replace(/[^0-9.]|(?<=\..*)\./g, "")
      const removecomma: any = value.toString().replace(/,/g, '')
      //value.toString().replace(/[^0-9.]|(?<=\..*)\./g, "")
      //replace(/,/g, '');
      console.log('commasss', removecomma);

      const number: any = (Number(removecomma));
      
      const b:any= new Intl.NumberFormat('en').format(number);
        
    if(!Number.isNaN(b)){
      console.log('NNNNNNNNNNNN',Number.isNaN(b))
      return new Intl.NumberFormat('en').format(number);
      }
      else {
        return 0
      }
      
    } else {
      return '';
    }

  }

}
