import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers;
    if (req.url.includes('/auth/register') || req.url.includes('/auth/login') || req.url.includes('/auth/resetPassword')|| req.url.includes('/attractions/getAll')) {
      headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
    } else {
      let token = localStorage.getItem("token")
      headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    }
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
