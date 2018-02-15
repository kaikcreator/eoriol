import { Injectable } from '@angular/core'; 
import { map, flatMap } from 'rxjs/operators';
import { PostModel } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { WpPost } from '../models/wp/wp-post.model';
import { environment } from '../../environments/environment';


@Injectable()
export class WordpressService {

  constructor(private http: HttpClient) { }

  retrieveLatestPosts(n:number){
    return this.http.get<any[]>(`${environment.wordpressUrl}/posts?_embed&per_page=${n}`)
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
