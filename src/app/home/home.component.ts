import { Component, OnInit } from '@angular/core';
import { BookCoursesService } from '../services/book-courses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( public bookCourses: BookCoursesService) { }

  ngOnInit() {
    console.log("book courses: ", this.bookCourses.items);
  }

}
