import { Injectable } from '@angular/core'; 
import { map, flatMap } from 'rxjs/operators';
import { PostModel } from '../models/post.model';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class WordpressService {

  constructor(private http: HttpClient) { }

  retrieveLatestPosts(n:number){
    return this.http.get<any[]>("http://blog.enriqueoriol.com/wp-json/wp/v2/posts?_embed&per_page="+n)
      .pipe(
        map(data => {
          console.log(data);
          return data.map(item => {
            console.log(item);
            return <PostModel>{
              date: item.date,
              title: item.title.rendered,
              link: item.link,
              image: item._embedded['wp:featuredmedia'][0].source_url
            }})
        })
      );
  }

}
