import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

@Injectable()
export class BlogPostsService {

  constructor(private http:HttpClient) { }

  getItems():Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/blog-posts.json`);
  }

}
