import {HttpClient} from '@angular/common/http';
import {Observable,Observer, Subject, catchError, from, throwError} from 'rxjs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from  'pdfmake/build/vfs_fonts';
import * as nodemailer from 'nodemailer';
//import { text } from 'stream/consumers';
//import * as fs from 'fs';
import { text } from 'streamroller/lib';
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
  async sendEmailWithPdf(email:string,pdfpath:string){
    const transporter=nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:'infos.chafaf@gmail.com',
        pass:'chafaf'
      }
    });
    const pdfContent=fs.readFileSync(pdfpath);
    const mailOptions={
      from:'infos.chafaf@gmail.com',
      to:'email',
      subject:'Votre reçu pdf',
      text:'Veuillez trouver ci-joint votre reçue PDF',
      attachments:[{
        filename:'recu.pdf',
        content:pdfContent
      }]
    };
    try{
      await transporter.sendMail(mailOptions);
      console.log('Email envoyé avec succés!');
    }
    catch(error){
      console.error('Erreur lors de l envoie de l email:',error);
      throw error;
    }
  }
}
