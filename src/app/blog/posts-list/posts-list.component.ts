import { Component, OnInit } from '@angular/core';
import { BlogPostsService } from '../../services/blog-posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  public postsList:any[];

  constructor( public blogPosts: BlogPostsService) { }

  ngOnInit() {
    this.blogPosts.getItems(10).subscribe(items => this.postsList = items);
  }

}
