import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InteresesModalComponent } from './register-components/register-user-step-2/intereses-modal/intereses-modal.component';
import { RegistrarUsuario1Component } from './register-components/register-user-step-1/registrar-usuario1.component';
import { RegistrarUsuario2Component } from './register-components/register-user-step-2/registrar-usuario2.component';
import { RegistroPadreComponent } from './register-components/registro-padre.component';
import { TerminosComponent } from './register-components/terms-and-conditions/terminos.component';

@NgModule({
  declarations: [
    InteresesModalComponent,
    RegistrarUsuario1Component,
    RegistrarUsuario2Component,
    RegistroPadreComponent,
    TerminosComponent,
  ],
  imports: [CommonModule, BrowserModule, HttpClientModule, ReactiveFormsModule],
  exports: [InteresesModalComponent],
})
export class RegistroModule {}
