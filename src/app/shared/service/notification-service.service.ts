import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  private soldeUtilisateur:number;
  private userService:UserService;
  constructor(private tostr:ToastrService) {
    this.soldeUtilisateur=this.getSoldeUtilisateur();
   }
  showSuccesNotification(message:string):void{
    this.tostr.success(message,"Success");
  }
  showErrorNotification(message:string):void{
    this.tostr.error(message,'Error');
  }
  getSoldeUtilisateur():number{
    return this.soldeUtilisateur;
  }
  private getSoldeFromLocalStorage():number{
    const solde=localStorage.getItem('soldeUtilisateur');
    return solde ? parseFloat(solde):0;
  }
  verifierTransaction(montantTransaction: number): boolean {
    const soldeUtilisateur = this.userService.getSoldeUtilisateur();
    return soldeUtilisateur >= montantTransaction;
  }
}