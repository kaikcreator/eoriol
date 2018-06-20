import prettify from "@prettify/prettify";
import { Component, OnInit, Inject, PLATFORM_ID, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { WordpressService } from '../../services/wordpress.service';
import { PostModel } from '../../models/post.model';
import { isPlatformBrowser } from '@angular/common';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { CommentModel } from "../../models/comment.model";
import { AddCommentComponent } from "../add-comment/add-comment.component";
import { Meta } from "@angular/platform-browser";
import { AlertComponentType } from "../../ui-common/alert/alert.component";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  @ViewChild('commentForm') commentForm: AddCommentComponent;
  public content:string = null;
  public title:string = null;
  public featuredImage:string = null;
  public post:PostModel = null;
  public comments:CommentModel[] = [];
  public commentSubmissionFeedack:{type:AlertComponentType, title:string, message:string} = null;

  constructor(
    private route: ActivatedRoute,
    private wordpressService: WordpressService,
    private element: ElementRef,
    private scrollTo:ScrollToService,
    private meta:Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  ngOnInit() {
    //request content based on route slug param
    this.route.paramMap.pipe(
      //switch map will cancel http request if there's a change in the meantime
      switchMap((params: ParamMap) => {
        let slug = params.get('slug');
        let extensionPos = slug.lastIndexOf('.html');
        if(extensionPos > 0){
          slug = slug.slice(0, extensionPos);
        }
        //every time the route change, clear content and scroll top
        this.post = null;
        this.scrollTop();
        
        return this.wordpressService.retrievePostBySlug(slug);
      })
    )
    .subscribe(post => {
      if(post){
        this.post = post;
        //add meta data
        for (let key in this.post.meta){
          if(key.indexOf('og:') == 0 || key.indexOf('twitter') == 0 ){
            this.meta.updateTag({property:key, content:this.post.meta[key]});
          }
          else{
            this.meta.updateTag({name:key, content:this.post.meta[key]});
          }
        }
        if(isPlatformBrowser(this.platformId)){
          this.scrollTop();
          setTimeout(()=>{prettify.prettyPrint()});
          this.wordpressService.retrievePostComments(this.post.id)
          .subscribe(comments => {
            this.comments = comments;
          })
        }
      }
    }, err=> console.log("error: ", err));    
  }

  ngOnDestroy(){
    //remove meta data associated with this specific route
    for (let key in this.post.meta){
      let metakey = `name="${key}"`;
      try{
        this.meta.removeTag(metakey);
      }catch(err){
        console.log(err);
      }
    }
  }

  postComment(comment:CommentModel){

    this.wordpressService.postNewComment(this.post.id, comment).subscribe(
      data => {
      this.commentForm.clearForm();
      this.commentSubmissionFeedack = {
        type: AlertComponentType.SUCCESS,
        title: "Success",
        message: "Your message has been successfully uploaded. It might take some time until it becomes publised"
      }
      setTimeout(()=>{this.commentSubmissionFeedack = null}, 3500);
      },
      error => {
        console.log(error);
        this.commentForm.cancelSubmit();
        this.commentSubmissionFeedack = {
          type: AlertComponentType.ERROR,
          title: "Error",
          message: "Oooops! Some error happened. Your comment cannot be uploaded :("
        }
        setTimeout(()=>{this.commentSubmissionFeedack = null}, 3500);        
      }
    )
  }

  private scrollTop(){
    if(isPlatformBrowser(this.platformId)){
      this.scrollTo.scrollTo({
        offset:this.element.nativeElement.getBoundingClientRect().top,
        duration: 0
      });
    }
  }

}
