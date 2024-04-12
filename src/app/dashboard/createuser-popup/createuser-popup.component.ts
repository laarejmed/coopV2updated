import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterModel } from '../../shared/models/register-model';
import {UserService} from '../../shared/service/user.service';
import {AutehentificationService} from '../../shared/service/autehentification.service';
@Component({
  selector: 'app-createuser-popup',
  templateUrl: './createuser-popup.component.html',
  styleUrls: ['./createuser-popup.component.css']
})
export class CreateuserPopupComponent implements OnInit {

  registerModel: RegisterModel;
  role: string;

  items = {
    '/signup': 'Usuarias',
    '/administrateur/register': 'Administración',
  };

  constructor(
    private authService: AutehentificationService,
    private router: Router,
    private userService: UserService
  ) {
    this.registerModel = new RegisterModel();
  }

  ngOnInit(): void {
    this.role = this.items[this.router.url];
  }

  onSubmit() {
    console.log(this.registerModel);
    if (!this.registerModel.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/gm)) {
      document.getElementById('email_error').textContent = 'Por favor introduzca una dirección de correo electrónico válida';
    } else if (!this.registerModel.password.match(/(?=.*\W)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/gm)) {
      document.getElementById('password_error').textContent = 'Por favor introduce una contraseña válida';
    } else if (this.registerModel.password != this.registerModel.confirmPassword) {
      document.getElementById('confirmPassword_error').textContent =
        'La nueva contraseña y la contraseña confirmada deben ser las mismas';
    } else {
        this.authService.registernovalidation(this.registerModel).subscribe(
          (res) => {
            this.userService.progressNumber = this.userService.progressNumber + 1;
            Swal.fire({
              title: '¡Usuario creado con éxito!',
              text: 'Usuario creado con éxito',
              icon: 'success',
            });
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'error al crear usuario',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }

    }


  emptyError(field: string) {
    document.getElementById(field).textContent = '';
    if (field === "password_error") {
      document.getElementById('password_pattern').style.display = "block";
    }
  }
  emptyPattern() {
    document.getElementById('password_pattern').style.display = "none";
  }
}
