import { Component, OnInit, HostListener, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition, query, animateChild } from '@angular/animations';
import { PageNotFoundService } from '../page-not-found/page-not-found.service';
import { WindowRefService } from '../services/globals.service';
import { WindowScrollService } from '../services/window-scroll.service';
import { auditTime } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

const STICK_THRESHOLD = 50;
const UNSTICK_THRESHOLD = 200;

enum HeaderState {
  initial = "initial", 
  sticked = "sticked",
  noSticked = "no-sticked"
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
export class HeaderComponent implements OnInit, OnDestroy {

  //properties to handle stick to top feature
  private initialMarginTop = 0;
  private previousScroll = 0;
  private currentScroll = 0;
  private deltaScroll = 0;
  public scrollSubscription:Subscription = null;
  private headerState:HeaderState = HeaderState.initial;
  

  constructor(
    public pageNotFoundService:PageNotFoundService,
    private element: ElementRef,
    private winRef: WindowRefService,
    private renderer:Renderer2,
    private windowScroll: WindowScrollService
  ) {
    try{
      let computedStyles = this.winRef.nativeWindow.getComputedStyle(this.element.nativeElement);
      this.initialMarginTop = Number(computedStyles.marginTop.split("px")[0]);
    }catch(e){
      //no margin Top value found
    }
   }

  ngOnInit() {
    this.scrollSubscription = this.windowScroll.scroll$
    .pipe(auditTime(20))
    .subscribe(this.handleStickyHeader.bind(this));
  }

  ngOnDestroy(){
    this.scrollSubscription.unsubscribe();
  }


  /** Scroll event listener, in order to stick header to top and hide/show on scroll */
  
  private handleStickyHeader(scroll){
    this.currentScroll = scroll;
    //check scroll directions changes. Reset delta scroll if needed
    let currentDelta = this.currentScroll - this.previousScroll;
    if(currentDelta * this.deltaScroll < 0){
      this.deltaScroll = 0;
    }
    this.deltaScroll += currentDelta; 

    //if scrolling down
    if(this.deltaScroll > 0){ 
      
      switch (this.headerState) {

        case HeaderState.initial: //Add sticked class
          if(this.isOverInitialMarginTop()){
            if(!this.isHiddenByScroll()){
              this.renderer.addClass(this.element.nativeElement, 'sticked');
              this.headerState = HeaderState.sticked;
            }
            else{
              this.renderer.addClass(this.element.nativeElement, 'no-sticked');
              this.headerState = HeaderState.noSticked;              
            }
          }
          //else, it should remain in initial state
          break;        

        case HeaderState.sticked: 
          //If delta scroll is over the threshold, move from sticked to no-sticked
          if(this.deltaScroll > UNSTICK_THRESHOLD){
            //remove sticked header
            this.renderer.removeClass(this.element.nativeElement, 'sticked');
            this.renderer.addClass(this.element.nativeElement, 'no-sticked');
            this.headerState = HeaderState.noSticked;
          }
          break;

      
        default:
          break;
      }

    }

    //if scrolling up
    else if(this.deltaScroll < 0){

      switch (this.headerState) {

        case HeaderState.initial: //This case should never happen
        case HeaderState.noSticked: //Show it in case delta scroll is over the threshold
          if(this.deltaScroll < - STICK_THRESHOLD){
            if(this.isOverInitialMarginTop()){
              this.renderer.removeClass(this.element.nativeElement, 'no-sticked');
              this.renderer.addClass(this.element.nativeElement, 'sticked');
              this.headerState = HeaderState.sticked; 
            }
            else{
              //if under initial margin, restore to initial state
              this.renderer.removeClass(this.element.nativeElement, 'no-sticked');
              this.headerState = HeaderState.initial; 
            }
          }
          break;
        
        case HeaderState.sticked:
          if(!this.isOverInitialMarginTop()){
            this.renderer.removeClass(this.element.nativeElement, 'sticked');
            this.headerState = HeaderState.initial; 
          }
          break;
      
        default:
          break;
      } 
    }

    //update previous scroll
    this.previousScroll = this.currentScroll;
  }

  private isOverInitialMarginTop(){
    return this.currentScroll > this.initialMarginTop;
  }

  private isHiddenByScroll(){
    return this.currentScroll > (this.initialMarginTop + this.element.nativeElement.offsetHeight);
  }

}
