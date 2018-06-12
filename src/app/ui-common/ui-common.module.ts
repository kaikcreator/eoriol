import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [BlogCardComponent, SpinnerComponent, SearchBoxComponent, AvatarComponent],
  exports: [BlogCardComponent, SpinnerComponent, SearchBoxComponent, AvatarComponent]
})
export class UiCommonModule { }
