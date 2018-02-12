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

  constructor(
    public bookCourses: BookCoursesService,
    public blogPosts: BlogPostsService
  ) { }

  ngOnInit() {
    this.bookCourses.getItems().subscribe(list =>{
      this.bookCourseItems = list;
    });

    this.blogPosts.getItems().subscribe(list => {
      this.blogPostItems = list;
      console.log(this.blogPostItems);
    })
  }

}
