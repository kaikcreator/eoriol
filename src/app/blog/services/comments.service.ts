import { Injectable } from '@angular/core';
import { WordpressService } from '../../services/wordpress.service';
import { CommentModel } from '../../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private wordpressService:WordpressService) { }

  //retrieve comments from a specific post
  public getCommentsFromPostId(postId){
    return this.wordpressService.retrievePostComments(postId);
  }

  //get total count of comments (including replies)
  public getTotalCountComments(comments:CommentModel[]){
    let count = comments.length;
    comments.forEach(comment => { 
      if(comment.replies){
        count += this.getTotalCountComments(comment.replies);
      }
    });
    return count;
  }

  //create new comments
  public createComment(postId, comment){
    return this.wordpressService.postNewComment(postId, comment);
  }


}
