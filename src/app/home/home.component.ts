import { Component, OnInit, HostListener, PLATFORM_ID, Inject, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { BookCoursesService } from '../services/book-courses.service';
import { BookCourseModel } from '../models/book-course.model';
import { BlogPostsService } from '../services/blog-posts.service';
import { isPlatformBrowser } from '@angular/common';
import { WindowScrollService } from '../services/window-scroll.service';
import { Subscription } from 'rxjs/Subscription';
import { auditTime } from 'rxjs/operators';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { BookCardComponent } from '../book-card/book-card.component';
import { WindowRefService, DocumentRefService } from '../services/globals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChildren(BookCardComponent, {read: ElementRef}) bookCardElements: QueryList<ElementRef>;

  public bookCourseItems:BookCourseModel[];
  public bookCoursesLimit:number = 3;
  public blogPostItems:any[];
  public scrollOffsetMap:Map<number, number>;
  public subscribeCTAWhite:boolean = true;
  public scrollSubscription:Subscription = null;

  constructor(
    public bookCourses: BookCoursesService,
    public blogPosts: BlogPostsService,
    private windowScroll: WindowScrollService,
    private scrollTo: ScrollToService,
    private winRef: WindowRefService,
    private docRef: DocumentRefService,
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

    /** Scroll event listener, in order to modify subscribe CTA behavior based on scroll */
    this.scrollSubscription = this.windowScroll.scroll$.subscribe((scroll)=>{
      if(scroll > 225){
        if(this.subscribeCTAWhite)
          this.subscribeCTAWhite = false;
      }
      else{
        if(!this.subscribeCTAWhite)
          this.subscribeCTAWhite = true;
      }
    })
  }

  ngOnDestroy(){
    if(this.scrollSubscription)
      this.scrollSubscription.unsubscribe();
  }

  onBookCourseCardExpand(expands:boolean, index){

    let expandedElement = this.bookCardElements.find((el, position)=>{
      return position == index; 
    });

    let offset = 0;

    let windowsWidth = this.docRef.nativeDocument.body.clientWidth || this.docRef.nativeDocument.documentElement.clientWidth || this.winRef.nativeWindow.innerWidth;

    if(windowsWidth >= 600){
      offset = -100;
    }
    else{
      offset = expands ? 350 : -60;
    }

    setTimeout(()=>{
      this.scrollTo.scrollTo({offset:expandedElement.nativeElement.getBoundingClientRect().top + offset});
    }, 300);
  }

}
