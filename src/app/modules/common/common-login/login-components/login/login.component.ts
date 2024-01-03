import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../login-services/login.service';
import { VerificarCuentaService } from '../../../common-verify-account/servicios/verificar-cuenta.service';
import {
  common_error,
  common_login,
} from 'src/app/transalation/es/COMMON_MESSAGES_es';
import { routes_path } from 'src/app/constants/ROUTES';
import { Subscription, catchError, map, of, tap } from 'rxjs';
import { VALIDATOR_PATTERNS } from 'src/app/constants/PATTERNS';
import { AlertsService } from 'src/app/helpers/alerts.service';
import { TokenSession } from '../../login-models/TokenSession';
import { icon_class } from 'src/assets/icons_class/icon_class';
import { SpinnerServiceGeneral } from 'src/app/shared/shared-components/spinner-world-loading/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  submitForm: boolean = false;

  submitError: boolean = false;

  /* Variable de mostrar y ocultar contraseña */
  showPassword: boolean = false;
  passwordType: string = 'password';
  showRepeatPassword: boolean = false;
  repeatPasswordType: string = 'password';

  /*Variable especial para los mensajes e iconos*/
  common_login = common_login;
  icon_class = icon_class;

  sessionSubscription: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private spinnerServiceGeneral: SpinnerServiceGeneral,
    private alertService: AlertsService,
    private verificarCuentaService: VerificarCuentaService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [
          Validators.pattern(VALIDATOR_PATTERNS.patternEmail),
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

  sendLoginSession() {
    this.submitForm = true;
    if (this.loginForm.invalid) return;
    this.spinnerServiceGeneral.showSpinner();
    this.sessionSubscription = this.loginService
      .login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      )
      .pipe(
        map<TokenSession, string>(
          /* Error de backend "nombreRol = nameRol" */
          (sessionResponse) => sessionResponse.nombreRol
        )
      )
      .subscribe({
        next: (roleName) => {
          this.spinnerServiceGeneral.hideSpinner();
          this.loginService.saveRole(roleName);
          document.location.href = routes_path.principal_path;
        },
        error: (errorSessionResponse) => {
          this.spinnerServiceGeneral.hideSpinner();
          /* Dependiendo el numero de error es lo se que ejecuta */
          const numberError = errorSessionResponse['error']['numeroError'];
          const reasonReport =
            errorSessionResponse['error']['cuentaEliminadaMotivos'];
          /* Método para seleccionar como se trata lo que pasa en el error de forma mas ordenada */
          this.errorNumberSessionResponse(numberError, reasonReport);
        },
      });
  }

  errorNumberSessionResponse(numberError: number, reasonReport: string[]) {
    switch (numberError) {
      case 1: {
        /* Usuario o contraseña no válida*/
        this.submitError = true;
        break;
      }
      case 2: {
        /* Cuenta no verificada */
        sessionStorage.clear();
        localStorage.setItem('correo', this.loginForm.get('email').value);
        this.sessionSubscription.add(
          /* No funciona porque no esta levantado el servidor de correo */
          this.verificarCuentaService
            .reenviarCorreo(localStorage.getItem('correo'))
            .pipe(
              tap(() => this.router.navigate([routes_path.verify_account])),
              catchError((error) => {
                this.alertService.errorAlert(
                  common_error.general_error_title,
                  error
                );
                return of(error);
              })
            )
            .subscribe()
        );
        break;
      }
      case 3: {
        /* Cuenta bloqueada -se muestran los motivos de reporte-*/
        this.loginService.saveReason(reasonReport);
        this.router.navigate([routes_path.user_bloqued_by_admin]);
        break;
      }
      default: {
        this.alertService.errorAlert(
          common_error.general_error_title,
          common_error.general_error_description
        );
        break;
      }
    }
  }
  /* Método para mostrar u ocultar contraseña */
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

  ngOnDestroy(): void {
    this.sessionSubscription?.unsubscribe();
  }
}
