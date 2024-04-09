import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UserItemModel} from "../models/user-item-model";
import {HttpClient, HttpUrlEncodingCodec} from "@angular/common/http";
import {UserBankItemModel} from "../models/user-bank-item-model";
import {ItemModel} from "../models/item-model";
import {environment} from "../../../environments/environment.prod";
import {PasswordUpdateModel} from "../models/password-update-model";
import {EmailUpdateModel} from "../models/email-update-model";
import {UserInfoModel} from '../models/user-info-model';
@Injectable({
  providedIn: 'root'
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
  getUsers(page: number = 0): Observable<ItemModel<UserItemModel>> {
    return this.http.get<ItemModel<UserItemModel>>(
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
      this.baseUrl + `user/search/${codec.encodeValue(value.replace('/', '!'))}`
    );
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
  updateUserInfo(userInfo: UserInfoModel):Observable<any>{
    return this.http.put<any>(environment.apiUrl, userInfo);
  }
}
