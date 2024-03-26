import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterestModalComponent } from '../../../../../shared/shared-components/interest-modal/interest-modal.component';
import { Interest } from '../../register-models/Interest';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from '@angular/fire/storage';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/shared/shared-services/custom-modal.service';
import { newUser2 } from '../../register-models/NewUserStep2';
import { common_register } from 'src/app/transalation/es/common/common_message_register_es';
import {
  IMAGE_FORMAT,
  VALIDATOR_PATTERNS,
  VALIDATOR_SIZE,
} from 'src/app/constants/PATTERNS';
import { routes_path } from 'src/app/constants/ROUTES';
import { icon_class } from 'src/assets/icons_class/icon_class';
import { Observable, Subscription, combineLatest, map } from 'rxjs';
import { ParameterList } from '../../register-models/ParameterList';
import { AlertsService } from 'src/app/helpers/alerts.service';
import { RegisterService } from '../../register-service/register.service';
import { ParametersService } from 'src/app/shared/shared-services/parameters.service';

@Component({
  selector: 'app-register-user-step-2',
  templateUrl: './register-user-step-2.component.html',
  styleUrls: ['./register-user-step-2.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterUserStep2Component implements OnInit, OnDestroy {
  /* Constantes */
  common_register = common_register;
  validatorSize = VALIDATOR_SIZE;
  imageFormat = IMAGE_FORMAT;
  validatorPattern = VALIDATOR_PATTERNS;
  routes_path = routes_path;
  icon_class = icon_class;

  /* Observables */
  parametersList$: Observable<ParameterList>;
  subscription: Subscription;

  /* Listas */
  interestList: Interest[] = [];
  interestListName: string[];

  /* Validaciones */
  notCountry: boolean = true;
  notNativeLanguage: boolean = true;
  notLearnLanguage: boolean = true;
  notLanguageLevel: boolean = true;
  notCheckBox: boolean = true;
  unabledRegister: boolean = false;

  urlPhoto: string = '';

  modalRef: NgbModalRef;
  registerForm: FormGroup;

  file!: File;
  imgRef!: StorageReference;

  @Output() sendData2: EventEmitter<newUser2> = new EventEmitter();
  @Output() backStep1: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private modalService: ModalService,
    private storage: Storage,
    private alertService: AlertsService,
    private parameterService: ParametersService
  ) {}

  ngOnInit(): void {
    this.parametersList$ = combineLatest([
      this.parameterService.opcionesPais(),
      this.parameterService.opcionesIdiomas(),
      this.parameterService.opcionesNivelIdiomas(),
    ]).pipe(
      map(([countryList, languageList, languageLevelList]) => {
        return {
          countryList,
          languageList,
          languageLevelList,
        };
      })
    );

    this.registerForm = new FormGroup(
      {
        country: new FormControl('', [Validators.required]),
        nativeLanguage: new FormControl('', [Validators.required]),
        urlPhoto: new FormControl('', [Validators.required]),
        descriptionUser: new FormControl('', [
          Validators.maxLength(this.validatorSize.maxLenghtText),
        ]),
        terms: new FormControl('', [Validators.required]),
        learnLanguage: new FormControl('', [Validators.required]),
        languageLevel: new FormControl('', [Validators.required]),
        interest: new FormControl('', [Validators.required]),
      },
      {
        updateOn: 'change',
      }
    );
    this.validateItemsSessionStorage();
  }

  validateItemsSessionStorage(): void {
    if (
      sessionStorage.getItem('country') ||
      sessionStorage.getItem('nativeLanguage') ||
      sessionStorage.getItem('descriptionUser') ||
      sessionStorage.getItem('learnLanguage') ||
      sessionStorage.getItem('languageLevel') ||
      sessionStorage.getItem('interest')
    ) {
      this.registerForm
        .get('country')
        .setValue(sessionStorage.getItem('country'));
      this.registerForm
        .get('nativeLanguage')
        .setValue(sessionStorage.getItem('nativeLanguage'));
      this.registerForm
        .get('descriptionUser')
        .setValue(sessionStorage.getItem('descriptionUser'));
      this.registerForm
        .get('learnLanguage')
        .setValue(sessionStorage.getItem('learnLanguage'));
      this.registerForm
        .get('languageLevel')
        .setValue(sessionStorage.getItem('languageLevel'));
      this.interestList = JSON.parse(sessionStorage.getItem('interest'));
      this.registerForm
        .get('interest')
        .setValue(sessionStorage.getItem('interest').split(','));
      this.registerForm.get('interest').markAsTouched();
      this.registerForm.get('interest').setErrors(null);
    }
  }

  /* Validación si fue seleccionado un país sino la bandera pasa a true */
  validateCountry(): void {
    this.registerForm.get('country').markAsTouched();
    const selectPais = document.getElementById('country') as HTMLSelectElement;
    if (selectPais.value !== '') {
      this.notCountry = false;
      this.registerForm.get('country').setErrors(null);
      this.registerForm.get('country').setValue(selectPais.value);
    } else {
      this.notCountry = true;
    }
  }

  /* Validación si fue seleccionado un idioma natino sino la bandera pasa a true */
  validateNativeLanguage(): void {
    this.registerForm.get('nativeLanguage').markAsTouched();
    const selectNativeLanguage = document.getElementById(
      'nativeLanguage'
    ) as HTMLSelectElement;
    if (selectNativeLanguage.value !== '') {
      this.notNativeLanguage = false;
      this.registerForm.get('nativeLanguage').setErrors(null);
      this.registerForm
        .get('nativeLanguage')
        .setValue(selectNativeLanguage.value);
    } else {
      this.notNativeLanguage = true;
    }
  }

  /* Validación si fue seleccionado un idioma aprendiz sino la bandera pasa a true */
  validateLearLanguage(): void {
    this.registerForm.get('learnLanguage').markAsTouched();
    const selectIdiomaAprendiz = document.getElementById(
      'learnLanguage'
    ) as HTMLSelectElement;
    if (selectIdiomaAprendiz.value !== '') {
      this.notLearnLanguage = false;
      this.registerForm.get('learnLanguage').setErrors(null);
      this.registerForm
        .get('learnLanguage')
        .setValue(selectIdiomaAprendiz.value);
    } else {
      this.notLearnLanguage = true;
    }
  }

  /* Validación si fue seleccionado nivel de idioma sino la bandera pasa a true */
  validateLanguageLevel(): void {
    this.registerForm.get('languageLevel').markAsTouched();
    const selectNivelIdioma = document.getElementById(
      'languageLevel'
    ) as HTMLSelectElement;
    if (selectNivelIdioma.value !== '') {
      this.notLanguageLevel = false;
      this.registerForm.get('languageLevel').setErrors(null);
      this.registerForm.get('languageLevel').setValue(selectNivelIdioma.value);
    } else {
      this.notLanguageLevel = true;
    }
  }

  /* Validación si fue seleccionado el checkbox de los términos y condiciones sino la bandera pasa a true */
  updateCheckbox(): void {
    this.registerForm.get('terms').markAsTouched();
    var checkbox = document.getElementById('checkBox');
    if (checkbox instanceof HTMLInputElement && checkbox.checked) {
      this.notCheckBox = false;
    } else {
      this.notCheckBox = true;
      this.registerForm.get('terms').setErrors({ required: true });
    }
  }

  popUpLanguageLevel(): void {
    Swal.fire({
      html: `
        <div class="form-group" style="text-align: left; font-size: 20px; margin-bottom: 25px;">
          <label id="titles" for="name" style="margin-bottom: 5px;"><strong>PRINCIPIANTE</strong></label>
          <p style="text-align: justify; font-size: 20px;">Elige el nivel <strong>Principiante</strong> si apenas estás empezando con el idioma. Puede que no hables una sola palabra, o que sepas algunas cosas básicas. Si estás familiarizado con el <strong>Marco Común Europeo de Referencia para las Lenguas</strong>, esto equivale a los <strong>niveles A1 y A2</strong>.</p>
        </div>

        <div class="form-group" style="text-align: left; font-size: 20px; margin-bottom: 25px;">
          <label id="titles" for="name" style="margin-bottom: 5px;"><strong>INTERMEDIO</strong></label>
          <p style="text-align: justify; font-size: 20px;">Elige el nivel <strong>Intermedio</strong> si hablas el idioma con una <strong>confianza básica</strong>. Puedes hacer planes con otros, hablar sobre tus viajes y describir una película. Si estás familiarizado con el <strong>Marco Común Europeo de Referencia para las Lenguas</strong>, esto equivale al <strong>nivel B1</strong>.</p>
        </div>

        <div class="form-group" style="text-align: left; font-size: 20px;">
          <label id="titles" for="name" style="margin-bottom: 5px;"><strong>AVANZADO</strong></label>
          <p style="text-align: justify; font-size: 20px;">Elige el nivel Avanzado si te sientes <strong>muy seguro hablando el idioma</strong>. Puedes tener conversaciones fluidas con hablantes nativos y utilizar el idioma efectivamente para trabajar y estudiar. Si estás familiarizado con el <strong>Marco Común Europeo de Referencia para las Lenguas</strong>, esto equivale al <strong>nivel B2 y superiores</strong>.</p>
        </div>
      `,
      showCloseButton: true,
      allowEnterKey: false,
      closeButtonHtml:
        '<i class="fa-regular fa-circle-xmark" style="color: #ffffff; font-size: 25px;"></i>',
      color: '#ffffff',
      background: '#2b6a78',
      width: '40em',
      showConfirmButton: false,
    });
  }

  openModal(): void {
    this.registerForm.get('interest').markAsTouched();
    this.interestListName = [];
    this.modalRef = this.modalService.open(InterestModalComponent, {
      centered: true,
    });
    this.subscription = this.modalRef.dismissed.subscribe(() => {
      this.interestList =
        this.modalRef.componentInstance.interesesSeleccionados;
      if (this.interestList.length > 0) {
        this.modalRef.componentInstance.interesesPrecargados =
          this.interestListName;
        this.registerForm.get('interest').setErrors(null);
        for (let interest of this.interestList) {
          this.interestListName.push(interest.name);
        }
        this.registerForm.get('interest').setValue(this.interestListName);
      } else {
        this.registerForm.get('interest').setErrors({ required: true });
        this.registerForm.get('interest').setValue(this.interestListName);
      }
    });
  }

  onFileSelected($event: any): void {
    try {
      this.file = <File>$event.target.files[0];
      this.imgRef = ref(this.storage, `images/${this.file.name}`);
      if (this.file.size > this.validatorSize.imageWeight) {
        this.registerForm.get('urlPhoto').setErrors({ invalidSize: true });
      } else {
        this.registerForm.get('urlPhoto').setErrors(null);
      }
      if (!this.validateFormat(this.file.name)) {
        this.registerForm.get('urlPhoto').setErrors({ formato: true });
      }
    } catch {
      this.alertService.errorAlertTimer(
        this.common_register.register_step_2.error.must_photo,
        3000
      );
    }
  }

  registrarUsuario(): void {
    this.unabledRegister = true;
    if (this.file != undefined) {
      uploadBytes(this.imgRef, this.file)
        .then(async () => {
          this.urlPhoto = await getDownloadURL(this.imgRef);
          const NewUser2: newUser2 = {
            country: this.registerForm.get('country').value,
            nativeLanguage: this.registerForm.get('nativeLanguage').value,
            urlPhoto: this.urlPhoto,
            descriptionUser: this.registerForm.get('descriptionUser').value,
            learnLanguage: this.registerForm.get('learnLanguage').value,
            languageLevel: this.registerForm.get('languageLevel').value,
            interest: this.registerForm.get('interest').value,
          };

          this.sendData2.emit(NewUser2);
        })
        .catch((error) => console.log(error));
    }
  }

  validateFormat(fileName: string): boolean {
    const extensionesPermitidas = this.validatorPattern.imageType;
    return extensionesPermitidas.test(fileName);
  }

  back(): void {
    sessionStorage.setItem('country', this.registerForm.get('country').value);
    sessionStorage.setItem(
      'nativeLanguage',
      this.registerForm.get('nativeLanguage').value
    );
    sessionStorage.setItem(
      'descriptionUser',
      this.registerForm.get('descriptionUser').value
    );
    sessionStorage.setItem(
      'learnLanguage',
      this.registerForm.get('learnLanguage').value
    );
    sessionStorage.setItem(
      'languageLevel',
      this.registerForm.get('languageLevel').value
    );
    sessionStorage.setItem('interest', JSON.stringify(this.interestList));
    sessionStorage.setItem('interest', this.registerForm.get('interest').value);
    this.backStep1.emit(false);
  }

  redirectTerms(): void {
    window.open(this.routes_path.terms_path, '_blank');
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }
}
