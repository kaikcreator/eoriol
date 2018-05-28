import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  public slug:string;

  constructor(
    private route: ActivatedRoute  
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      // switchMap((params: ParamMap) => {
      //   //here fetch the post content. switch map will cancel http request if there's a change
      //   //in the meantime
      // }),
      map((params: ParamMap) => {
        this.slug = params.get('slug');
        console.log("el slug es: ", this.slug);
      })
    ).subscribe();    
  }

}
