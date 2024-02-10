import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';
import { NuevaContraseniaComponent } from './nueva-contrasenia.component';

@NgModule({
  declarations: [NuevaContraseniaComponent],
  imports: [
    CommonModule, ReactiveFormsModule
  ]
})
export class ChangePasswordNewPasswordModule { }
