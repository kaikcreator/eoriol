import { Injectable } from '@angular/core'; 
import { map, flatMap } from 'rxjs/operators';
import { PostModel } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { WpPost } from '../models/wp/wp-post.model';


@Injectable()
export class WordpressService {

  constructor(private http: HttpClient) { }

  retrieveLatestPosts(n:number){
    return this.http.get<any[]>("http://blog.enriqueoriol.com/wp-json/wp/v2/posts?_embed&per_page="+n)
      .pipe(
        map(data => {
          /* this must be an array of posts*/
          return data.map(item => {
            let wpItem = new WpPost(item);

            return <PostModel>{
              date: wpItem.date(),
              title: wpItem.title(),
              link: wpItem.link(),
              image: wpItem.featuredImage()
            }})
        })
      );
  }

}
