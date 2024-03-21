import {HttpClient, HttpUrlEncodingCodec} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as saveAs from 'file-saver';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {EmailUpdateModel} from '../models/email-update-model';
import {ItemsModel} from '../models/items-model';
import {PasswordUpdateModel} from '../models/password-update-model';
import { UserBankItemModel } from '../models/user-bank-item-model';
import {UserInfoModel} from '../models/user-info-model';
import {UserItemModel} from '../models/user-item-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly baseUrl = environment.apiUrl;
  progressNumber : number;

  constructor(private http: HttpClient) {
    this.progressNumber = 0;
  }

  setProgressNumber(count: number)
  {
    this.progressNumber = count;
  }
  getProgressNumber()
  {
    return this.progressNumber;
  }
  getUsers(page: number = 0): Observable<ItemsModel<UserItemModel>> {
    return this.http.get<ItemsModel<UserItemModel>>(
      this.baseUrl + `user/list/${page}`
    );
  }

  getProgressUsers(): Observable<number> {
    return this.http.get<number>(this.baseUrl + `user/progress/list`);
  }

  getUser(cif: string): Observable<UserBankItemModel> {
    return this.http.get<UserBankItemModel>(this.baseUrl + `user/${cif}`);
  }

  searchUser(value: string): Observable<UserItemModel[]> {
    const codec = new HttpUrlEncodingCodec();
    console.log(codec.encodeValue(value.replace('/', '!')));
    return this.http.get<UserItemModel[]>(
      this.baseUrl + `user/search/${codec.encodeValue(value.replace('/', '!')) }`
    );
  }
  
  validateUsers(userList: Array<string>): Observable<Response> {
    return this.http.post<Response>(this.baseUrl + `user/validate`, userList);
  }

  rejectUsers(userList: Array<string>): Observable<Response> {
    return this.http.post<Response>(this.baseUrl + `user/reject`, userList);
  }

  deleteUsers(userList: Array<string>): Observable<Response> {
    return this.http.post<Response>(this.baseUrl + `user/delete`, userList);
  }

  updateUserInfo(userInfo: UserInfoModel): Observable<Response> {
    return this.http.put<Response>(this.baseUrl + `user/update/info`, userInfo);
  }

  updateEmail(userEmail: EmailUpdateModel): Observable<Response> {
    return this.http.put<Response>(
      this.baseUrl + `user/update/email`,
      userEmail
    );
  }

  updatePassword(userPassword: PasswordUpdateModel): Observable<Response> {
    return this.http.put<Response>(
      this.baseUrl + `user/update/password`,
      userPassword
    );
  }


  // importation Users  //
  importAsCsv(bankAccountId: number) {

    this.http.get(this.baseUrl + '/csv/' + bankAccountId, { responseType: 'arraybuffer' }).subscribe(res =>
      this.downLoadFile(res, 'text/csv')
    );
  }

  importAsExcel(bankAccountId: number) {
    return this.http.get(this.baseUrl + '/excel/' + bankAccountId, { responseType: 'arraybuffer' }).subscribe(res =>
      this.downLoadFile(res, 'application/vnd.ms-excel ')
    );

  }

  importAsPdf(bankAccountId: number) {
    return this.http.get(this.baseUrl + '/pdf/' + bankAccountId, { responseType: 'arraybuffer' }).subscribe(res =>
      this.downLoadFile(res, 'application/pdf')
    );

  }

  importAllUsersAsCsv() {

    this.http.get(this.baseUrl + 'user/admin/csv', { responseType: 'arraybuffer' }).subscribe(res =>
      this.downLoadFile(res, 'text/csv')
    );
  }

  importAllUsersAsExcel() {
    return this.http.get(this.baseUrl + 'user/admin/excel', { responseType: 'arraybuffer' }).subscribe(res =>
      this.downLoadFile(res, 'application/vnd.ms-excel ')
    );

  }

  importAllUsersAsPdf() {
    return this.http.get(this.baseUrl + 'user/admin/pdf', { responseType: 'arraybuffer' }).subscribe(res =>
      this.downLoadFile(res, 'application/pdf')
    );

  }

  downLoadFile(data: any, type: string) {
    const blob = new Blob([data], { type: type });
    saveAs(blob, 'Users');
  }
}
