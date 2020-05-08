import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookCourseModel } from '../models/book-course.model';
import { environment } from '../../environments/environment';

@Injectable()
export class BookCoursesService{

  constructor(private http: HttpClient) { 
  }

  getItems():Observable<BookCourseModel[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/book-courses-${environment.coursesJsonVersion}.json`);
  }

}
