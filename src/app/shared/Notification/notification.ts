import { TransactionService } from "../service/transaction.service";
import { UserService } from "../service/user.service";
export class Notification {
    constructor(private transactionService:TransactionService,private userService:UserService){}
    effectuerTransaction(montant:number):void{
        this.transactionService.verifierTransaction(montant).subscribe(
            (estTransactionPossible:boolean)=>{
                if(estTransactionPossible){
                    this.transactionService.effectuerTransaction(montant).subscribe()
                }
            }
        )
    }
}
/**
 constructor(private transactionService: TransactionService, private userService: UserService) { }

  // Fonction pour effectuer une transaction
  effectuerTransaction(montant: number): void {
    // Appel à la méthode verifierTransaction du service TransactionService
    this.transactionService.verifierTransaction(montant).subscribe(
      (estTransactionPossible: boolean) => { // Succès de la vérification de la transaction
        if (estTransactionPossible) {
          // Effectuer la transaction car le solde de l'utilisateur est suffisant
          this.transactionService.effectuerTransaction(montant).subscribe(
            () => {
              // La transaction a réussi, vous pouvez effectuer des actions supplémentaires si nécessaire
            },
            (error) => {
              console.error('Erreur lors de l\'exécution de la transaction :', error);
              // Gérer les erreurs lors de l'exécution de la transaction
            }
          );
        } else {
          // Afficher un message à l'utilisateur indiquant que le solde est insuffisant
          console.log('Le solde de l\'utilisateur est insuffisant pour effectuer cette transaction.');
        }
      },
      (error) => { // Erreur lors de la vérification de la transaction
        console.error('Erreur lors de la vérification de la transaction :', error);
        // Gérer les erreurs lors de la vérification de la transaction
      }
    );
  }
}
 */