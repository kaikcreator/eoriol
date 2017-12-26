import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Injectable()
export class BookCoursesService{

  public items:any[];
  constructor(private http: HttpClient) { 
    this.init();
  }

  init(){
    this.http.get('assets/book-courses.json').subscribe(list =>{
      this.items = <any[]>list;
    })
  }

}
