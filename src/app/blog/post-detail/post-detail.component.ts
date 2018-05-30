import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { map, switchMap } from 'rxjs/operators';
import { WordpressService } from '../../services/wordpress.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  public content:string = null;
  public title:string = null;

  constructor(
    private route: ActivatedRoute,
    private wordpressService: WordpressService  
  ) { }

  ngOnInit() {
    
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
      console.log(post);
      if(post){
        this.content = post.content;
        this.title = post.title;
      }
    }, err=> console.log("error: ", err));    
  }

}
