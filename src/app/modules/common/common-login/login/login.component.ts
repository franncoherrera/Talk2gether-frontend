import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login-services/login.service';
import Swal from 'sweetalert2';
import { SpinnerServiceGeneral } from 'src/app/shared/spinner-world-loading/spinner.service';
import { VerificarCuentaService } from '../../common-verify-account/servicios/verificar-cuenta.service';
import { common_login } from 'src/app/transalation/COMMON_MESSAGES_es';
import { routes_path } from 'src/app/constants/ROUTES';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitForm: boolean = false;
  patternEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  submitError: boolean = false;
  showPassword: boolean = false;
  passwordType: string = 'password';
  showRepeatPassword: boolean = false;
  repeatPasswordType: string = 'password';
  localSesion: string;

  /*Variable especial para los mensajes*/
  common_login: any = common_login;

  motivosReporte: string[];

  constructor(
    private router: Router,
    private loginService: LoginService,
    private spinnerServiceGeneral: SpinnerServiceGeneral,
    private verificarCuentaService: VerificarCuentaService,
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [
          Validators.pattern(this.patternEmail),
          Validators.required,
        ]),
        password: new FormControl('', [Validators.required]),
      },
      {
        updateOn: 'change',
      }
    );
  }

  recoverPassword() {
    this.router.navigate([routes_path.recover_pass_path]);
  }

  enviarDatos() {
    this.submitForm = true;
    if (this.loginForm.invalid) return;
    this.spinnerServiceGeneral.showSpinner();
    this.loginService
      .login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      )
      .subscribe({
        next: (response) => {
          this.loginService.guardarRol(response['nombreRol']);
          this.spinnerServiceGeneral.hideSpinner();
          document.location.href = 'inicio';
          // this.router.navigate(['inicio']);
        },
        error: (error) => {
          this.spinnerServiceGeneral.hideSpinner();
          const expression = error['error']['numeroError'];
          switch (expression) {
            case 1: {
              this.submitError = true;
              break;
            }
            case 2: {
              this.router.navigate(['verificar-cuenta']);
              sessionStorage.clear();
              localStorage.setItem('correo', this.loginForm.get('email').value);
              this.verificarCuentaService
                .reenviarCorreo(localStorage.getItem('correo'))
                .subscribe(
                  (response) => {
                    this.router.navigate(['verificar-cuenta']);
                  },
                  (error) => {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Su cuenta no esta verificada. Se intento reenviar el correo pero ocurrio un error. Inicie sesión mas tarde.',
                      confirmButtonColor: '#2b6a78',
                    });
                  }
                );
              break;
            }
            case 3: {
              this.motivosReporte = error['error']['cuentaEliminadaMotivos'];
              this.loginService.guardarMotivo(this.motivosReporte);
              this.router.navigate(['bloqueado']);
              break;
            }
            default: {
              this.mensajeError();
              break;
            }
          }

          this.spinnerServiceGeneral.hideSpinner();
        },
      });
  }

  mensajeError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '¡Algo anda mal! Intente nuevamente mas tarde.',
      confirmButtonColor: '#2b6a78',
    });
  }
  togglePasswordView(fromRepeat: boolean = false) {
    if (!fromRepeat) {
      this.showPassword = !this.showPassword;
      if (this.showPassword) {
        this.passwordType = 'text';
      } else {
        this.passwordType = 'password';
      }
    } else {
      this.showRepeatPassword = !this.showRepeatPassword;
      if (this.showRepeatPassword) {
        this.repeatPasswordType = 'text';
      } else {
        this.repeatPasswordType = 'password';
      }
    }
  }
}
