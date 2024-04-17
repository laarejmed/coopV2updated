import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AutehentificationService} from '../shared/service/autehentification.service';
import { TransactionService } from '../shared/service/transaction.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css'],
})
export class EmailConfirmationComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AutehentificationService,private translate: TranslateService
  ){
    this.authService.confirmEmail(this.router.url).subscribe((res) => {
      document.querySelector('.title').textContent = 'Correo Electrónico Confirmado';
      document.querySelector('.message').textContent = res['message'];
    });
  }
  ngOnInit(): void {
    this.translate.setDefaultLang('en');
  }
}
