import { Component, OnInit, Input, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { WindowScrollService } from '../../services/window-scroll.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { WindowRefService } from '../../services/globals.service';

enum ShareBarState {
  fixed = "fixed",
  noFixed = "no-fixed"
}

@Component({
  selector: 'app-share-post-bar',
  templateUrl: './share-post-bar.component.html',
  styleUrls: ['./share-post-bar.component.scss']
})
export class SharePostBarComponent implements OnInit {

  @Input() url:string = "";
  @Input() title:string = "";
  public scrollSubscription:Subscription = null;
  private fixedState = ShareBarState.noFixed;
  private offsetFromTop = 0;

  constructor(
    @Inject(DOCUMENT) private document:any,
    @Inject(PLATFORM_ID) private platformId: Object,
    private winRef: WindowRefService,
    private windowScroll:WindowScrollService,
    private element: ElementRef,
    private renderer:Renderer2,) { 
    }

  ngOnInit() {    
  }

  public enableStickyFeature(){
    let currentElementOffset = this.element.nativeElement.getBoundingClientRect().bottom;
    let currentScroll = this.winRef.nativeWindow.scrollY || this.document.documentElement.scrollTop;
    let viewportHeight = this.winRef.nativeWindow.innerHeight || this.document.documentElement.clientHeight || this.document.body.clientHeight;
    this.offsetFromTop = currentElementOffset + currentScroll - viewportHeight;

    if(isPlatformBrowser(this.platformId)){
      this.scrollSubscription = this.windowScroll.scroll$
      .subscribe(this.handleScroll.bind(this));
    }
  }
  
  private handleScroll(currentScroll){

    if(currentScroll < this.offsetFromTop + 20 && 
      this.fixedState == ShareBarState.noFixed ){
        this.fixedState = ShareBarState.fixed;
        this.renderer.addClass(this.element.nativeElement, 'fixed');
    }
    else if(currentScroll >= this.offsetFromTop + 20 && 
    this.fixedState == ShareBarState.fixed ){
      this.fixedState = ShareBarState.noFixed;
      this.renderer.removeClass(this.element.nativeElement, 'fixed');
    }

  }
}
