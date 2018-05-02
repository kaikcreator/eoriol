import { Component, OnInit, Input } from '@angular/core';
import { BookCourseModel } from '../models/book-course.model';
import { trigger, transition, state, animate, style } from '@angular/animations';

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
        animate('300ms ease-in', style({
          'width': '*',
          'height': '*'
        }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({
          'width': '0',
          'height': '0'
        }))
      ])      
    ])
  ]
})
export class BookCardComponent implements OnInit {

  @Input() item: BookCourseModel;
  constructor() { }

  ngOnInit() {
  }

}
