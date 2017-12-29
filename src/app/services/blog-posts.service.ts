import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BlogPostsService {

  constructor(private http:HttpClient) { }

  getItems():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/blog-posts?_limit=3');
  }

}
