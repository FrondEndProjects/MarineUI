import { SessionStorageService } from './shared/storage/session-storage.service';
import { TablesModule } from './shared/Tables/tables.module';
import { MaterialModule } from './shared/material/material.module';
import { AuthGuard } from './Auth/auth.guard';
import { AuthService } from './Auth/auth.service';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OpenCoverDocument } from './modules/Admin/LoginCration/opencover/opencover.component';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbInputModule,
  NbCardModule,
  NbActionsModule,
  NbButtonModule,
  NbUserModule,
  NbCheckboxModule,
  NbRadioModule,
  NbSelectModule,
  NbIconModule,
  NbTabsetModule,
} from '@nebular/theme';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from './layout/components/navbar/navbar.component';
import { ProductSelectionComponent } from './modules/product-selection/product-selection.component';
import { HttpInterceptorService } from './HttpInterceptors/http-interceptor.service';
import { CustomLoadingService } from './shared/custom-loading.service';
import { OpenCoverGridComponent } from './modules/open-cover-grid/open-cover-grid.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { ProductLayoutComponent } from './layout/product-layout/product-layout.component';
import { OpenCoverLayoutComponent } from './layout/open-cover-layout/open-cover-layout.component';
import { HeaderInformModule } from './shared/header-inform/header-inform.module';
import { IndividualPolicyLayoutComponent } from './layout/individual-policy-layout/individual-policy-layout.component';
import { ReportComponent } from './modules/report/report.component';
import { NbMomentDateModule } from '@nebular/moment';
import { CopyQuoteComponent } from './modules/copy-quote/copy-quote.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from './shared/date-formatt/custom-adapter';
import { CustomDateParserFormatter } from './shared/date-formatt/custom-date-parser-formatter';
import { NgxMaskModule } from 'ngx-mask';
import { SearchComponent } from './modules/search/search.component';
import { EndorsementComponent } from './modules/endorsement/endorsement.component';
import { SessionRedirectComponent } from './layout/components/session-redirect/session-redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    AdminLayoutComponent,
    NavbarComponent,
    ProductSelectionComponent,
    OpenCoverGridComponent,
    LoginLayoutComponent,
    ProductLayoutComponent,
    OpenCoverLayoutComponent,
    IndividualPolicyLayoutComponent,
    ReportComponent,
    CopyQuoteComponent,
    SearchComponent,
    EndorsementComponent,
    OpenCoverDocument,
    SessionRedirectComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NbDatepickerModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbMenuModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    NgSelectModule,
    NgxPaginationModule,
    MaterialModule,
    NbTabsetModule,
    TablesModule,
    HeaderInformModule,
    NbMomentDateModule,
    NgbModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    CustomLoadingService,
    SessionStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
