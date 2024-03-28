import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, map, Observable, tap} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {ForgetPasswordModel} from '../models/forget-password-model';
import {LoginModel} from '../models/login-model';
import { LoginModel2 } from '../models/login-model2';
import {RegisterModel} from '../models/register-model';
import {ResetPasswordModel} from '../models/reset-password-model';
import {TokenModel} from '../models/token-model';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  readonly baseUrl = environment.apiUrl;
  readonly baseUrl2 = "http://localhost:45855/"; 

  constructor(private http: HttpClient) {
  }

  register(registerModel: RegisterModel): Observable<Response> {
    return this.http.post<Response>(
      this.baseUrl + 'authentification/register',
      registerModel,
      {headers: {skip: 'true'}}
    );
  }
  registernovalidation(registerModel: RegisterModel): Observable<Response> {
    return this.http.post<Response>(
      this.baseUrl + 'authentification/registernovalidation',
      registerModel,
      { headers: { skip: 'true' } }
    );
  }

  registerAdmin(registerModel: RegisterModel): Observable<Response> {
    return this.http.post<Response>(
      this.baseUrl + 'authentification/administrateur/register',
      registerModel,
      {headers: {skip: 'true'}}
    );
  }

  confirmEmail(url: string): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + `authentification${url}`, {
      headers: {skip: 'true'},
    });
  }

  
  
    
  login(loginModel: LoginModel): Observable<TokenModel> {
    const currentDate = new Date();
    const datesArray: Date[] = JSON.parse(localStorage.getItem('loginTimes'));
    datesArray.push(currentDate);
    localStorage.setItem('loginTimes', JSON.stringify(datesArray));
    return this.http.post<TokenModel>(
      this.baseUrl + 'authentification/login',
      loginModel,
      {headers: {skip: 'true'}}
    );
  }

  getLastPreviousLoginTime() {
    const datesArray: Date[] = JSON.parse(localStorage.getItem('loginTimes'));
    if (datesArray.length >= 2) {
      return datesArray[datesArray.length - 2];
    }
    return null;
  }
  
  login2(loginModel2: LoginModel2): Observable<TokenModel> {
    return this.http.post<TokenModel>(
      this.baseUrl2 + 'Authenticate/login',
      loginModel2,
      {headers: {skip: 'true'}}
    );
  }
  
  
  
  
  

  forgetPassword(forgetModel: ForgetPasswordModel): Observable<Response> {
    return this.http.post<Response>(
      this.baseUrl + 'authentification/forget-password',
      forgetModel,
      {headers: {skip: 'true'}}
    );
  }

  resetPassword(resetModel: ResetPasswordModel): Observable<Response> {
    return this.http.post<Response>(
      this.baseUrl + 'authentification/reset-password',
      resetModel,
      {headers: {skip: 'true'}}
    );
  }
}
