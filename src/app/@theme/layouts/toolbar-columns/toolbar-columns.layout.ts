import { Component } from '@angular/core';

@Component({
  selector: 'ngx-toolbar-columns-layout',
  styleUrls: ['./toolbar-columns.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class ToolbarColumnsLayoutComponent {}
