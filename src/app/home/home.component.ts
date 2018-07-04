import { Component, OnInit, PLATFORM_ID, Inject, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { BookCoursesService } from '../services/book-courses.service';
import { BookCourseModel } from '../models/book-course.model';
import { BlogPostsService } from '../services/blog-posts.service';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { BookCardComponent } from '../book-card/book-card.component';
import { WindowRefService } from '../services/globals.service';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChildren(BookCardComponent, {read: ElementRef}) bookCardElements: QueryList<ElementRef>;

  public bookCourseItems:BookCourseModel[];
  public bookCoursesLimit:number = 3;
  public blogPostItems:any[];
  public scrollOffsetMap:Map<number, number>;

  constructor(
    public bookCourses: BookCoursesService,
    public blogPosts: BlogPostsService,
    private scrollTo: ScrollToService,
    private winRef: WindowRefService,
    private meta: Meta,
    private titleService:Title,
    @Inject(DOCUMENT) private document:any,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { 
    this.scrollOffsetMap = new Map();
    this.scrollOffsetMap.set(600, 30);
    this.scrollOffsetMap.set(780, 90);
    this.scrollOffsetMap.set(1060, 120);
  }

  ngOnInit() {
    //update title
    this.titleService.setTitle("Enrique Oriol: Frontend tips, courses and trainning - Angular & Ionic evangelist, blockchain lover");

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
  }

  onBookCourseCardExpand(expands:boolean, index){

    let expandedElement = this.bookCardElements.find((el, position)=>{
      return position == index; 
    });

    let offset = 0;

    let windowsWidth = this.document.body.clientWidth || this.document.documentElement.clientWidth || this.winRef.nativeWindow.innerWidth;

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
