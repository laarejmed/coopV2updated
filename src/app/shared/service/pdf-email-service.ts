import {HttpClient} from '@angular/common/http';
import {Observable,Observer, Subject, catchError, from, throwError} from 'rxjs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from  'pdfmake/build/vfs_fonts';
import * as nodemailer from 'nodemailer';
export class PdfEmailService {
  email:string;
  pdfFile:File;
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
  onFileDropped(pdfFile:FileList){
    this.pdfFile=pdfFile.item(0);
  }
  sendEmailWithPdf(){
    const formData=new FormData();
    formData.append('email',this.email);
    formData.append('pdf',this.pdfFile);
    this.http.post<any>('/admin/sendEmailWithPdf',formData).subscribe(
      reponse=> {
        console.log('Email envoyé avec succès!', reponse);
      },
      error=>{
        console.log('Erreur lors de l envoi de l email:',error);
      }
    );
  }
}
