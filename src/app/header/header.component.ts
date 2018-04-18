import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { trigger, state, style, animate, transition, query, animateChild } from '@angular/animations';
import { PageNotFoundService } from '../page-not-found/page-not-found.service';
import { WindowRefService, DocumentRefService } from '../services/globals.service';

const SCROLL_THRESHOLD = 50;
enum HeaderState {
  initial, 
  sticked,
  noSticked
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[
    trigger('ngIfAnimation', [
      transition(':enter, :leave', [
        query('@*', animateChild())
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

  //properties to handle stick to top feature
  private initialMarginTop = 0;
  private previousScroll = 0;
  private deltaScroll = 0;
  private headerState:HeaderState = HeaderState.initial;
  

  constructor(
    public pageNotFoundService:PageNotFoundService,
    private element: ElementRef,
    private winRef: WindowRefService,
    private documentRef: DocumentRefService,
    private renderer:Renderer2
  ) {
    try{
      let computedStyles = this.winRef.nativeWindow.getComputedStyle(this.element.nativeElement);
      this.initialMarginTop = Number(computedStyles.marginTop.split("px")[0]);
    }catch(e){
      //no margin Top value found
    }
   }

  ngOnInit() {
  }

  /** Scroll event listener, in order to stick header to top and hide/show on scroll */
  @HostListener("window:scroll", ['$event'])
  onWindowScroll(event) {
    //get current scroll
    let currentScroll = this.winRef.nativeWindow.scrollY || this.documentRef.nativeDocument.documentElement.scrollTop;
     
    //check scroll directions changes. Reset delta scroll if needed
    let currentDelta = currentScroll - this.previousScroll;
    if(currentDelta * this.deltaScroll < 0){
      this.deltaScroll = 0;
    }

    //if scrolling down
    if(currentDelta > 0){ 
      
      switch (this.headerState) {

        case HeaderState.sticked: //If delta scroll is over the threshold, move from sticked to no-sticked
          this.deltaScroll += currentDelta;
          if(this.deltaScroll > SCROLL_THRESHOLD){
            //remove sticked header
            this.renderer.removeClass(this.element.nativeElement, 'sticked');
            this.renderer.addClass(this.element.nativeElement, 'no-sticked');
            this.headerState = HeaderState.noSticked;
          }
          break;
        
        case HeaderState.initial: //Add sticked class
          if(this.isOverInitialMarginTop(currentScroll)){
            this.renderer.addClass(this.element.nativeElement, 'sticked');
            this.headerState = HeaderState.sticked; 
          }
          break;

      
        default:
          break;
      }

    }

    //if scrolling up
    else if(currentDelta < 0){
      switch (this.headerState) {

        case HeaderState.noSticked: //Show it in case delta scroll is over the threshold
          if(this.isOverInitialMarginTop(currentScroll)){
            this.deltaScroll += currentDelta;
            if(this.deltaScroll < - SCROLL_THRESHOLD){
              this.renderer.removeClass(this.element.nativeElement, 'no-sticked');
              this.renderer.addClass(this.element.nativeElement, 'sticked');
              this.headerState = HeaderState.sticked; 
            }
          }
          break;
        
        case HeaderState.sticked:
          if(!this.isOverInitialMarginTop(currentScroll)){
            this.renderer.removeClass(this.element.nativeElement, 'sticked');
            this.headerState = HeaderState.initial; 
          }
          break;
      
        default:
          break;
      } 
    }

    //update scroll
    this.previousScroll = currentScroll;
  }

  private isOverInitialMarginTop(scroll){
    return scroll > this.initialMarginTop;
  }

  private isHiddenByScroll(scroll){
    return scroll > (this.initialMarginTop + this.element.nativeElement.offsetHeight);
  }

}
