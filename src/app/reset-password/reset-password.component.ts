import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ResetPasswordModel} from '../shared/models/reset-password-model';
import {AuthentificationService} from '../shared/services/authentification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetModel: ResetPasswordModel;

  constructor(
    private authService: AuthentificationService,
    private router: Router
  ) {
    this.resetModel = new ResetPasswordModel();
    const params = this.router.url.split('param=')[1].split('-');
    this.resetModel.email = params[1];
    this.resetModel.social = params[2].replace(/%2F/g, '/');

    this.resetModel.token = params[0];
    console.log(this.resetModel);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.resetModel.password === this.resetModel.confirmPassword) {
      this.authService.resetPassword(this.resetModel).subscribe(
        (res) => {
          Swal.fire({
            title: '¡¡¡Contraseña cambiada con éxito!!!',
            text: 'Ir a la página de inicio de sesión',
            icon: 'success',
            confirmButtonText: 'Login',
          }).then((result) => {
            if (result.value) {
              this.router.navigateByUrl('login');
            }
          });
        },
        (err) => {
          console.log(err);
          document.getElementById('confirmPassword_error').textContent =
            'la contraseña ingresada debe contener al menos un carácter especial, un número, una letra minúscula, una letra mayúscula y tiene una longitud de al menos 8 caracteres.';
        }
      );
    } else {
      document.getElementById('confirmPassword_error').textContent =
        'La contraseña no coincide con la confirmación';
    }
  }

  emptyError(field: string) {
    document.getElementById(field).textContent = '';
  }
}
