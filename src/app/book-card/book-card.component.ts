import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BookCourseModel } from '../models/book-course.model';
import { trigger, transition, state, animate, style } from '@angular/animations';

enum REWIEWS_BTN_STATE {
  shown = 'Hide reviews',
  hidden = 'See reviews'
}

@Component({
  selector: 'app-book-card',
  host: {'class': 'card expandable-card'},
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  animations:[
    trigger('animateReviews', [
      state('void', style({
        'width': '0',
        'height': '0'
      })),
      transition(':enter', [
        animate('200ms ease-in', style({
          'width': '*',
          'height': '*'
        }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({
          'width': '0',
          'height': '0'
        }))
      ])      
    ])
  ]
})
export class BookCardComponent implements OnInit {

  @Input() item: BookCourseModel;
  @Output() expand:EventEmitter<boolean> = new EventEmitter<boolean>();
  public showReviews:boolean = false;
  public reviewsBtnLabel = REWIEWS_BTN_STATE.hidden;
  constructor() { }

  ngOnInit() {
  }

  onReviewsBtnClick(){
    this.showReviews =! this.showReviews;
    this.reviewsBtnLabel = this.showReviews ?  REWIEWS_BTN_STATE.shown : REWIEWS_BTN_STATE.hidden;
    this.expand.emit(this.showReviews);
  }

}
