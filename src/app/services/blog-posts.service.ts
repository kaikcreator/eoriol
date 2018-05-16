import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { WordpressService } from './wordpress.service';

@Injectable()
export class BlogPostsService {

  constructor(private wordpress:WordpressService) { }

  getItems(itemsOffset:number=0, itemsAmount:number=18):Observable<any[]>{
    return this.wordpress.retrievePosts(itemsOffset, itemsAmount);
  }

  getLastItems(n:number):Observable<any[]>{
    return this.wordpress.retrieveLatestPosts(n);
  }  

}
