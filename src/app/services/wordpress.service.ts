import { Injectable } from '@angular/core'; 
import { map } from 'rxjs/operators';
import { PostModel } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { WpPost } from '../models/wp/wp-post.model';
import { environment } from '../../environments/environment';
import { ContactModel } from '../models/contact.model';
import { WpMedia } from '../models/wp/wp-media.interface';
import { WpPostOverview } from '../models/wp/wp-post-overview.model';
import { Observable } from 'rxjs';
import { IPostOverview } from '../models/wp/post-overview.interface';
import { IComment } from '../models/wp/comment.interface';
import { CommentModel } from '../models/comment.model';



@Injectable()
export class WordpressService {

  constructor(private http: HttpClient) { }

  retrievePostsOverview(offset:number, per_page:number, search:string){
    return this.http.get<any[]>(`${environment.wordpressCustomUrl}/posts?&per_page=${per_page}&offset=${offset}&search=${search}`)
      .pipe(
        map(data => {
          /* this must be an array of posts*/
          return data.map(item => {
            return this.wpPostOverviewToPostModelSerializer(item);
          });
        })
      );
  }  
  
  retrievePostBySlug(slug:string):Observable<PostModel>{
    return this.http.get<any>(`${environment.wordpressUrl}/posts?slug=${slug}`)
      .pipe(
        map(data => {
          /* this is an array including 1 single post (slugs are unitary)*/
          return data.map(item => {
            let wpItem = new WpPost(item);

            let post = <PostModel>{
              slug:slug,
              id: +wpItem.id(),
              link: wpItem.link(),              
              date: wpItem.date(),
              title: wpItem.title(),
              content: wpItem.content(),
              previous: this.wpPostOverviewToPostModelSerializer(wpItem.prev()),
              next: this.wpPostOverviewToPostModelSerializer(wpItem.next()),
              meta: wpItem.meta()
            };


            //if there's featuredMedia, retrieve it async and update the post model in the future
            if(wpItem.featuredMedia()){
              post.image = "in process";//set thumbnail
              this.retrieveMedia(wpItem.featuredMedia()).subscribe(media =>{
                wpItem.setMedia(media);
                post.image = wpItem.featuredImage('large');
              });
            }

            //but return the post object asap
            return post;
          })[0];//We want to return just a single post, not an array
        })
      );
  }

  retrievePostComments(postId){
    return this.http.get<IComment[]>(`${environment.wordpressUrl}/comments?post=${postId}`)
      .pipe(
        map(data =>{
          //serialize all comments based on CommentModel
          let comments = data.map(item =>{
            let comment = new CommentModel(
              item.author_name,
              item.content.rendered,
              item.date,
              item.id,
              item.parent
            );
            return comment;
          });
          
          //connect parent comments with their children
          for(let comment of comments){
            for(let parent of comments){
              if(comment.parent == 0)
                continue;
              if (comment.parent == parent.id){
                parent.replies.push(comment);
              }
            }
          }
          
          //return only top comments (children are inside their replies arrays)
          return comments.filter(item => item.parent == 0);
        })
      )
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


  private retrieveMedia(media:number|boolean){
    if(media){
      return this.http.get<WpMedia>(`${environment.wordpressUrl}/media/${media}`);
    }
  }

  private wpPostOverviewToPostModelSerializer(item:IPostOverview){
    if(!item)
      return null;

    let postOverview = new WpPostOverview(item);

    let post = <PostModel>{
      date: postOverview.date(),
      title: postOverview.title(),
      slug: postOverview.slug(),
      path: 'blog/' + postOverview.path(),
      link: postOverview.link(),
      image: postOverview.featuredMediaSrc()
    };

    return post;
  }  

}
