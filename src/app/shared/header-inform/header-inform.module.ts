import { HeaderInformComponent } from './header-inform.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbButtonModule } from '@nebular/theme';
import { OpencoverHeaderInfoComponent } from './opencover-header-info/opencover-header-info.component';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ HeaderInformComponent,OpencoverHeaderInfoComponent ],
  exports : [ HeaderInformComponent,OpencoverHeaderInfoComponent ],
})
export class HeaderInformModule { }
