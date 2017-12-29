import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BookCourseModel } from '../models/book-course.model';

@Injectable()
export class BookCoursesService{

  constructor(private http: HttpClient) { 
  }

  getItems():Observable<BookCourseModel[]>{
    return this.http.get<any[]>('http://localhost:3000/book-courses');
  }

}
