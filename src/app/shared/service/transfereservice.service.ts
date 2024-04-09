import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, Observer, of, switchMap} from "rxjs";
import {User} from "../models/user";
// @ts-ignore
import * as pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
@Injectable({
  providedIn: 'root'
})
export class TransfereserviceService {
  user:User;
  private apiUrl = '/api/receipts';
  private apiUrl1 = '/api/compte';
  constructor(private http:HttpClient) {
    this.user=new User();
  }
  transferFunds(amount:number,recipient:string):Observable<any>{
    return this.checkAccountBalance(amount).pipe(
      switchMap((hasSufficientBalance:boolean)=>{
        if(!hasSufficientBalance){
          return of({success:false,message:'Solde insuffisant'})
        }
        return this.performTransfer(amount,recipient).pipe(
          switchMap((transferResult:any)=>{
            if(!transferResult.success){
              return of({success:false,message:'Echec du transfert'});
            }
            const recieptData={
              anmout:amount,
              recipient:recipient,
              date:new Date().toISOString(),
              sender:this.user.nom,
            };
            this.genereateReceiptPdf(recieptData);
            return this.saveReceiptToDatabase(recieptData).pipe(
              switchMap((saveResult:any)=>{
                if(!saveResult.success){
                  return of({success:false,message:'Echec de l enregistrement du reçu'});
                }
                return this.updateAccountBalance(amount).pipe(
                  switchMap((updateResult:any)=>{
                    if(!updateResult.success){
                      return of({success:false,message:'Echec de la mise a jour du solde du compte'});
                    }
                    return of({success:true,message:'Transfere reussie'});
                  })
                );
              })
            );
          })
        );
      }),
      catchError(error=>{
        console.error('Erreur lors de la vérification du solde du compte:',error);
        return of({success:false,message:'Erreur lors de la vérification du solde du compte'});
      })
    );
  }
  private checkAccountBalance(amount: number): Observable<boolean> {
    return this.http.get<number>('/compte/balance').pipe(
      map((balance: number) => {
        return balance >= amount;
      })
    );
  }
  private performTransfer(anmout:number,recipient:string):Observable<any>{
    return this.http.post<any>('/api/transfere',{anmout,recipient});
  }
  private genereateReceiptPdf(receiptData:any):void{
    const documentDefinition={
      content:[
        {text:'Receipt',style:'header'},
        {text: `Date:${receiptData.date}`,style:'subheader'},
        {text: `Recipient:${receiptData.recipient}`,style: 'subheader'},
        {text: `Anmout: ${receiptData.anmout}`,style:'subheader'}
      ],
      styles:{
        header:{
          fontSize:18,
          bold:true,
          margin:[0,0,0,10]
        },
        subheader:{
          fontsize:14,
          bold: true,
          margin: [0,10,0,5]
        }
      }
    };
    const pdfDocGenerator=pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download('receipt.pdf');
  }
  saveReceiptToDatabase(receiptData:any):Observable<any>{
    return this.http.post<any>(this.apiUrl,receiptData);
  }
  updateAccountBalance(amount:number):Observable<any>{
    const updatedBalance={balance:amount};
    return this.http.patch<any>(`${this.apiUrl1}/balance`,updatedBalance);
  }
}
