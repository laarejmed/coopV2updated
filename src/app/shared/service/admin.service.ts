import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient, HttpUrlEncodingCodec} from "@angular/common/http";
import {Observable} from "rxjs";
import {ItemModel} from "../models/item-model";
import {UserItemModel} from "../models/user-item-model";
import {UserBankItemModel} from "../models/user-bank-item-model";
import { saveAs } from 'file-saver';
import {Transfere} from "../models/transfere";
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  readonly basUrl = environment.apiUrl;
  progressNumber: number;
  private readonly endpoint:string='transfere';
  constructor(private http: HttpClient) {
    this.progressNumber = 0;
  }

  getUsers(page: number = 0): Observable<ItemModel<UserItemModel>> {
    return this.http.get<ItemModel<UserItemModel>>(
      this.basUrl + `user/list/${page}`
    );
  }

  getProgressUsers(): Observable<number> {
    return this.http.get<number>(this.basUrl + 'user/progress/list');
  }

  getUser(cif: string): Observable<UserBankItemModel> {
    return this.http.get<UserBankItemModel>(this.basUrl + `user/${cif}`)
  }

  searchUser(value: string): Observable<UserItemModel[]> {
    const codec = new HttpUrlEncodingCodec();
    console.log(codec.encodeValue(value.replace('/', '!')));
    return this.http.get<UserItemModel[]>(
      this.basUrl + `user/search/${codec.encodeValue(value.replace('/', '!'))}`
    );
  }

  validateUsers(userList: Array<string>): Observable<Response> {
    return this.http.post<Response>(this.basUrl + 'user/validate', userList);
  }

  rejectUsers(userList: Array<string>): Observable<Response> {
    return this.http.post<Response>(this.basUrl + 'user/reject', userList);
  }

  deleteUsers(userList: Array<string>): Observable<Response> {
    return this.http.post<Response>(this.basUrl + 'user/delete', userList);
  }

  //imporatation Users
  importAsCsv(compteId: number) {
    this.http.get(this.basUrl + '/csv/' + compteId, {responseType: 'arraybuffer'}).subscribe(res =>
      this.downLoadFile(res, 'text/csv')
    );
  }

  downLoadFile(data: any, type: string) {
    const blob = new Blob([data], {type: type});
    saveAs(blob, 'Users');
  }

  importAsExcel(compteId: number) {
    return this.http.get(this.basUrl + '/excel/' + compteId, {responseType: 'arraybuffer'}).subscribe(res =>
      this.downLoadFile(res, 'application/vnd.ms-excel')
    );
  }

  importAsPdf(compteId: number) {
    return this.http.get(this.basUrl + '/pdf/' + compteId, {responseType: 'arraybuffer'}).subscribe(res =>
      this.downLoadFile(res, 'application/pdf')
    );
  }

  importAllUsersAsCsv() {
    this.http.get(this.basUrl + 'user/admin/csv', {responseType: 'arraybuffer'}).subscribe(res =>
      this.downLoadFile(res, 'text/csv')
    );
  }

  importAllUsersAsExcel() {
    return this.http.get(this.basUrl + 'user/admin/excel', {responseType: 'arraybuffer'}).subscribe(res =>
      this.downLoadFile(res, 'application/vnd.ms-excel')
    );
  }

  importAllUsersAsPdf() {
    return this.http.get(this.basUrl + 'user/admin/pdf', {responseType: 'arraybuffer'}).subscribe(res =>
      this.downLoadFile(res, 'application/pdf')
    );
  }
  getTransfere(typeTransfere:string):Observable<Transfere>{
    const url=`${this.basUrl}/${this.endpoint}/${typeTransfere};`
    return this.http.get<Transfere>(url);
  }
  searchTransfere(value:string):Observable<Transfere[]>{
    const codec=new HttpUrlEncodingCodec();
    const encodedValue=codec.encodeValue(value.replace('/','!'));
    const url=`${this.basUrl}/${this.endpoint}/search/${encodedValue}`;
    return this.http.get<Transfere[]>(url);
  }
  validateTransfere(transfereList:Array<string>):Observable<Response>{
    return this.http.post<Response>(`${this.basUrl}/${this.endpoint}/validate`, transfereList);
  }
  rejectTransfere(transfereList:Array<string>):Observable<Response>{
    return this.http.post<Response>(this.basUrl+'transfere/reject',transfereList);
  }
  deleteTransfere(transfere: Array<string>):Observable<Response>{
    return this.http.post<Response>(this.basUrl + 'transfere/delete', transfere);
  }
}
