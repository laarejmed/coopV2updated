import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'; // Pour constructor(private router:Router)  : fonctionne
import {LoginModel} from '../shared/models/login-model';
import {TokenModel} from '../shared/models/token-model';
import Swal from 'sweetalert2';
import {JwtServiceService} from '../shared/service/jwt-service.service';
import {AutehentificationService} from '../shared/service/autehentification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginModel: LoginModel;

  constructor(
    private authService: AutehentificationService,
    private router: Router,
    private jwt: JwtServiceService
  ) {
    this.loginModel = new LoginModel();
    if (this.jwt.isConnected()) {
      this.jwt.isAdmin() && this.jwt.switchBtn
        ? this.router.navigateByUrl('/dashboard/users')
        : this.router.navigateByUrl('/dashboard/global');
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.loginModel).subscribe(
      (res) => {
        let tokenModel = new TokenModel(res);

        if (this.jwt.saveToken(tokenModel)) {
          this.jwt.isAdmin() && this.jwt.switchBtn
            ? this.router.navigateByUrl('/dashboard/users')
            : this.router.navigateByUrl('/dashboard/global');
        }
      },
      (err) => {
        Swal.fire({
          title: 'Hay un problema!!!',
          text: err['error'],
          icon: 'error',
        });
      }
    );

  }
}
