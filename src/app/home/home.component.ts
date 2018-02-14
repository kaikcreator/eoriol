import { Component, OnInit, HostListener } from '@angular/core';
import { BookCoursesService } from '../services/book-courses.service';
import { BookCourseModel } from '../models/book-course.model';
import { BlogPostsService } from '../services/blog-posts.service';
import { WindowRefService } from '../services/window-ref.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public bookCourseItems:BookCourseModel[];
  public blogPostItems:any[];
  public scrollOffsetMap:Map<number, number>;
  public subscribeCTAWhite:boolean = true;

  constructor(
    public bookCourses: BookCoursesService,
    public blogPosts: BlogPostsService,
    private winRef: WindowRefService
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

    this.blogPosts.getItems().subscribe(list => {
      this.blogPostItems = list;
    })
  }

  @HostListener("window:scroll", [''])
  onWindowScroll() {
    if(this.winRef.nativeWindow.scrollY > 225){
      if(this.subscribeCTAWhite)
        this.subscribeCTAWhite = false;
    }
    else{
      if(!this.subscribeCTAWhite)
        this.subscribeCTAWhite = true;
    }
  }

}
