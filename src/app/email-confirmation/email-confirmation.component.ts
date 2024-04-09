import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AutehentificationService} from '../shared/service/autehentification.service';
@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css'],
})
export class EmailConfirmationComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AutehentificationService
  ){
    this.authService.confirmEmail(this.router.url).subscribe((res) => {
      document.querySelector('.title').textContent = 'Correo Electrónico Confirmado';
      document.querySelector('.message').textContent = res['message'];
    });
  }

  ngOnInit(): void {
  }
}
