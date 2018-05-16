import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [BlogCardComponent, SpinnerComponent, SearchBoxComponent],
  exports: [BlogCardComponent, SpinnerComponent, SearchBoxComponent]
})
export class UiCommonModule { }
