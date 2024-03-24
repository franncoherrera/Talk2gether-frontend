import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterestModalComponent } from './interest-modal.component';

@NgModule({
  declarations: [InterestModalComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [InterestModalComponent]
})
export class InterestModule {}
