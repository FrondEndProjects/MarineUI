import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CountryCoverAppEditComponent } from './country-cover-app-edit/country-cover-app-edit.component';
import { CountryCoverTableComponent } from './country-cover-table/country-cover-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbDatepickerModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { TablesModule } from '../../../../shared/Tables/tables.module';
import { CountryCoverComponent } from './country-cover.component';
import { CountryCoverRoutingModule } from './country-cover-routing.module';
import { MaterialModule } from '../../../../shared/material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from '../../../../shared/date-formatt/custom-adapter';
import { CustomDateParserFormatter } from '../../../../shared/date-formatt/custom-date-parser-formatter';
import { OpenCoverService } from '../../../open-cover/open-cover.service';



@NgModule({
  declarations: [
    CountryCoverComponent,
    CountryCoverAppEditComponent,
    CountryCoverTableComponent
  ],
  imports: [
    CommonModule,
    CountryCoverRoutingModule,
    TablesModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    
    // 3rd party
    NbDatepickerModule,
    NgSelectModule,
    NbCardModule,
    NgbModule,

    // material
    MaterialModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    
    
  ],
  providers: [
    CurrencyPipe,
    OpenCoverService,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class CountryCoverModule { }
