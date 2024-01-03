import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalService } from '../../common/common-register/servicios/modal.service';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Permiso } from './modelos/permiso';
import { PermisosService } from './service/permisos.service';
import { EditarPermisoComponent } from './editar-permiso/editar-permiso.component';
import { SpinnerServiceGeneral } from 'src/app/shared/shared-components/spinner-world-loading/spinner.service';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss'],
})
export class PermisosComponent {
  permisoList: Permiso[] = [];
  modalRef: NgbModalRef;
  nuevoPermiso: Permiso;
  permisosOrdenados: any[] = [];
  constructor(
    private permisoService: PermisosService,
    private spinnerServiceGeneral: SpinnerServiceGeneral,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.spinnerServiceGeneral.showSpinner();
    this.permisoService.traerPermisos().subscribe({
      next: (permisos: Permiso[]) => {
        for (const permiso of permisos) {
          this.nuevoPermiso = {
            id: permiso['id'],
            nombrePermiso: permiso['nombrePermiso'],
            listaNombreRol: permiso['listaNombreRol'],
          };
          this.permisoList.push(this.nuevoPermiso);
        }
        this.ordenarPorNombrePermiso();
        this.spinnerServiceGeneral.hideSpinner();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonColor: '#199DE8',
          text: 'Algo salió mal! Reinicie la página. Si el error persiste intente mas tarde.',
        });
        this.spinnerServiceGeneral.hideSpinner();
      },
    });
  }

  ordenarPorNombrePermiso(): void {
    this.permisoList = this.permisoList.slice().sort((a, b) => {
      const nombreA = a.nombrePermiso.toLowerCase();
      const nombreB = b.nombrePermiso.toLowerCase();
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });
  }
  modificarPermiso(id: number, nombreRuta: string, listaRoles: string[]) {
    this.permisoService.guardarId(id);
    this.permisoService.guardarRuta(nombreRuta);
    this.permisoService.guardarNombreRolList(listaRoles);
    this.modalRef = this.modalService.open(EditarPermisoComponent, {
      centered: true,
    });
  }
}
