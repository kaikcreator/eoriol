import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { BlogRoutingModule } from './blog-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UiCommonModule } from '../ui-common/ui-common.module';
import { CommentComponent } from './comment/comment.component';


@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    BlogRoutingModule,
    UiCommonModule
  ],
  declarations: [PostsListComponent, PostDetailComponent, CommentComponent]
})
export class BlogModule { }
