import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { trigger, state, style, animate, transition, query, animateChild } from '@angular/animations';
import { PageNotFoundService } from '../page-not-found/page-not-found.service';
import { WindowRefService, DocumentRefService } from '../services/globals.service';

const SCROLL_THRESHOLD = 50;

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

  private initialMarginTop = 0;
  private previousScroll = 0;
  private deltaScroll = 0;
  private headerSticked = false;

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

  /** Scroll event listener, in order to stick header */
  @HostListener("window:scroll", ['$event'])
  onWindowScroll(event) {
    let currentScroll = this.winRef.nativeWindow.scrollY || this.documentRef.nativeDocument.documentElement.scrollTop;

    //check scroll directions changes
    let currentDelta = currentScroll - this.previousScroll;
    if(currentDelta * this.deltaScroll < 0){
      //scroll direction has changed, reset delta scroll
      this.deltaScroll = 0;
    }

    //scroll is DOWN
    if(currentDelta > 0){      
      if(this.headerSticked){
        //if header is sticked, hide it in case delta scroll is over the threshold
        this.deltaScroll += currentDelta;
        if(this.deltaScroll > SCROLL_THRESHOLD){
          //remove sticked header
          this.unstickHeader();
        }
      }

    }

    //scroll is UP
    else if(currentDelta < 0){
      //check if header should be sticked (or not because it's arriving to his original position)
      let shouldBeSticked = this.headerShouldBeSticked(currentScroll);

      if(! this.headerSticked && shouldBeSticked){
        //if header is not sticked, show it in case delta scroll is over the threshold
        this.deltaScroll += currentDelta;
        if(this.deltaScroll < - SCROLL_THRESHOLD){
          //stick header in top
          this.stickHeader();
         
        }
      }
      else if(this.headerSticked && ! shouldBeSticked){
        //if header is sticked, and it shouldn't, unstick it
        this.unstickHeader();
      }      

    }

    //update scroll
    this.previousScroll = currentScroll;
  }

  private headerShouldBeSticked(scroll){
    return scroll > this.initialMarginTop;
  }

  private stickHeader(){
    this.renderer.addClass(this.element.nativeElement, 'sticked');
    this.headerSticked = true; 
  }

  private unstickHeader(){
    this.renderer.removeClass(this.element.nativeElement, 'sticked');
    this.headerSticked = false; 
  }  

}
