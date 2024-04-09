import {Component, OnInit} from '@angular/core';
import {RegisterModel} from '../shared/models/register-model';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AutehentificationService} from '../shared/service/autehentification.service';
import {UserService} from '../shared/service/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponent implements OnInit {
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
    if (!this.registerModel.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/gm))

    {
      document.getElementById('email_error').textContent = 'Por favor introduzca una dirección de correo electrónico válida';
    } else if(!this.registerModel.password.match(/(?=.*\W)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/gm))
    {
      document.getElementById('password_error').textContent ='Por favor introduce una contraseña válida';
    } else if (this.registerModel.password != this.registerModel.confirmPassword) {
      document.getElementById('confirmPassword_error').textContent =
        'La nueva contraseña y la contraseña confirmada deben ser las mismas';
    } else {
      if (this.router.url === '/signup') {
        this.authService.register(this.registerModel).subscribe(
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
      } else {
        this.authService.registerAdmin(this.registerModel).subscribe(
          (res) => {
            Swal.fire({
              title: '¡Administrador creado con éxito!',
              text: 'Administrador creado con éxito',
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
  }

  emptyError(field: string) {
    document.getElementById(field).textContent = '';
    if(field === "password_error") {
      document.getElementById('password_pattern').style.display = "block";
    }
  }
  emptyPattern()
  {
    document.getElementById('password_pattern').style.display = "none";
  }
}
