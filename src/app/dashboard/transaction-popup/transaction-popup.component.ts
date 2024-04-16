import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import Swal from 'sweetalert2';
import { TransactionModel } from '../../shared/models/transaction-model';
import { TransactionPostModel } from '../../shared/models/Transaction-post-model';
import {JwtServiceService} from '../../shared/service/jwt-service.service';
import {TransactionService} from '../../shared/service/transaction.service';
import {BankAccountServiceService} from '../../shared/service/bank-account-service.service';

@Component({
  selector: 'app-transaction-popup',
  templateUrl: './transaction-popup.component.html',
  styleUrls: ['./transaction-popup.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class TransactionPopupComponent implements OnInit {
  userBankAccountNumber: string;
  readonly hasAdminRole: boolean;
  readonly isConnected: boolean;
  readonly switchBtn: boolean;

  transactionFormGroup = this._formBuilder.group({
    origin: this._formBuilder.group({
      originalAccount: new FormControl(''),
      receiverAccount: new FormControl(''),
      externalAccount: new FormControl(''),
    }),
    destination: this._formBuilder.group({
      destinationAccount: new FormControl(''),

      externalDestination: new FormControl(''),
    }),
    receiverInfo: this._formBuilder.group({
      amount: new FormControl(''),
      concept: new FormControl(''),
      dateTransaction: new FormControl('')
    }),
  });
  switchUser: any;
  constructor(
    private _formBuilder: FormBuilder,
    private jwt: JwtServiceService,
    private transactionService: TransactionService,
    private bankService: BankAccountServiceService
  ) {// for accesing as user from admin change value in service then subscribe to nmake change in loading data as user in different component
    this.jwt.switchBtnUId$.subscribe(newValue => {
      this.switchUser = newValue;
    });
    this.isConnected = jwt.isConnected();
    this.hasAdminRole = jwt.isAdmin();
    this.switchBtn = this.jwt.switchBtn;
  }

  ngOnInit(): void {
    //loading data depends on variable subscribed for some  user or admin
    let UId: any = this.jwt.getConnectedUserId();
    if (this.switchUser != "initial") { UId = this.switchUser; console.log(UId); }
    this.bankService.getBankAccount(UId).subscribe(
      (res) => {
        this.userBankAccountNumber = res.accountNumber;
      },
      (err) => console.log(err)
    );
  }
  /*onSubmit() {
    if (this.transactionFormGroup.invalid) {
      Object.keys(this.transactionFormGroup.controls).forEach(field => {
        const control = this.transactionFormGroup.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }
    const transaction = new TransactionPostModel();
    transaction.senderBankAccountNumber = this.transactionFormGroup.get('origin.originalAccount').value || this.transactionFormGroup.get('origin.externalAccount').value || this.transactionFormGroup.get('origin.receiverAccount').value;
    transaction.originBankAccountNumber = this.userBankAccountNumber
    transaction.receiverBankAccountNumber = this.transactionFormGroup.get('destination.destinationAccount').value || this.transactionFormGroup.get('destination.externalDestination').value;
    if (this.transactionFormGroup.get('receiverInfo.amount').value.includes(',')) {
      const amountValue = this.transactionFormGroup.get('receiverInfo.amount').value.replace(',', '.');
      transaction.amount = parseFloat(amountValue);
    } else {
      transaction.amount = parseFloat(this.transactionFormGroup.get('receiverInfo.amount').value) || 0;
    }
    transaction.motif = this.transactionFormGroup.get('receiverInfo.concept').value || '';
    transaction.dateTransaction = this.transactionFormGroup.get('receiverInfo.dateTransaction').value || new Date();
    console.log(transaction);
    this.transactionService.postTransaction(transaction).subscribe(
      (next) => {
        Swal.fire({
          icon: 'success',
          title: 'Transacción agregada con éxito',
          showConfirmButton: false,
          timer: 1000,
        });
        this.transactionService.refresh();
        document.getElementById('closeDialog').click();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Algo anda mal con tus entradas',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    );
  }*/
  onSubmit(){
    if(this.transactionFormGroup.invalid){
      this.transactionFormGroup.markAsTouched();
      return;
    }
    const transaction={
      senderBankAccountNumber:this.extractAccountNumber('origin'),
      originBankAccountNumber:this.userBankAccountNumber,
      receiverBankAccountNumber:this.extractAccountNumber('destination'),
      amount:this.extractAmount(),
      motif:this.transactionFormGroup.get('receiverInfo.concept').value || '',
      dateTransaction:this.exctractDate() || new Date()
    };
    console.log(transaction);
  }
  /*
  this.transactionService.postTransaction(transaction).subscribe(
    () => {
      this.showSuccessMessage();
      this.transactionService.refresh();
      document.getElementById('closeDialog').click();
    },
    () => {
      this.showErrorMessage();
    }
  );
}*/
  exctractDate():Date{
    const dateValue=this.transactionFormGroup.get('receiverInfo.dateTransaction').value;
    return dateValue ? new Date(dateValue):null;
  }
  extractAccountNumber(type:string):string{
    const accountTypes=['originalAccount','externalAccount','receiverAccount'];
    const control=this.transactionFormGroup.get(`${type}.${accountTypes.find(type=>this.transactionFormGroup.get(`${type}.${type}`))}`);
    return control ? control.value:'';
  }
  extractAmount():number{
    const amount=this.transactionFormGroup.get('receiverInfo.amount').value.replace(',','.');
    return parseFloat(amount);
  }
  get concept() {
    return this.transactionFormGroup.get('receiverInfo.concept');
  }

  get amount() {
    return this.transactionFormGroup.get('receiverInfo.amount');
  }

  get receiverAccount() {
    return this.transactionFormGroup.get('origin.receiverAccount');
  }

  get externalAccount() {
    return this.transactionFormGroup.get('origin.externalAccount');
  }

  get destination() {
    return this.transactionFormGroup.get('destination.destinationAccount');
  }

  get externalDestination() {
    return this.transactionFormGroup.get('destination.externalDestination');
  }
  get dateTransaction() {
    return this.transactionFormGroup.get('receiverInfo.dateTransaction');
  }

  disableOriginInput(event) {
    if (event.target.checked) {

      this.transactionFormGroup.get('origin.externalAccount').disable();
      this.transactionFormGroup.get('origin.receiverAccount').disable();
      this.transactionFormGroup.get('origin.externalAccount').reset();
      this.transactionFormGroup.get('origin.receiverAccount').reset();
    }
  }

  enableExternalInput(event) {
    if (event.target.value) {
      this.transactionFormGroup.get('origin.externalAccount').enable();
      this.transactionFormGroup.get('origin.originalAccount')?.reset();

    }
  }

  enableReceiverInput(event) {
    if (event.target.value) {
      this.transactionFormGroup.get('origin.receiverAccount').enable();
      this.transactionFormGroup.get('origin.originalAccount')?.reset();

    }
  }

  disableExternalInput(event) {
    if (event.target.value) {
      this.transactionFormGroup.get('destination.destinationAccount').enable();
      this.transactionFormGroup
        .get('destination.externalDestination')
        .disable();
      this.transactionFormGroup.get('destination.externalDestination').reset();
    }
  }

  disableDestinationInput(event) {
    if (event.target.value) {
      this.transactionFormGroup.get('destination.externalDestination').enable();
      this.transactionFormGroup.get('destination.destinationAccount').disable();
      this.transactionFormGroup.get('destination.destinationAccount').reset();
    }
  }
}
