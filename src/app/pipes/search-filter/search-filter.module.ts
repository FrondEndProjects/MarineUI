import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { ChartsModule } from 'ng2-charts';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from './search-filter.pipe';
@NgModule({
  imports: [
    FormsModule,
    //ChartsModule,
    CommonModule,
    ButtonsModule.forRoot(),
    
  ],
  declarations: [ SearchFilterPipe ],
  exports :[ SearchFilterPipe ]
})
export class SearchFilterModule { }
