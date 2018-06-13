import { Component, OnInit, HostListener, PLATFORM_ID, Inject, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { BookCoursesService } from '../services/book-courses.service';
import { BookCourseModel } from '../models/book-course.model';
import { BlogPostsService } from '../services/blog-posts.service';
import { WindowScrollService } from '../services/window-scroll.service';
import { Subscription } from 'rxjs';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { BookCardComponent } from '../book-card/book-card.component';
import { WindowRefService, DocumentRefService } from '../services/globals.service';
import { Meta } from '@angular/platform-browser';

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
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { 
    this.scrollOffsetMap = new Map();
    this.scrollOffsetMap.set(600, 30);
    this.scrollOffsetMap.set(780, 90);
    this.scrollOffsetMap.set(1060, 120);
  }

  ngOnInit() {
    //add meta tags
    this.meta.updateTag({name:'description', content:'Tutoriales, guias, blogs y cursos de Angular, Ionic, TypeScript, JavaScript y programacion frontend'});
    this.meta.updateTag({name:'keywords', content:'Enrique Oriol, Angular, Ionic, Cursos, Tutoriales, Desarrollo, Javascript, Frontend, Programacion, Desarrollo web, Aprender a programar, Aprender Javascript, HTML5, CSS, TypeScript, SaSS, Node'});
    
    //get courses
    this.bookCourses.getItems().subscribe(list =>{
      this.bookCourseItems = list;
    });

    //get blog posts
    this.blogPosts.getLastItems(3).subscribe(list => {
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
