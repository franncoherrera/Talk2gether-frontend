import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarUsuario2Component } from './registrar-usuario2.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [RegistrarUsuario2Component],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [RegistrarUsuario2Component]
})
export class RegisterUserStep2Module { }
