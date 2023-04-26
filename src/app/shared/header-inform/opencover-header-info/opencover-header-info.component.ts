import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-opencover-header-info',
  templateUrl: './opencover-header-info.component.html',
  styleUrls: ['./opencover-header-info.component.scss']
})
export class OpencoverHeaderInfoComponent implements OnInit,OnChanges {
  @Input('headerDetails') headerDetails:any={};
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.headerDetails)
  }

}
