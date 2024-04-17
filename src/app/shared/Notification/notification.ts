import { Observable, catchError, tap, throwError } from "rxjs";
import { TransactionService } from "../service/transaction.service";
import { UserService } from "../service/user.service";
export class Notification {
    constructor(private transactionService:TransactionService,private userService:UserService){}
    effecterTransaction(montant:number):void{
      this.transactionService.verifierTransaction(montant)
        .subscribe({
            next: (estTransactionPossible: boolean) => {
                if (estTransactionPossible) {
                    this.executerTransaction(montant);
                } else {
                    console.log('Le solde de l\'utilisateur est insuffisant pour effectuer cette transaction.');
                }
            },
            error: (error) => {
                console.error('Erreur lors de la vérification de la transaction :', error);
            }
        });
    }
    executerTransaction(montant:number):Observable<void>{
      return this.transactionService.effectuerTransaction(montant).pipe(
        tap(() => {
          console.log('La transaction a été effectuée avec succès.');
        }),
        catchError((error) => {
          console.error('Une erreur est survenue lors de l\'exécution de la transaction :', error);
          return throwError('Une erreur est survenue lors de l\'exécution de la transaction'); // Renvoyer une erreur sous forme de chaîne de caractères
        })
      );
    }
}