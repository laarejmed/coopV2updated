import { Injectable } from '@angular/core';
import {TokenModel} from "../models/token-model";
import {BehaviorSubject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {
  jwt!:TokenModel;
  switchBtn!:boolean;
  private switchBtnUId=new BehaviorSubject<string>('initial');
  switchBtnUId$=this.switchBtnUId.asObservable();
  updateswitchBtnUId(newValue:string){
    this.switchBtnUId.next(newValue);
  }
  constructor() {
    const res=localStorage.getItem('auth');
    if(res){
      this.jwt=JSON.parse(res);
    }
    this.switchBtn=true;
  }
  saveToken(tokenModel:TokenModel){
    this.jwt=tokenModel;
    localStorage.setItem('auth',JSON.stringify(tokenModel));
    return true;
  }
  saveToken2(tokenModel:TokenModel){
    this.jwt=tokenModel;
    localStorage.setItem('authcoop',JSON.stringify(tokenModel));
    return true;
  }
  isConnected(){
    return this.jwt!=null;
  }
  isAdmin(){
    return this.jwt.isAdmin;
  }
  getToken(){
    return this.jwt.token;
  }
  removeToken() {
    this.jwt!=null;
    this.switchBtn = true;
    localStorage.removeItem('auth');
  }
  getConnectedUserId(){
    return this.jwt.cif;
  }
  parseDate(){
    return Date.parse(this.jwt.validTo.toString());
  }
}
