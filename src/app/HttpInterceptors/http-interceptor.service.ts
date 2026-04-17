import { ErrorModalComponent } from './../shared/error/error-modal/error-modal.component';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as Mydatas from '../app-config.json';
import { CustomLoadingService } from '../shared/custom-loading.service';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '../shared/shared.service';
import { NbDialogService } from '@nebular/theme';
import Swal from 'sweetalert2';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  public AppConfig: any = (Mydatas as any).default;

  service_count = 0;
  totalRequests = 0;
  completedRequests = 0;
private readonly BRAND_COLOR = '#1d7280';
  constructor(
    public router: Router,
    private loader: CustomLoadingService,
    public dialog: MatDialog,
    private sharedService: SharedService,
    private dialogService: NbDialogService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.loader.show();
    this.totalRequests++;
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.openResponse(event.body)
        }
        return event;
      }),
      finalize(() => {
        this.completedRequests++;
        if (this.completedRequests === this.totalRequests) {
          this.loader.hide();
          this.sharedService.clearTimeOut();
          this.completedRequests = 0;
          this.totalRequests = 0;
        }

      }),
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          const errorList: any[] = err.error.ErrorMessage;
          if (errorList.length > 0) {
            this.openError(errorList);
          }
        }
        return throwError(err.message);
      }),
    );
  }

  // openResponse(res: any) {
  //   if (res?.ErrorMessage && res?.ErrorMessage.length > 0 || res?.Result?.ErrorMessage && res?.Result?.ErrorMessage.length > 0) {
  //     const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;

  //     // ✅ Skip popup if ANY error is a SessionError — handled by login component
  //     const hasSessionError = errorList.some((ele: any) => ele.Field === 'SessionError');
  //     if (hasSessionError) {
  //       return;
  //     }

  //     let ulList:any='';
  //     for (let index = 0; index < errorList.length; index++) {
  //       const element = errorList[index];
  //        ulList +=`<li class="list-group-item">
  //        <div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
  //        <div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
  //      </li>`

  //     }
  //     Swal.fire({
  //       title: '<strong>Form Validation</strong>',
  //       icon: 'info',
  //       html:
  //         `<ul class="list-group errorlist">
  //          ${ulList}
  //       </ul>`,
  //       showCloseButton: true,
  //       focusConfirm: false,
  //       confirmButtonText:
  //         '<i class="fa fa-thumbs-down"></i> Errors!',
  //       confirmButtonAriaLabel: 'Thumbs down, Errors!',
  //     })
  //   }
  // }

  // openError(res: any) {
  //   const errorList: any[] = res || [];
  //   if (errorList.length > 0) {
  //     console.log(errorList)
  //     let ulList:any='';
  //     for (let index = 0; index < errorList.length; index++) {
  //       const element = errorList[index];
  //        ulList +=`<li class="list-group-item">
  //        <div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
  //        <div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
  //      </li>`

  //     }
  //     Swal.fire({
  //       title: '<strong>Form Validation</strong>',
  //       icon: 'info',
  //       html:
  //         `<ul class="list-group errorlist">
  //          ${ulList}
  //       </ul>`,
  //       showCloseButton: true,
  //       focusConfirm: false,
  //       confirmButtonText:
  //         '<i class="fa fa-thumbs-down"></i> Errors!',
  //       confirmButtonAriaLabel: 'Thumbs down, Errors!',
  //     })

  //   }
  // }
  openResponse(res: any) {
    if (res?.ErrorMessage?.length > 0 || res?.Result?.ErrorMessage?.length > 0) {
      const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;

      const hasSessionError = errorList.some((ele: any) => ele.Field === 'SessionError');
      if (hasSessionError) return;

      this.showSwalPopup(errorList);
    }
  }

  openError(res: any) {
    const errorList: any[] = res || [];
    if (errorList.length > 0) {
      this.showSwalPopup(errorList);
    }
  }

  // Refactored helper method to avoid code duplication
  private showSwalPopup(errorList: any[]) {
    let ulList = '';
    errorList.forEach(element => {
      ulList += `
        <li class="list-group-item" style="border-left: 5px solid ${this.BRAND_COLOR}">
          <div style="color: ${this.BRAND_COLOR}; font-weight: bold;">Field: ${element?.Field}</div>
          <div style="color: #666;">Message: ${element?.Message}</div>
        </li>`;
    });

    Swal.fire({
      title: '<strong style="color: #1d7280">Form Validation</strong>',
      icon: 'info',
      iconColor: this.BRAND_COLOR, // Sets the info icon color
      html: `<ul class="list-group errorlist" style="text-align: left;">${ulList}</ul>`,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: 'OK',
      confirmButtonColor: this.BRAND_COLOR, // Sets the button background color
      buttonsStyling: true,
      customClass: {
        confirmButton: 'custom-swal-button'
      }
    });
  }
}
