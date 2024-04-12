import { Component, OnInit } from '@angular/core';
import { PdfEmailService } from '../shared/service/pdf-email-service';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  constructor(private pdfEmailService:PdfEmailService) { }
  ngOnInit(): void {
  }
}
