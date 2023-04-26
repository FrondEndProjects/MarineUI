import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CoverTableComponent } from './cover-table/cover-table.component';
import { CoverAppEditComponent } from './cover-app-edit/cover-app-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NbDatepickerModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { TablesModule } from '../../../../shared/Tables/tables.module';
import { CoverComponent } from './cover.component';
import { CoverRoutingModule } from './cover-routing.module';
import { MaterialModule } from '../../../../shared/material/material.module';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from '../../../../shared/date-formatt/custom-adapter';
import { CustomDateParserFormatter } from '../../../../shared/date-formatt/custom-date-parser-formatter';
import { OpenCoverService } from '../../../open-cover/open-cover.service';



@NgModule({
  declarations: [
    CoverComponent,
    CoverTableComponent,
    CoverAppEditComponent
  ],
  imports: [
    CommonModule,
    CoverRoutingModule,
    TablesModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    // 3rd party
    NbDatepickerModule,
    NgSelectModule,
    NgbModule,

    // material
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
  ],
  providers: [
    CurrencyPipe,
    OpenCoverService,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class CoverModule { }
