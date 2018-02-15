import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { WordpressService } from './wordpress.service';

@Injectable()
export class BlogPostsService {

  constructor(private wordpress:WordpressService) { }

  getItems(n:number):Observable<any[]>{
    return this.wordpress.retrieveLatestPosts(n);
  }

}
