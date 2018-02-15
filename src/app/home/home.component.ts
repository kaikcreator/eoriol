import { Component, OnInit } from '@angular/core';
import { BookCoursesService } from '../services/book-courses.service';
import { BookCourseModel } from '../models/book-course.model';
import { BlogPostsService } from '../services/blog-posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public bookCourseItems:BookCourseModel[];
  public blogPostItems:any[];
  public scrollOffsetMap:Map<number, number>;

  constructor(
    public bookCourses: BookCoursesService,
    public blogPosts: BlogPostsService
  ) { 
    this.scrollOffsetMap = new Map();
    this.scrollOffsetMap.set(600, 30);
    this.scrollOffsetMap.set(780, 90);
    this.scrollOffsetMap.set(1060, 120);
  }

  ngOnInit() {
    this.bookCourses.getItems().subscribe(list =>{
      this.bookCourseItems = list;
    });

    this.blogPosts.getItems(3).subscribe(list => {
      this.blogPostItems = list;
      console.log(this.blogPostItems);
    })
  }

}
