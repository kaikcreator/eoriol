import { Injectable } from '@angular/core'; 
import { map, flatMap } from 'rxjs/operators';
import { PostModel } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { WpPost } from '../models/wp/wp-post.model';
import { environment } from '../../environments/environment';
import { ContactModel } from '../models/contact.model';


@Injectable()
export class WordpressService {

  constructor(private http: HttpClient) { }

  retrievePosts(offset:number, per_page:number, search:string){
    return this.http.get<any[]>(`${environment.wordpressUrl}/posts?_embed&per_page=${per_page}&offset=${offset}&search=${search}`)
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

  contact(data:ContactModel){
    var formData = new FormData();
    formData.append('contact', data.name);
    formData.append('email', data.email);
    formData.append('topic', data.topic);
    formData.append('message', data.message);

    return this.http.post<any>(environment.contactUrl, formData).pipe(
      map(data => {
        if(data.status == 'mail_sent'){
          return data.message;
        }
        else{
          throw new Error(data.message);
        }
      })
    );
  }

}
