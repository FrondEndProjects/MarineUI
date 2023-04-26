import { PipesModule } from './../pipes/pipes.module';
import { MaterialTableComponent } from './material-table/material-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { DirectivesModule } from '../Directives/directives.module';
import { MaterialModule } from '../material/material.module';
import { GridTableComponent } from './grid-table/grid-table.component';
import { TransCoverTableComponent } from './trans-cover-table/trans-cover-table.component';
import { NgxCollapseModule } from 'ngx-collapse';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommodityTableComponent } from './commodity-table/commodity-table.component';
import { InnerTableComponent } from './commodity-table/inner-table/inner-table.component';
import { NbButtonModule, NbIconModule } from '@nebular/theme';
import { CommodityClausesComponent } from './commodity-clauses/commodity-clauses.component';
import { CommodityClausesListComponent } from './commodity-clauses/commodity-clauses-list/commodity-clauses-list.component';
import { CommoditySelectionComponent } from './commodity-clauses/commodity-clauses-list/commodity-selection/commodity-selection.component';
import { SharedService } from '../shared.service';
import { NgxMaskModule } from 'ngx-mask';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { NgScrollbarModule } from 'ngx-scrollbar';
@NgModule({
  declarations: [
    MaterialTableComponent,
    GridTableComponent,
    TransCoverTableComponent,
    CommodityTableComponent,
    InnerTableComponent,
    CommodityClausesComponent,
    CommodityClausesListComponent,
    CommoditySelectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MaterialModule,
    DirectivesModule,
    NgxCollapseModule,
    NbButtonModule,
    NgxMaskModule.forRoot(),
    DigitOnlyModule,
    NgScrollbarModule,
    NbIconModule,
    PipesModule


  ],
  exports: [
    MaterialTableComponent,
    GridTableComponent,
    TransCoverTableComponent,
    CommodityTableComponent,
    CommodityClausesComponent
  ],
  providers: [SharedService,DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],

})
export class TablesModule { }
