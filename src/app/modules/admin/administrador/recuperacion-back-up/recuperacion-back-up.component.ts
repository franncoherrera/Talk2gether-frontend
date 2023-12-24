import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerServiceGeneral } from 'src/app/shared/spinner-world-loading/spinner.service';
import { ChatService } from 'src/app/modules/common/common-chat/services/chat-service.service';

@Component({
  selector: 'app-recuperacion-back-up',
  templateUrl: './recuperacion-back-up.component.html',
  styleUrls: ['./recuperacion-back-up.component.scss'],
})
export class RecuperacionBackUpComponent {
  constructor(
    private spinnerServiceGeneral: SpinnerServiceGeneral,
    private route: Router,
    private router: ActivatedRoute,
    private chatService: ChatService
  ) {}

  descargarChats() {
    this.chatService.traerChats().subscribe({
      next: (response: any[]) => {
        const cadenaJSON = JSON.stringify(response);
        const fechaHoraActual = new Date();
        const fechaHoraFormateada = fechaHoraActual
          .toISOString()
          .replace(/[-T:.Z]/g, '');
        const nombreArchivo = `${fechaHoraFormateada}_back-up-chats.json`;
        const downloadLink = document.createElement('a');
        downloadLink.setAttribute(
          'href',
          'data:text/json;charset=utf-8,' + encodeURIComponent(cadenaJSON)
        );
        downloadLink.setAttribute('download', nombreArchivo);
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
