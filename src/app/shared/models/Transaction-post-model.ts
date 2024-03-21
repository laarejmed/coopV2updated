export class TransactionPostModel {
  amount!: number;
  senderBankAccountNumber!: string;
  receiverBankAccountNumber!: string;
  originBankAccountNumber!: string;
  motif!: string;
  dateTransaction!: Date;
}
