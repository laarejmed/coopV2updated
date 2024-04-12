import { Component, OnInit } from '@angular/core';
import { NotificationServiceService } from '../shared/service/notification-service.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService:NotificationServiceService) { }
  ngOnInit(): void {
  }
  notificationValiderCompte():void{
    const solde = this.notificationService.getSoldeUtilisateur();
    if(solde>=0){
      this.notificationService.showSuccesNotification('Solde du compte:'+solde);
    }
    else{
      this.notificationService.showErrorNotification('Solde du compte insuffisant');
    }
  }
  notificationValiderTransaction(solde:number):void{
    const transactionPossible=this.notificationService.verifierTransaction(solde);
    if(transactionPossible){
      this.notificationService.showSuccesNotification('Transaction autorisée.');
    }
    else{
      this.notificationService.showErrorNotification('Transaction non autorisée.');
    }
  }
  notificationValiderTransfere(solde:number):void{
    const transferePossible=this.notificationService.verifierTransaction(solde);
    if(transferePossible){
      this.notificationService.showSuccesNotification('Transfert autorisé');
    }
    else{
      this.notificationService.showErrorNotification('Transfert non autorisé');
    }
  }
}