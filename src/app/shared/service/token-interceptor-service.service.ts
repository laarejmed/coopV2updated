import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {JwtServiceService} from "./jwt-service.service";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorServiceService implements HttpInterceptor{
  constructor(private jwt:JwtServiceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!req.headers.get('skip')){
      req=req.clone({
        headers:req.headers.set(
          'Authorization',
          `Bearer ${this.jwt.getToken()}`
        ),
      });
    }
    return next.handle(req);
  }
}
