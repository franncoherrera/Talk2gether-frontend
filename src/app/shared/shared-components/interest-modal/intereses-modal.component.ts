import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService } from 'src/app/shared/shared-services/custom-modal.service';
import { InteresesService } from '../../../modules/common/common-register/register-service/intereses.service';
import { Interest } from '../../../modules/common/common-register/register-models/interest';

@Component({
  selector: 'app-intereses-modal',
  templateUrl: './intereses-modal.component.html',
  styleUrls: ['./intereses-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InterestModalComponent implements OnInit {
  intereses: Interest[] = [];
  interesesCargados = false;

  constructor(
    private modalService: ModalService,
    private interesesService: InteresesService
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

  interesesPrecargados: Interest[] = [];
  interesesSeleccionados: Interest[] = [];

  seleccionarInteres(id: number) {
    const interesSelect = this.intereses.find((interes) => interes.id == id);
    if (
      this.interesesSeleccionados.length > 0 &&
      this.interesesSeleccionados.find((interes) => interes.id == id)
    ) {
      interesSelect.selected = false;
      this.interesesSeleccionados = this.interesesSeleccionados.filter(
        (interes) => interes.id !== id
      );
    } else {
      interesSelect.selected = true;
      this.interesesSeleccionados.push(interesSelect);
    }
  }

  dismissModal() {
    this.modalService.dismissActiveModal();
  }
}
