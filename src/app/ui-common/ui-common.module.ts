import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from './blog-card/blog-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BlogCardComponent],
  exports: [BlogCardComponent]
})
export class UiCommonModule { }
