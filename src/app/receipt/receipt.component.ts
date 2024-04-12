import { Component, OnInit } from '@angular/core';
import { PdfEmailService } from '../shared/service/pdf-email-service';
import { TransactionService } from '../shared/service/transaction.service';
import { catchError, switchMap, throwError } from 'rxjs';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  constructor(private pdfEmailService:PdfEmailService,private transactionService:TransactionService) { }
  ngOnInit(): void {
  }
  onAcceptTransaction(transactionData: any, userEmail: string) {
    // Accepter la transaction
    this.transactionService.validateTransaction(transactionData).pipe(
      switchMap(() => {
        return this.pdfEmailService.generatePdf(transactionData);
      }),
      switchMap(pdf => {
        return this.pdfEmailService.sendEmailWithPdf(userEmail, pdf.url);
      }),
      catchError(error => {
        console.error('Une erreur est survenue :', error);
        return throwError(error); 
      })
    ).subscribe(response => {
      console.log('E-mail envoyé avec succès :', response);
    }, error => {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    });
  }
}