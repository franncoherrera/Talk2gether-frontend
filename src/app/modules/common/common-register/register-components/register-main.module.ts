import { NgModule } from '@angular/core';
import { RegisterMainComponent } from './register-main.component';
import { RegisterUserStep1Module } from './register-user-step-1/register-user-step-1.module';
import { RegisterUserStep2Module } from './register-user-step-2/register-user-step-2.module';
import { TermAndConditionModule } from './term-and-conditions/term-and-condition.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RegisterMainComponent],
  imports: [
    CommonModule,
    RegisterUserStep1Module,
    RegisterUserStep2Module,
    TermAndConditionModule,
  ],
})
export class RegisterMainModule {}
