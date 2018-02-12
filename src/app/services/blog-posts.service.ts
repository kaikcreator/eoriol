import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { WordpressService } from './wordpress.service';

@Injectable()
export class BlogPostsService {

  constructor(private wordpress:WordpressService) { }

  getItems():Observable<any[]>{
    //return this.http.get<any[]>(`${environment.apiUrl}/blog-posts.json`);
    return this.wordpress.retrieveLatestPosts(3);
  }

}
