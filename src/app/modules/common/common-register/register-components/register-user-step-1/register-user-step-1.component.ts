import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoUsuario } from '../../register-models/nuevo-usuario';
import { PasswordValidator } from 'src/app/shared/shared-services/custom-register-password-validations.service';
import { VALIDATOR_PATTERNS } from 'src/app/constants/PATTERNS';
import { common_register } from 'src/app/transalation/es/common/common_message_register_es';

@Component({
  selector: 'app-register-user-step-1',
  templateUrl: './register-user-step-1.component.html',
  styleUrls: ['./register-user-step-1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterUserStep1Component implements OnInit {
  registerForm : FormGroup;
  patternEmail = VALIDATOR_PATTERNS;
  common_register = common_register;
  emptyDate: boolean = true;
  prevUrl: string = '';
  
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;

  @Output() sendData: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        userName: new FormControl('', [
          Validators.required,
          Validators.pattern(VALIDATOR_PATTERNS.patterOnlyLetters),
        ]),
        surnameUser: new FormControl('', [
          Validators.required,
          Validators.pattern(VALIDATOR_PATTERNS.patterOnlyLetters),
        ]),
        dateBorn: new FormControl('', [Validators.required]),
        correo: new FormControl('', [
          Validators.pattern(this.patternEmail.patternEmail),
          Validators.required,
        ]),
        password: new FormControl('', [
          Validators.required,
          PasswordValidator.strong,
        ]),
        password2: new FormControl('', [Validators.required]),
      },
      {
        updateOn: 'change',
      }
    );

    const nacimiento = document.getElementById(
      'nacimiento'
    ) as HTMLInputElement;
    let today = new Date();
    let minAge = 18;
    nacimiento.max = new Date(
      today.getFullYear() - minAge,
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .split('T')[0];

    if (sessionStorage.getItem('previousUrl') == '/login') {
      this.prevUrl = 'login';
    }

    if (sessionStorage.getItem('userName')) {
      const inputFecha = document.getElementById(
        'nacimiento'
      ) as HTMLInputElement;
      inputFecha.value = sessionStorage.getItem('dateBorn');
      this.registerForm
        .get('userName')
        .setValue(sessionStorage.getItem('userName'));
      this.registerForm
        .get('surnameUser')
        .setValue(sessionStorage.getItem('surnameUser'));
      this.registerForm.get('dateBorn').setValue(inputFecha.value);
      this.registerForm
        .get('correo')
        .setValue(sessionStorage.getItem('correo'));
    }
  }

  elegirFecha() {
    this.registerForm.get('dateBorn').markAsTouched();
    const inputFecha = document.getElementById(
      'nacimiento'
    ) as HTMLInputElement;
    inputFecha.oninput = (event) => {
      const fechaSeleccionada = inputFecha.value;
      if (fechaSeleccionada != '') {
        this.emptyDate = false;
        this.registerForm.get('dateBorn').setErrors(null);
        this.registerForm.get('dateBorn').setValue(inputFecha.value);
      } else {
        this.emptyDate = true;
        this.registerForm.get('dateBorn').setErrors({ required: true });
      }
    };
  }

  togglePasswordView(): void {
    this.showPassword = !this.showPassword;
  }

  toggleRepeatPasswordView(): void {
    this.showRepeatPassword = !this.showRepeatPassword;
  }

  siguientePantalla() {
    const nuevoUsuario = new NuevoUsuario(
      this.registerForm.get('userName').value,
      this.registerForm.get('surnameUser').value,
      this.registerForm.get('dateBorn').value,
      this.registerForm.get('correo').value,
      this.registerForm.get('password').value
    );
    sessionStorage.setItem('userName', nuevoUsuario.nombreUsuario);
    sessionStorage.setItem('surnameUser', nuevoUsuario.apellidoUsuario);
    sessionStorage.setItem('dateBorn', nuevoUsuario.fechaNacimiento);
    sessionStorage.setItem('correo', nuevoUsuario.correo);
    this.sendData.emit(nuevoUsuario);
  }

  volver() {
    this.router.navigate([this.prevUrl]);
  }
}
