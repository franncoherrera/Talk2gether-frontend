import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/shared/shared-services/custom-register-password-validations.service';
import { VALIDATOR_PATTERNS, VALIDATOR_SIZE } from 'src/app/constants/PATTERNS';
import { common_register } from 'src/app/transalation/es/common/common_message_register_es';
import { NewUser } from '../../register-models/NewUserStep1';
import { Location } from '@angular/common';
import { icon_class } from 'src/assets/icons_class/icon_class';

@Component({
  selector: 'app-register-user-step-1',
  templateUrl: './register-user-step-1.component.html',
  styleUrls: ['./register-user-step-1.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterUserStep1Component implements OnInit {
  // Constantes
  patternEmail = VALIDATOR_PATTERNS;
  common_register = common_register;
  icon_class = icon_class;
  validator_size = VALIDATOR_SIZE;
  // Validaciones
  emptyDate: boolean = true;
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;

  registerForm: FormGroup;

  @Output() sendData: EventEmitter<NewUser> = new EventEmitter();

  constructor(private location: Location) {}

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
        email: new FormControl('', [
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

    const nacimiento = document.getElementById('dateBorn') as HTMLInputElement;
    let today = new Date();
    nacimiento.max = new Date(
      today.getFullYear() - this.validator_size.minimunAge,
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .split('T')[0];

    if (sessionStorage.getItem('userName')) {
      const inputFecha = document.getElementById(
        'dateBorn'
      ) as HTMLInputElement;
      inputFecha.value = sessionStorage.getItem('dateBorn');
      this.registerForm
        .get('userName')
        .setValue(sessionStorage.getItem('userName'));
      this.registerForm
        .get('surnameUser')
        .setValue(sessionStorage.getItem('surnameUser'));
      this.registerForm.get('dateBorn').setValue(inputFecha.value);
      this.registerForm.get('email').setValue(sessionStorage.getItem('email'));
    }
  }

  // Método para validar la fecha y disparar errores
  selectDate(): void {
    this.registerForm.get('dateBorn').markAsTouched();
    const inputFecha = document.getElementById('dateBorn') as HTMLInputElement;
    inputFecha.oninput = () => {
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

  // Método para manejar abrir y cerrar el ojo del input
  togglePasswordView(): void {
    this.showPassword = !this.showPassword;
  }
  toggleRepeatPasswordView(): void {
    this.showRepeatPassword = !this.showRepeatPassword;
  }

  // Metódo para emitir la primer parte del formulario
  goSecondPartForm(): void {
    const newUser: NewUser = {
      userName: this.registerForm.get('userName').value,
      surnameUser: this.registerForm.get('surnameUser').value,
      dateBorn: this.registerForm.get('dateBorn').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
    };
    this.sendData.emit(newUser);
  }

  returnPage(): void {
    this.location.back();
  }
}
