import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { RegistroService } from '../register-service/registro.service';
import { Usuario } from '../register-models/usuario';
import { NewUser } from '../register-models/new-user-step-1';
import { newUser2 } from '../register-models/new-user-step-2';

@Component({
  selector: 'app-register-main',
  templateUrl: './register-main.component.html',
  styleUrls: ['./register-main.component.scss'],
})
export class RegisterMainComponent {
  step2: boolean = false;
  nuevoUsuario: NewUser;
  nuevoUsuario2: newUser2;

  constructor(
    private registroService: RegistroService,
    private titleCase: TitleCasePipe,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getDataStep1($event) {
    this.nuevoUsuario = $event;
    this.step2 = true;
  }

  getDataStep2($event) {
    this.nuevoUsuario2 = $event;
    this.registrarUsuario();
  }

  backStep1($event) {
    this.step2 = $event;
  }

  registrarUsuario() {
    const usuario = new Usuario(
      this.titleCase.transform(this.nuevoUsuario.userName),
      this.titleCase.transform(this.nuevoUsuario.surnameUser),
      this.nuevoUsuario.dateBorn,
      this.nuevoUsuario.email,
      this.nuevoUsuario.password,
      this.nuevoUsuario2.country,
      this.nuevoUsuario2.nativeLanguage,
      this.nuevoUsuario2.urlPhoto,
      this.nuevoUsuario2.descriptionUser,
      this.nuevoUsuario2.learnLanguage,
      this.nuevoUsuario2.languageLevel,
      this.nuevoUsuario2.interest
    );

    Swal.fire({
      title: 'Registrando usuario...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.route.queryParams.subscribe((params) => {
          const referidoValue = params['referido'];
          if (referidoValue) {
            this.registroService
              .crearReferido(usuario, referidoValue)
              .subscribe({
                next: (response) => {
                  Swal.hideLoading();
                  this.mensajeConfirmacion();
                  this.router.navigate(['verificar-cuenta']);
                  sessionStorage.clear();
                  localStorage.setItem('correo', this.nuevoUsuario.email);
                },
                error: (error) => {
                  Swal.hideLoading();
                  this.mensajeError(error);
                },
              });
          } else {
            this.registroService.crear(usuario).subscribe({
              next: (response) => {
                Swal.hideLoading();
                this.mensajeConfirmacion();
                this.router.navigate(['verificar-cuenta']);
                sessionStorage.clear();
                localStorage.setItem('correo', this.nuevoUsuario.email);
              },
              error: (error) => {
                Swal.hideLoading();
                this.mensajeError(error);
                console.log(error);
              },
            });
          }
        });
      },
    });
  }

  mensajeConfirmacion() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Usuario creado correctamente',
    });
  }

  mensajeError(error) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: 'error',
      title: 'Error en el registro de usuario.',
      text: error.error,
    });
  }
}
