import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { BookCoursesService } from '../services/book-courses.service';
import { BookCourseModel } from '../models/book-course.model';
import { BlogPostsService } from '../services/blog-posts.service';
import { WindowRefService, DocumentRefService } from '../services/globals.service';
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
    private documentRef: DocumentRefService,
    @Inject(PLATFORM_ID) private platformId: Object,
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
    })
  }

  /** Scroll event listener, in order to modify subscribe CTA behavior based on scroll */
  @HostListener("window:scroll", [''])
  onWindowScroll() {
    let currentScroll = this.winRef.nativeWindow.scrollY || this.documentRef.nativeDocument.documentElement.scrollTop;
    if(currentScroll > 225){
      if(this.subscribeCTAWhite)
        this.subscribeCTAWhite = false;
    }
    else{
      if(!this.subscribeCTAWhite)
        this.subscribeCTAWhite = true;
    }
  }

}
