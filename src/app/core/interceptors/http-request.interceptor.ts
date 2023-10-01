import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private spinnerService: SpinnerService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.toggle(true);
    return next.handle(request).pipe(finalize(() => this.spinnerService.toggle(false)));
  }
}
