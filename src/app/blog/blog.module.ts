import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UiCommonModule } from '../ui-common/ui-common.module';


@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    UiCommonModule
  ],
  declarations: [PostsListComponent, PostDetailComponent]
})
export class BlogModule { }
