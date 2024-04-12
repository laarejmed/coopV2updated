import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {ForgetPasswordModel} from '../shared/models/forget-password-model';
import {AutehentificationService} from '../shared/service/autehentification.service';
import {catchError, EMPTY, Observable, switchMap, tap, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgetModel: ForgetPasswordModel;
  constructor(private authService: AutehentificationService,private http:HttpClient) {
    this.forgetModel = new ForgetPasswordModel();
  }
  ngOnInit(): void {
  }
  async onSubmit() {
    try {
      const res = await this.authService.forgetPassword(this.forgetModel);
      Swal.fire({
        title: 'Se ha enviado un correo electrónico para confirmar tu registro',
        text: res['message'],
        icon: 'success',
      });
    } catch (err) {
      document.getElementById('email_error').textContent = err['error']['email_error'];
    }
  }
  emptyError(field: string) {
    document.getElementById(field).textContent = '';
  }
}
