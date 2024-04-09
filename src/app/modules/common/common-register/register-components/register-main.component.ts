import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { Usuario } from '../register-models/usuario';
import { NewUser } from '../register-models/NewUserStep1';
import { newUser2 } from '../register-models/NewUserStep2';
import { RegisterService } from '../register-service/register.service';

@Component({
  selector: 'app-register-main',
  templateUrl: './register-main.component.html',
  styleUrls: ['./register-main.component.scss'],
})
export class RegisterMainComponent {
  step2: boolean = false;
  newUser: NewUser;
  newUser2: newUser2;

  constructor(
    private registroService: RegisterService,
    private titleCase: TitleCasePipe,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  getDataStep1($event): void {
    this.newUser = $event;
    this.step2 = true;
  }

  getDataStep2($event): void {
    this.newUser2 = $event;
    this.registerUser();
  }

  backStep1($event) {
    this.step2 = $event;
  }

  registerUser(): void {
    const usuario = new Usuario(
      this.titleCase.transform(this.newUser.userName),
      this.titleCase.transform(this.newUser.surnameUser),
      this.newUser.dateBorn,
      this.newUser.email,
      this.newUser.password,
      this.newUser2.country,
      this.newUser2.nativeLanguage,
      this.newUser2.urlPhoto,
      this.newUser2.descriptionUser,
      this.newUser2.learnLanguage,
      this.newUser2.languageLevel,
      this.newUser2.interest
    );

    Swal.fire({
      title: 'Registrando usuario...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.activatedRoute.queryParams.subscribe((params) => {
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
                  localStorage.setItem('correo', this.newUser.email);
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
                localStorage.setItem('correo', this.newUser.email);
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
