import { CommonModule, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SeguirModalComponent } from './seguir-modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from 'src/app/shared/shared-components/spinner-general-loading/spinner.module';

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
