import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  errorAlert(message: string, title: string){
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonColor: '#2b6a78',
    });
  }

}
