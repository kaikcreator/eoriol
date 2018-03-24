import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { BookCoursesService } from '../services/book-courses.service';
import { BookCourseModel } from '../models/book-course.model';
import { BlogPostsService } from '../services/blog-posts.service';
import { WindowRefService } from '../services/globals.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public bookCourseItems:BookCourseModel[];
  public bookCoursesLimit:number = 3;
  public blogPostItems:any[];
  public scrollOffsetMap:Map<number, number>;
  public subscribeCTAWhite:boolean = true;

  constructor(
    public bookCourses: BookCoursesService,
    public blogPosts: BlogPostsService,
    private winRef: WindowRefService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { 
    this.scrollOffsetMap = new Map();
    this.scrollOffsetMap.set(600, 30);
    this.scrollOffsetMap.set(780, 90);
    this.scrollOffsetMap.set(1060, 120);
  }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      this.bookCourses.getItems().subscribe(list =>{
        this.bookCourseItems = list;
      });
    }

    this.blogPosts.getItems(3).subscribe(list => {
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
