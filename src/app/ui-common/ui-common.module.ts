import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BlogCardComponent, SpinnerComponent],
  exports: [BlogCardComponent, SpinnerComponent]
})
export class UiCommonModule { }
