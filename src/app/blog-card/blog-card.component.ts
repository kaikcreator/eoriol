import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-card',
  host: {'class': 'card'},
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

  @Input() item:any;
  
  constructor() { }

  ngOnInit() {
  }

}
