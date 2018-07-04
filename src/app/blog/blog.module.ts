import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { BlogRoutingModule } from './blog-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UiCommonModule } from '../ui-common/ui-common.module';
import { CommentComponent } from './comment/comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { SharePostBarComponent } from './share-post-bar/share-post-bar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
    BlogRoutingModule,
    UiCommonModule
  ],
  declarations: [PostsListComponent, PostDetailComponent, CommentComponent, AddCommentComponent, SharePostBarComponent]
})
export class BlogModule { }
