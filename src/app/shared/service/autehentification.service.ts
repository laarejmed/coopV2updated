import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Inscription } from '../models/inscription';
import { Observable, skip } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { TokenModel } from '../models/token-model';
import { ForgotPassord } from '../models/forgot-passord';
import { ResetPassword } from '../models/reset-password';
import {RegisterModel} from '../models/register-model';
import {LoginModel} from '../models/login-model';
import {ForgetPasswordModel} from '../models/forget-password-model';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AutehentificationService {
  readonly baseUrl=environment.apiUrl;
  readonly baseUrl2="http://localhost:4200/";
  private authService:AutehentificationService;
  constructor(private http:HttpClient,private router:Router) { }

  register(inscription: RegisterModel):Observable<Response>{
    return this.http.post<Response>(
      this.baseUrl+'autehntification/register',
      inscription,
      {headers:{skip:'true'}}
    );
  }
  registernoValidation(inscription:Inscription):Observable<Response>{
    return this.http.post<Response>(
      this.baseUrl+'authentification/registernovalidation',
      inscription,
      {headers:{skip:'true'}}
    );
  }

  registerAdmin(inscription: RegisterModel):Observable<Response>{
    return this.http.post<Response>(
      this.baseUrl+'authentification/administrateur/register',
      inscription,
      {headers:{skip:'true'}}
    );
  }
  confirmEmail(url:string):Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'authetification${url}',{
      headers:{skip:'true'},
    });
  }

  login(login: LoginModel):Observable<TokenModel>{
    const currentDate = new Date();
    const datesArray: Date[] = JSON.parse(localStorage.getItem('loginTimes') as string) || [];
    datesArray.push(currentDate);
    localStorage.setItem('loginTimes', JSON.stringify(datesArray));
    return this.http.post<TokenModel>(
      this.baseUrl + 'authentification/login',
      login,
      {headers: {skip: 'true'}}
    );
  }
  getLastPerviousLoginTime(){
    const datesArray:Date[]=JSON.parse(localStorage.getItem('loginRimes') as string);
    if(datesArray.length>=2){
      return datesArray[datesArray.length-2];
    }
    return null;
  }
  login2(login2:LoginRequest):Observable<TokenModel>{
    return this.http.post<TokenModel>(
      this.baseUrl2+'Authetificate/login',
      login2,
      {headers:{skip:'true'}}
    );
  }
  forgotPassword(forgetPassword:ForgotPassord):Observable<Response>{
    return this.http.post<Response>(
      this.baseUrl+'authentification/forget-password',
      forgetPassword,
      {headers:{skip:'true'}}
    );
  }
  resetPassword(resetPassword:ResetPassword):Observable<Response>{
    return this.http.post<Response>(
      this.baseUrl+'authentification/reset-password',
      resetPassword,
      {headers:{skip:'true'}}
    );
  }
  forgetPassword(forgetModel: ForgetPasswordModel) {
    this.authService.sendPasswordResetEmail(forgetModel.email).subscribe(response => {
        console.log('Demande de réinitialisation de mot de passe envoyée avec succès !',response);
      }, error => {
        console.error('Erreur lors de l\'envoi de la demande de réinitialisation de mot de passe :', error);
      });
  }
  sendPasswordResetEmail(email: string):Observable<any>{
    return this.http.post(environment.apiUrl, { email });
  }
  registernovalidation(registerModel: RegisterModel) {
    this.authService.registernovalidation(registerModel).subscribe({
      next: (res) => {
        console.log('Enregistrement réussi :', res);
        this.handleRegistrationSuccess();
      },
      error: (err) => {
        console.error('Erreur lors de l\'enregistrement :', err);
        this.handleRegistrationError(err);
      }
    });
  }
  private handleRegistrationSuccess() {
    this.showSuccessMessage('Enregistrement réussi');
    this.router.navigate(['/dashboard']);
  }
  private handleRegistrationError(error: any) {
    let errorMessage = 'Erreur lors de l\'enregistrement';
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    this.showErrorMessage(errorMessage);
  }
  showSuccessMessage(message: string) {
    Swal.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  showErrorMessage(message: string) {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}
function registerModel(registerModel: RegisterModel) {
    throw new Error('Function not implemented.');
}

