import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from './avatar/avatar.component';
import { AlertComponent } from './alert/alert.component';
import { RouterModule } from '@angular/router';
import { StickyBelowViewDirective } from './directives/sticky-below-view.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [BlogCardComponent, SpinnerComponent, SearchBoxComponent, AvatarComponent, AlertComponent, StickyBelowViewDirective],
  exports: [BlogCardComponent, SpinnerComponent, SearchBoxComponent, AvatarComponent, AlertComponent, StickyBelowViewDirective]
})
export class UiCommonModule { }
