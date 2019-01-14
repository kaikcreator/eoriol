import { Component, OnInit, ElementRef, Renderer2, OnDestroy, NgZone } from '@angular/core';
import { trigger, transition, query, animateChild } from '@angular/animations';
import { PageNotFoundService } from '../page-not-found/page-not-found.service';
import { WindowScrollService } from '../services/window-scroll.service';
import { pairwise } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

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
  private initialTop = 0;
  private deltaScroll = 0;
  public scrollSubscription:Subscription = null;
  private headerState:HeaderState = HeaderState.initial;
  

  constructor(
    public pageNotFoundService:PageNotFoundService,/* used from template */
    private element: ElementRef,
    private renderer:Renderer2,
    private windowScroll: WindowScrollService,
    private scrollTo:ScrollToService,
    private ngZone:NgZone
  ) {
    try{
      this.initialTop = this.element.nativeElement.getBoundingClientRect().top;
    }catch(e){
      //no margin Top value found
    }
   }

  ngOnInit() {
    this.ngZone.runOutsideAngular(()=>{
      this.scrollSubscription = this.windowScroll.scroll$
      .pipe(
        pairwise())
      .subscribe(this.handleStickyHeader.bind(this));
    });
  }

  ngOnDestroy(){
    if(this.scrollSubscription){
      this.scrollSubscription.unsubscribe();
      this.scrollSubscription = null;
    }
  }

  scrollTop(isActive){
    if(isActive){
      this.scrollTo.scrollTo({
        target:this.element.nativeElement.children[0]
      });      
    }
    else{
      this.scrollTo.scrollTo({
        target:this.element.nativeElement.children[0],
        duration: 0
      });      
    }
  }


  /** Scroll event listener, in order to stick header to top and hide/show on scroll */
  
  private handleStickyHeader([oldScroll, currentScroll]){

    //check scroll directions changes. Reset delta scroll if needed
    let currentDelta = currentScroll - oldScroll;
    if(currentDelta * this.deltaScroll < 0){
      this.deltaScroll = 0;
    }
    this.deltaScroll += currentDelta; 

    //if scrolling down
    if(this.deltaScroll > 0){ 
      
      switch (this.headerState) {

        case HeaderState.initial: //Add sticked class
          if(this.isOverInitialMarginTop(currentScroll)){
            if(!this.isHiddenByScroll(currentScroll)){
              this.renderer.addClass(this.element.nativeElement, 'sticked');
              this.headerState = HeaderState.sticked;
            }
            else{
              this.renderer.addClass(this.element.nativeElement, 'no-transition');
              setTimeout(
                ()=>{this.renderer.removeClass(this.element.nativeElement, 'no-transition');}, 
              100);
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
            if(this.isOverInitialMarginTop(currentScroll)){
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
          if(!this.isOverInitialMarginTop(currentScroll)){
            this.renderer.removeClass(this.element.nativeElement, 'sticked');
            this.headerState = HeaderState.initial; 
          }
          break;
      
        default:
          break;
      } 
    } 
  }

  private isOverInitialMarginTop(scroll){
    return scroll > this.initialTop;
  }

  private isHiddenByScroll(scroll){
    return scroll > (this.initialTop + this.element.nativeElement.offsetHeight);
  }

}
