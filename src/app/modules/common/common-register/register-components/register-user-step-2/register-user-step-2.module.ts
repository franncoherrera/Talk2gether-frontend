import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarUsuario2Component } from './register-user-step-2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InterestModalComponent } from '../../../../../shared/shared-components/interest-modal/intereses-modal.component';

@NgModule({
  declarations: [RegistrarUsuario2Component, InterestModalComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [RegistrarUsuario2Component, InterestModalComponent],
})
export class RegisterUserStep2Module {}
