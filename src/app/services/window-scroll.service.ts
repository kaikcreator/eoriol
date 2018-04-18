import { Injectable, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { WindowRefService, DocumentRefService } from './globals.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class WindowScrollService implements OnDestroy {

  private scrollSource = new BehaviorSubject<number>(0);
  public scroll$ = this.scrollSource.asObservable();
  private refToBindedScrollHandler;

  constructor(
    private winRef: WindowRefService,
    private documentRef: DocumentRefService,
    @Inject(PLATFORM_ID) private platformId: Object
  ){
    if(isPlatformBrowser(this.platformId)){
      this.refToBindedScrollHandler = this.scrollHandler.bind(this);
      this.winRef.nativeWindow.addEventListener('scroll', this.refToBindedScrollHandler );    
    }
  }

  ngOnDestroy(){
    if(isPlatformBrowser(this.platformId)){
      this.winRef.nativeWindow.removeEventListener('scroll', this.refToBindedScrollHandler);
    }
  }

  private scrollHandler(event){
    let currentScroll = this.winRef.nativeWindow.scrollY || this.documentRef.nativeDocument.documentElement.scrollTop;
    this.scrollSource.next(currentScroll);
  }

}
