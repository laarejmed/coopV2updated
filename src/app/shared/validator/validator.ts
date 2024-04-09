import {FormControl, ValidationErrors} from "@angular/forms";
export class Validator {
  static notOnlyWhiteSpace(control:FormControl):ValidationErrors | null{
    if(control.value==null && control.value.trim().length===0){
      return {
        notOnlyWhiteSpace:true
      };
    }
    return null;
  }
}
