import { Directive, ElementRef, Renderer2, Inject, PLATFORM_ID, NgZone, OnDestroy } from '@angular/core';
import { WindowScrollService } from '../../services/window-scroll.service';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

enum StickyState {
  fixed = "fixed",
  noFixed = "no-fixed"
}

@Directive({
  selector: '[app-sticky-below-view]'
})
export class StickyBelowViewDirective implements OnDestroy {

  public scrollSubscription:Subscription = null;
  private fixedState = StickyState.noFixed;
  private offsetFromTop = 0;
  private fixedViewOffset = 0;  

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private windowScroll:WindowScrollService,
    private element: ElementRef,
    private renderer:Renderer2,
    private ngZone: NgZone) { 
    }

  public ngOnDestroy(){
    if(this.scrollSubscription){
      this.scrollSubscription.unsubscribe();
      this.scrollSubscription = null;
    }
  }  
    
  public initStickyElement(){
    this.getInitialOffset();
    this.getFixedViewportOffset();

    if(isPlatformBrowser(this.platformId)){
      this.ngZone.runOutsideAngular(()=>{
        this.scrollSubscription = this.windowScroll.scroll$
        .subscribe(this.handleScroll.bind(this));
      });
    }
  }

  private getInitialOffset(){
    let currentElementOffset = this.element.nativeElement.getBoundingClientRect().top;
    let currentScroll = this.windowScroll.getCurrentScroll();
    this.offsetFromTop = currentElementOffset + currentScroll;
  }

  private getFixedViewportOffset(){
      //set the fixed class
      this.renderer.addClass(this.element.nativeElement, 'fixed');
      //save the view offset in fixed position
      this.fixedViewOffset = this.element.nativeElement.getBoundingClientRect().top;
      //remove again the fixed class
      this.renderer.removeClass(this.element.nativeElement, 'fixed');
  }
  
  private handleScroll(currentScroll){
    
    //if not fixed
    //and we have not yet scrolled until the original position of the element
    //fix it
    if(this.fixedState == StickyState.noFixed &&
      currentScroll + this.fixedViewOffset < this.offsetFromTop){
        this.fixedState = StickyState.fixed;
        this.renderer.addClass(this.element.nativeElement, 'fixed');
    }
    //if fixed
    else if(this.fixedState == StickyState.fixed){
      let currentOffsetFromTop = currentScroll + this.element.nativeElement.getBoundingClientRect().top;
      //and the current offset from top is greater or equal than the original
      //unfix it
      if (currentOffsetFromTop >= this.offsetFromTop){
        this.fixedState = StickyState.noFixed;
        this.renderer.removeClass(this.element.nativeElement, 'fixed');
      }
    }

  }  

}
