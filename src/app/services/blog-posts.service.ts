import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { WordpressService } from './wordpress.service';

@Injectable()
export class BlogPostsService {

  public search:string = '';
  
  constructor(private wordpress:WordpressService) { }

  getItems(itemsOffset:number=0, itemsAmount:number=18):Observable<any[]>{
    return this.wordpress.retrievePostsOverview(itemsOffset, itemsAmount, this.search);
  }

  getLastItems(n:number):Observable<any[]>{
    return this.wordpress.retrievePostsOverview(0, n, '');
  }

  getItemBySlug(slug){
    return this.wordpress.retrievePostBySlug(slug);
  }

  clearSearch(){
    this.search = '';
  }

}
