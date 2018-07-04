import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../../models/post.model';

@Component({
  selector: 'app-blog-card',
  host: {'class': 'card card-content'},
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

  @Input() item:PostModel;
  
  constructor() { 
  }

  ngOnInit() {
    
  }

}
