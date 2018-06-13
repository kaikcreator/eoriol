import prettify from "../../../libs/code-prettify-mod/src/prettify";
import { Component, OnInit, Inject, PLATFORM_ID, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { map, switchMap } from 'rxjs/operators';
import { WordpressService } from '../../services/wordpress.service';
import { PostModel } from '../../models/post.model';
import { isPlatformBrowser } from '@angular/common';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { CommentModel } from "../../models/comment.model";
import { AddCommentComponent } from "../add-comment/add-comment.component";
import { Meta } from "@angular/platform-browser";

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

  constructor(
    private route: ActivatedRoute,
    private wordpressService: WordpressService,
    private element: ElementRef,
    private scrollTo:ScrollToService,
    private meta:Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  ngOnInit() {
    //scroll top
    if(isPlatformBrowser(this.platformId)){
      this.scrollTo.scrollTo({
        offset:this.element.nativeElement.getBoundingClientRect().top,
        duration: 0
      });
    }
    
    this.route.paramMap.pipe(
      //switch map will cancel http request if there's a change in the meantime
      switchMap((params: ParamMap) => {
        let slug = params.get('slug');
        let extensionPos = slug.lastIndexOf('.html');
        if(extensionPos > 0){
          slug = slug.slice(0, extensionPos);
        }
        return this.wordpressService.retrievePostBySlug(slug);
      })
    )
    .subscribe(post => {
      if(post){
        this.post = post;
        //add meta data
        for (let key in this.post.meta){
          this.meta.updateTag({name:key, content:this.post.meta[key]});
        }
        setTimeout(()=>prettify.prettyPrint());
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
    //in case of success
      //this.commentForm.clearForm();

    //in case of error
      //this.commentForm.cancelSubmit();
  }

}
