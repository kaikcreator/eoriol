import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-rating',
  templateUrl: './review-rating.component.html',
  styleUrls: ['./review-rating.component.scss']
})
export class ReviewRatingComponent implements OnInit {

  constructor() { }

  @Input() rating = 5;
  public nStars:number[];

  ngOnInit(){
    this.rating = Number(this.rating);
    this.nStars = Array.from(Array(this.rating).keys());
  }

}
