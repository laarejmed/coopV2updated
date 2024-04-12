import { Injectable } from '@angular/core';
import {Compte} from '../models/compte';
import {Observable} from 'rxjs';
import {BankAccountModel} from '../models/bankAccount-model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class BankAccountServiceService {
  readonly baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }
  setBankAccount(bankAccount: BankAccountModel): Observable<Response> {
    return this.http.post<Response>(
      this.baseUrl + 'bankaccount/add',
      bankAccount
    );
  }
  getAccounts(): Observable<BankAccountModel[]> {
    return this.http.get<BankAccountModel[]>(this.baseUrl + 'bankaccount/list');
  }
  getBankAccount(userId: string): Observable<BankAccountModel> {
    return this.http.get<BankAccountModel>(
      this.baseUrl + `comptes/${userId}`
    );
  }
  validateAccounts(accountList: Array<number>): Observable<BankAccountModel[]> {
    return this.http.post<BankAccountModel[]>(
      this.baseUrl + 'comptes/validate',
      accountList
    );
  }
  deleteAccounts(accountList: Array<number>): Observable<BankAccountModel[]> {
    return this.http.post<BankAccountModel[]>(
      this.baseUrl + 'comptes/delete',
      accountList
    );
  }
}
