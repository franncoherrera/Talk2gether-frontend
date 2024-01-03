import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NuevaContraseniaComponent } from './chage-password-components/nueva-contrasenia/nueva-contrasenia.component';
import { ConfirmarContraseniaComponent } from './chage-password-components/confirmar-contrasenia/confirmar-contrasenia.component';



@NgModule({
  declarations: [
    NuevaContraseniaComponent,
    ConfirmarContraseniaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CambioContraseniaModule { }
