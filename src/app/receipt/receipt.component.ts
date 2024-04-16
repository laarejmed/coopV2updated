import { Component, OnInit } from '@angular/core';
import { PdfEmailService } from '../shared/service/pdf-email-service';
import { TransactionService } from '../shared/service/transaction.service';
import { catchError, switchMap, throwError } from 'rxjs';
import {TransactionModel} from '../shared/models/transaction-model';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  transaction: TransactionModel;

  constructor(private pdfEmailService: PdfEmailService, private transactionService: TransactionService) {
    this.transaction = new TransactionModel();
  }

  ngOnInit(): void {
  }

  async onAcceptTransaction(transactionData: any, userEmail: string) {
    try {
      await this.transactionService.validateTransaction(transactionData).toPromise();
      const pdf = await this.pdfEmailService.generatePdf(transactionData).toPromise();
      const response = await this.pdfEmailService.sendEmailWithPdf(userEmail, pdf.url).toPromise();
      console.log('E-mail envoyé avec succès:', response);
    } catch (error) {
      // Gérer les erreurs
      console.error('Une erreur est survenue:', error);
      throw error;
    }
  }
}
