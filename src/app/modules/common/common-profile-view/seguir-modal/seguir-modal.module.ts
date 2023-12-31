import { CommonModule, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SeguirModalComponent } from './seguir-modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerModule } from 'src/app/shared/spinner-general-loading/spinner.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SeguirModalComponent],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModalModule,
    SpinnerModule,
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [SeguirModalComponent],
})
export class SeguirModalModule {}
