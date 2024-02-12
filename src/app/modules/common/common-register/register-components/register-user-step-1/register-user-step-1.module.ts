import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterUserStep1Component } from './register-user-step-1.component';



@NgModule({
  declarations: [RegisterUserStep1Component],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [RegisterUserStep1Component]
})
export class RegisterUserStep1Module { }
