import { Data } from '@angular/router';
import {BankAccountModel} from './bankAccount-model';


export class TransactionModel {
  id!: number;
  amount!: number;
  dateTransaction!: Date;
  senderBankAccountId!: number;
  receiverBankAccountId!: number;
  senderBankAccount!: BankAccountModel;
  receiverBankAccount!: BankAccountModel;
  originBankAccountNumber!: string;
  soldeSender!: string;
  soldeReceiver!: string;

  status!: number;
  motif!: string;
}
