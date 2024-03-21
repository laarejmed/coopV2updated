import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtService } from '../../shared/services/jwt.service';
import { Router } from '@angular/router';
import { TransactionModel } from '../../shared/models/transaction-model';
import { TransactionService } from '../../shared/services/transaction.service';
import Swal from 'sweetalert2';
import { TransactionPopupComponent } from '../transaction-popup/transaction-popup.component';
import { BankAccountService } from 'src/app/shared/services/bank-account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../shared/services/user-service.service';
import { RequestServiceService } from '../../shared/services/request-service.service';
import { ResetPasswordModel } from '../../shared/models/reset-password-model';
import { ResetSoldeModel } from '../../shared/models/resetsoldemodel';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  userBalance = 0.0;
  listTransaction: number[];
  transactions: TransactionModel[];
  pageNumber = 1;
  pageSize = 10;
  totalElements = 100;
  isConnected = false;
  hasAdminRole = false;
  userBankAccountId: number;
  switchBtn: boolean;
  state = false;
  status: string;
  switchUser: any;
  user: any;
  r: ResetSoldeModel;
  totaltransactions: number;
  totalrequests: number;
  constructor(
    public dialog: MatDialog,
    private jwt: JwtService,
    private router: Router,
    private transactionService: TransactionService,
    private bankService: BankAccountService, private modalService: NgbModal,
    private userService: UserService,
    private requestService: RequestServiceService
  ) {
    this.transactions = [];
    this.listTransaction = [];
    this.isConnected = this.jwt.isConnected();
    this.hasAdminRole = this.jwt.isAdmin();
    this.switchBtn = this.jwt.switchBtn;
    // for accesing as user from admin change value in service then subscribe to nmake change in loading data as user in different component
    this.jwt.switchBtnUId$.subscribe(newValue => {
      this.switchUser = newValue;
    });
    this.r = new ResetSoldeModel();
  }

  addTransaction(): void {
    this.dialog.open(TransactionPopupComponent, {
      width: '60%',
      data: 'right click',
    });
  }
  addOldTransaction(): void {
    this.dialog.open(TransactionPopupComponent, {
      width: '60%',
      data: 'right click',
    });
  }

  ngOnInit(): void {

    window.scrollTo(0, 0);
    //loading data depends on variable subscribed for some  user or admin 
    let UId: any = this.jwt.getConnectedUserId();
    if (this.switchUser != "initial") { UId = this.switchUser; console.log(UId); }
    this.bankService.getBankAccount(UId).subscribe(
      (next) => {

        this.userBalance = next.balance;
        this.userBankAccountId = next.id;
        console.log("bankidd" + this.userBankAccountId);
       
        this.transactionService
          .getTransactionsByUser(
            this.userBankAccountId,
            1,
            10
          )
          .subscribe((data) => {

            this.totaltransactions = data.pagination.totalRecords;
            this.loadTransactionsByRole();

          });
        this.requestService.getRequests(1, 10).subscribe(
          (data) => {
            console.log(data);
            this.totalrequests = data.pagination.totalRecords;

          }
        );
       
      },
      (err) => console.log(err)
    );
    this.refreshTransactionsList();

    this.userService.getUser(UId).subscribe(
      (res) => {
        this.user = res;
       
      },
      (err) => {

      }
    );
  }

  loadTransactionsByRole() {
    if (this.isConnected && this.hasAdminRole) {
      if (this.switchBtn) {
        const searchKeyword: string = (<HTMLInputElement>document.getElementById('transactionSearch')).value;
        console.log(searchKeyword);

        if (searchKeyword) {
          this.handleTransactionSearch(searchKeyword);
        } else if (this.state) {
          this.getAllTransactionsByStatus(this.status);
        } else {
          this.getTransactions();
        }
      } else {
        this.getTransactionsByUser();
      }
    } else {
      if (this.isConnected && !this.hasAdminRole) {
        this.getTransactionsByUser();
      } else {
        this.router.navigateByUrl('login');
      }
    }
  }
  resetsolde(UserIdentifiant: any) {
    this.r.id = UserIdentifiant;
    this.transactionService.resetTransaction(this.r).subscribe(
      (next) => {
        console.log(next);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  selectAll(e: Event) {
    const items = document.querySelectorAll('.items');
    for (let i = 0; i < items.length; i++) {
      (<HTMLInputElement>items[i]).checked = (<HTMLInputElement>(
        e.target
      )).checked;
      // tslint:disable-next-line:radix
      const id = parseInt((<HTMLInputElement>items[i]).value);
      this.toggleItem(id, (<HTMLInputElement>e.target).checked);
    }
  }

  setTransaction(id: number, e: Event) {
    this.toggleItem(id, (<HTMLInputElement>e.target).checked);
  }

  toggleItem(id: number, isChecked: boolean) {
    const elt = document.querySelector('.dataTable-dropdown');
    if (isChecked) {
      this.listTransaction.push(id);
    } else {
      const index = this.listTransaction.indexOf(id);
      this.listTransaction.splice(index, 1);
    }
    if (this.listTransaction.length !== 0) {
      elt.classList.remove('d-none');
    } else {
      elt.classList.add('d-none');
    }
  }

  getTransactions() {
    this.transactionService
      .getTransactions(this.pageNumber, this.pageSize)
      .subscribe(this.processResult());
    this.state = false;
  }

  getTransactionsByUser() {
    this.transactionService
      .getTransactionsByUser(
        this.userBankAccountId,
        this.pageNumber,
        this.pageSize
      )
      .subscribe(this.processResult());
    this.state = false;
  }

  processResult() {
    this.transactions = [];
    return (data) => {
      this.transactions = data.response;
      console.log(data);
      this.pageNumber = data.pagination?.pageNumber;
      this.pageSize = data.pagination?.pageSize;
      this.totalElements = data.pagination?.totalRecords;
    };
  }

  validateTransaction(transactionId: number) {
    this.transactionService.validateTransaction(transactionId).subscribe(
      (next) => {
        Swal.fire({
          icon: 'success',
          title: 'La transacción ha sido validada con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
        this.transactionService.refresh();

        this.transactions = [];
        this.loadTransactionsByRole();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'La transacción no puede ser validada',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  rejectTransaction(transactionId: number) {
    this.transactionService.rejectTransaction(transactionId).subscribe(
      (next) => {
        Swal.fire({
          icon: 'success',
          title: 'Las transacciones son rechazadas',
          showConfirmButton: false,
          timer: 1500,
        });
        this.transactionService.refresh();

        this.transactions = [];
        this.loadTransactionsByRole();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'La transacción no puede ser rechazada',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  removeTransaction(transactionId: number) {
    this.transactionService.removeTransaction(transactionId).subscribe(
      (next) => {
        Swal.fire({
          icon: 'success',
          title: 'La transacción ha sido eliminada con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
        this.transactionService.refresh();

        this.transactions = [];
        this.loadTransactionsByRole();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'La transacción no se puede eliminar',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  refreshTransactionsList() {
    this.transactionService.refreshTransactions.subscribe(
      res => this.loadTransactionsByRole()
    );
  }

  validateAllTransactions() {
    this.transactionService
      .validateAllTransaction(this.listTransaction)
      .subscribe((next) => {
        Swal.fire({
          icon: 'success',
          title: 'Las transacciones son validadas',
          showConfirmButton: false,
          timer: 1500,
        });
        this.transactionService.refresh();

        this.transactions = [];
        this.loadTransactionsByRole();
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al validar transacciones',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  rejectAllTransactions() {
    this.transactionService
      .rejectAllTransaction(this.listTransaction)
      .subscribe((next) => {
        Swal.fire({
          icon: 'success',
          title: 'Transacciones rechazadas',
          showConfirmButton: false,
          timer: 1500,
        });
        this.transactionService.refresh();

        this.transactions = [];
        this.loadTransactionsByRole();
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  removeAllTransactions() {
    this.transactionService
      .removeAllTransaction(this.listTransaction)
      .subscribe((next) => {
        this.transactionService.refresh();
        this.transactions = [];
        this.loadTransactionsByRole();
      });
  }

  handleTransactionSearch(keyword: string) {
    console.log(keyword);
    if (keyword !== '') {
      this.transactionService
        .handleTransactionSearch(keyword, this.pageNumber, this.pageSize)
        .subscribe(this.processResult());
    } else {
      this.getTransactions();
    }
    this.state = false;
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

  exportToCSV() {
    if (this.isConnected && this.hasAdminRole && this.switchBtn) {
      this.transactionService.importAllTransactionsAsCsv();
    }
  }

  exportToExcel() {
    if (this.isConnected && this.hasAdminRole && this.switchBtn) {
      this.transactionService.importAllTransactionsAsExcel();
    }
  }

  exportToPDF() {
    if (this.isConnected && this.hasAdminRole && this.switchBtn) {
      this.transactionService.importAllTransactionsAsPdf();
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', scrollable: true });
  }

  getAllTransactionsByStatus(status: string) {
    if (status !== '3') {
      this.transactionService.getAllTransactionsByStatus(status, this.pageNumber, this.pageSize).subscribe(this.processResult());
      this.state = true;
      this.status = status;
    } else {
      this.getTransactions();
      this.state = false;
    }
  }
}
