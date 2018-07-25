import prettify from "@prettify/prettify";
import { Component, OnInit, Inject, PLATFORM_ID, ElementRef, ViewChild, OnDestroy, Renderer2 } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { PostModel } from '../../models/post.model';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { CommentModel } from "../../models/comment.model";
import { AddCommentComponent } from "../add-comment/add-comment.component";
import { Meta, DomSanitizer, SafeHtml, Title } from "@angular/platform-browser";
import { AlertComponentType } from "../../ui-common/alert/alert.component";
import { BlogPostsService } from "../../services/blog-posts.service";
import { CommentsService } from "../services/comments.service";
import { StickyBelowViewDirective } from "app/ui-common/directives/sticky-below-view.directive";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  @ViewChild('commentForm') commentForm: AddCommentComponent;
  @ViewChild('replyForm') replyForm: AddCommentComponent;
  @ViewChild('replyForm', {read:ElementRef}) replyFormEl: ElementRef;
  @ViewChild(StickyBelowViewDirective) shareBar: StickyBelowViewDirective;
  
  private sanitizedHtml:SafeHtml = null;
  public jsonLdSchema:{};
  public currentUrl:string = "";
  public post:PostModel = null;
  public comments:CommentModel[] = [];
  public numComments:number = 0;
  public commentSubmissionFeedack:{type:AlertComponentType, title:string, message:string} = null;
  public isReplyFormVisible:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private element: ElementRef,
    private scrollTo:ScrollToService,
    private meta:Meta,
    private renderer:Renderer2,
    public sanitizer: DomSanitizer,
    private titleService: Title,
    private blogPostsService: BlogPostsService,
    private commentsService: CommentsService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document
  ) { }


  ngOnInit() {

    this.currentUrl = this.document.location.href;
    
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
        
        return this.blogPostsService.getItemBySlug(slug);
      })
    )
    .subscribe(post => {
      if(post){
        this.post = post;
        //update title
        this.titleService.setTitle(this.post.title);
        //add meta data
        for (let key in this.post.meta){
          if(key.indexOf('og:') == 0){
            this.meta.updateTag({property:key, content:this.post.meta[key]});
          }
          else{
            this.meta.updateTag({name:key, content:this.post.meta[key]});
          }
        }
        //add json-ld-schema (for google)
        this.jsonLdSchema = {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          'headline': this.post.title,
          'image': [ this.post.meta['og:image'] ]
        };

        //sanitize HTML
        this.sanitizeHtml();
        //only in browser side
        if(isPlatformBrowser(this.platformId)){
          this.scrollTop();
          //pretty print code fragments
          setTimeout(()=>{prettify.prettyPrint()});
          //get comments
          this.commentsService.getCommentsFromPostId(this.post.id)
          .subscribe(comments => {
            this.comments = comments;
            this.numComments = this.commentsService.getTotalCountComments(this.comments);
          });
          //once view is completely rendered, allow shareBar to be sticky
          setTimeout(()=>{this.shareBar.initStickyElement();}, 3000);
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

  addComment(comment:CommentModel){

    this.commentsService.createComment(this.post.id, comment).subscribe(
      data => {
      if(comment.parent){
        this.replyForm.clearForm();
        this.isReplyFormVisible = false;
      }
      else{
        this.commentForm.clearForm();
      }
      this.commentSubmissionFeedack = {
        type: AlertComponentType.SUCCESS,
        title: "Success",
        message: "Your message has been successfully uploaded. It might take some time until it becomes publised"
      }
      setTimeout(()=>{this.commentSubmissionFeedack = null}, 3500);
      },
      error => {
        console.log(error);
        if(comment.parent){
          this.replyForm.cancelSubmit();
        }
        else{
          this.commentForm.cancelSubmit();
        }
        this.commentSubmissionFeedack = {
          type: AlertComponentType.ERROR,
          title: "Error",
          message: "Oooops! Some error happened. Your comment cannot be uploaded :("
        }
        setTimeout(()=>{this.commentSubmissionFeedack = null}, 3500);        
      }
    )
  }

  showReplyBox(event){
    this.isReplyFormVisible = true;
    this.replyForm.clearForm();
    this.renderer.appendChild(event.element.nativeElement, this.replyFormEl.nativeElement);
    this.replyForm.setParent(event.id);
  }

  private scrollTop(){
    if(isPlatformBrowser(this.platformId)){
      this.scrollTo.scrollTo({
        offset:this.element.nativeElement.getBoundingClientRect().top,
        duration: 0
      });
    }
  }

  private sanitizeHtml(){
    if(this.post.content){
      this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(this.post.content);
    }
  }

}
