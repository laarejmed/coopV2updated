import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Observer} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ReceiptServiceService {

  constructor(private httpClient:HttpClient) { }
  fetchReceiptData():Observable<any>{
    return this.httpClient.get<any>('admin/receipts');
  }
  fetchReceiptDataFromBackend():Observable<any>{
    const url="admin/Receipt";
    return this.httpClient.get(url);
  }
}
