import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  errorAlert(message: string, title: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonColor: '#2b6a78',
    });
  }

  errorAlertTimer(message: string, time: number) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: time,
    });
  }
}
