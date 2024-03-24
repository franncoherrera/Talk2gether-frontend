import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InterestModalComponent } from '../../../../../shared/shared-components/interest-modal/interest-modal.component';
import { RegisterUserStep2Component } from './register-user-step-2.component';

@NgModule({
  declarations: [RegisterUserStep2Component],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [RegisterUserStep2Component],
})
export class RegisterUserStep2Module {}
