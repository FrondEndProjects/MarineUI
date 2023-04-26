import { NgSelectModule } from '@ng-select/ng-select';
import { NbDatepickerModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesModule } from '../../../../shared/Tables/tables.module';
import { ConveyanceRoutingModule } from './conveyance-routing.module';
import { ConveyanceComponent } from './conveyance.component';
import { ConveyanceTableComponent } from './conveyance-table/conveyance-table.component';
import { ConveyanceAddAditComponent } from './conveyance-add-adit/conveyance-add-adit.component';

// Material
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
// 3rd party
// import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../../../shared/material/material.module';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from '../../../../shared/date-formatt/custom-adapter';
import { CustomDateParserFormatter } from '../../../../shared/date-formatt/custom-date-parser-formatter';
import { OpenCoverService } from '../../../open-cover/open-cover.service';

@NgModule({
  declarations: [
    ConveyanceComponent,
    ConveyanceTableComponent,
    ConveyanceAddAditComponent,
  ],
  imports: [
    CommonModule,
    ConveyanceRoutingModule,
    TablesModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    // 3rd party
    NbDatepickerModule,
    NgSelectModule,

    // material
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    NgbModule
  ],
  providers: [
    CurrencyPipe,
    OpenCoverService,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class ConveyanceModule { }
