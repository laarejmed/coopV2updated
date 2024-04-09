import { User } from "./user";
export class LoginRequest {
    idLogin!:number;
    email!:string;
    password!:string;
    user:User[]=[];
}
