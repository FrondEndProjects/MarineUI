import { Component } from '@angular/core';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
  <nb-layout-header>
    <ngx-header></ngx-header>
      <!-- <ng-content select=""></ng-content> -->
    <!-- </div> -->
  </nb-layout-header>

  <nb-layout-column>
    <ng-content select="app-opencover-header-info"></ng-content>
    <ng-content select="router-outlet"></ng-content>
  </nb-layout-column>

  <nb-layout-footer fixed>
    <ngx-footer></ngx-footer>
  </nb-layout-footer>
</nb-layout>

  `,
})
export class OneColumnLayoutComponent { }
