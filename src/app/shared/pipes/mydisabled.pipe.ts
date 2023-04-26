import { NgModule, Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'mydisabled',
})
export class MydisabledPipe implements PipeTransform {
  constructor() {}

  transform(value: any,element:any): any {
    if (value) {
      if((value == 'Schedule' && element.Status == 'E') || (value == 'Edit' && element.Status == 'P')){
        return true;
      }else{
        return false;
      }
    } else {
      return false;
    }

  }

}
