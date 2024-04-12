import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  constructor(private tostr:ToastrService) { }
  showSuccesNotification(message:string):void{
    this.tostr.success(message,"Success");
  }
  showErrorNotification(message:string):void{
    this.tostr.error(message,'Error');
  }
}