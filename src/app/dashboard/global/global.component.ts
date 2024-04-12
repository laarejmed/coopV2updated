import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionModel } from '../../shared/models/transaction-model';
import {JwtServiceService} from '../../shared/service/jwt-service.service';
import {TransactionService} from '../../shared/service/transaction.service';
import {UserService} from '../../shared/service/user.service';
import {RequestService} from '../../shared/service/request.service';
import {BankAccountServiceService} from '../../shared/service/bank-account-service.service';
@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css'],
})
export class GlobalComponent implements OnInit {
  userBalance = 0.0;
  totaltransactions: any;
  totalrequests: any;
  userBankAccountId: number;
  transactions: TransactionModel[];
  switchUser: any;
  user: any;
  constructor(
    private jwt: JwtServiceService,
    private router: Router,
    private bankAccountService: BankAccountServiceService,
    private transactionService: TransactionService,
    private userService: UserService,
    private requestService: RequestService
  ) {
    this.jwt.switchBtnUId$.subscribe(newValue => {
      this.switchUser = newValue;
      console.log(this.switchUser);
    });
    if (!this.jwt.isConnected()) {
      this.router.navigateByUrl('/login');
    }
    if (this.jwt.isAdmin() && this.jwt.switchBtn) {
      this.router.navigateByUrl('/dashboard/users');
    }
  }

  ngOnInit(): void {
    this.getUserBalance();
    let UId: any = this.jwt.getConnectedUserId();
    if (this.switchUser != "initial") { UId = this.switchUser; console.log(UId); }
    this.userService.getUser(UId).subscribe(
      (res) => {
        this.user = res;
        console.log(this.user);
      },
      (err) => {

      }
    );


  }

  getUserBalance() {
    let UId: any = this.jwt.getConnectedUserId();
    if (this.switchUser != "initial") { UId = this.switchUser; console.log(UId); }
    this.bankAccountService
      .getBankAccount(UId)
      .subscribe((next) => {
        this.userBalance = next.balance;
        this.userBankAccountId = next.id;
        this.transactionService
          .getTransactionByUser(
            this.userBankAccountId,
            1,
            10
          )
          .subscribe((data) => {

            this.totaltransactions = data.pagination.totalRecords;

          });
        this.requestService.getRequestsByUser(UId,1, 10).subscribe(
          (data) => {
            console.log(data);
            this.totalrequests = data.pagination.totalRecords;

          }
        );

        this.getLastFiveTransactions();
      });

  }

  getLastFiveTransactions() {
    this.transactionService
      .getTransactionByUser(this.userBankAccountId, 1, 5)
      .subscribe(this.processResult());
  }

  processResult() {
    return (data) => {
      this.transactions = data.response;

    };
  }

  statusCasting(status: number): string {
    switch (status) {
      case 0:
        return 'Progreso';
      case 1:
        return 'Aprobada';
      case 2:
        return 'Rechazada';
    }
  }

  statusColor(status: number) {
    switch (status) {
      case 1:
        return 'green';
      case 2:
        return 'red';
    }
  }

  importAsCsv() {
    this.transactionService.importAsCsv(this.userBankAccountId);
  }

  importAsExcel() {
    this.transactionService.importAsExcel(this.userBankAccountId);
  }

  importAsPDF() {
    this.transactionService.importAsPdf(this.userBankAccountId);
  }

}
