import { Component, OnInit } from '@angular/core';
import { BookCoursesService } from '../services/book-courses.service';
import { BookCourseModel } from '../models/book-course.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public bookCourseItems:BookCourseModel[];
  constructor( public bookCourses: BookCoursesService) { }

  ngOnInit() {
    this.bookCourses.getItems().subscribe(list =>{
      this.bookCourseItems = list;
    })
  }

}
