import { User } from "./user";
export class Inscription {
    idInscription!:number;
    Nomcomplet!:string;
    Email!:string;
    password!:string;
    confirmedPassword!:string;
    NumSocial!:string;
    user:User[]=[];
    telephone!:number;
}
