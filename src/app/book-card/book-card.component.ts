import { Component, OnInit, Input } from '@angular/core';
import { BookCourseModel } from '../models/book-course.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input() item: BookCourseModel;
  constructor() { }

  ngOnInit() {
  }

}
