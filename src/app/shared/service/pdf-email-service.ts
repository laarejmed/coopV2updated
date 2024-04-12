import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from  'pdfmake/build/vfs_fonts';
export class PdfEmailService {
  constructor(private http:HttpClient) {
  }
  generatePdf(data: any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      const documentDefinition = {
        content: [
          { text: 'Transaction Details', style: 'header' },
          { text: `Amount: ${data.amount}`, style: 'subheader' },
          { text: `From: ${data.from}`, style: 'subheader' },
          { text: `To: ${data.to}`, style: 'subheader' }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 5]
          }
        }
      };
      const pdfDoc = pdfMake.createPdf(documentDefinition);
      pdfDoc.getBase64((pdfData) => {
        observer.next(pdfData);
        observer.complete();
      });
    });
  }
}
