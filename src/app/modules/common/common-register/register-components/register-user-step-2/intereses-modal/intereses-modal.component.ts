import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Interes } from '../models/Interes';
import { SpinnerServiceGeneral } from 'src/app/shared/shared-components/spinner-world-loading/spinner.service';
import { ModalService } from 'src/app/shared/shared-services/custom-modal.service';
import { InteresesService } from '../../../register-service/intereses.service';

@Component({
  selector: 'app-intereses-modal',
  templateUrl: './intereses-modal.component.html',
  styleUrls: ['./intereses-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InteresesModalComponent implements OnInit {
  intereses: Interes[] = [];
  interesesCargados = false;

  constructor(
    private modalService: ModalService,
    private interesesService: InteresesService,
    private spinner: SpinnerServiceGeneral
  ) {}

  ngOnInit() {
    this.interesesService.obtenerIntereses().subscribe({
      next: (response) => {
        this.intereses = response;
        this.interesesCargados = true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  interesesPrecargados: Interes[] = [];
  interesesSeleccionados: Interes[] = [];

  seleccionarInteres(id: number) {
    const interesSelect = this.intereses.find((interes) => interes.id == id);
    if (
      this.interesesSeleccionados.length > 0 &&
      this.interesesSeleccionados.find((interes) => interes.id == id)
    ) {
      interesSelect.seleccionado = false;
      this.interesesSeleccionados = this.interesesSeleccionados.filter(
        (interes) => interes.id !== id
      );
    } else {
      interesSelect.seleccionado = true;
      this.interesesSeleccionados.push(interesSelect);
    }
  }

  dismissModal() {
    this.modalService.dismissActiveModal();
  }
}