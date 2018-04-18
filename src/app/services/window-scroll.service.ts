import { Injectable, OnDestroy } from '@angular/core';
import { WindowRefService, DocumentRefService } from './globals.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class WindowScrollService implements OnDestroy {

  private scrollSource = new BehaviorSubject<number>(0);
  public scroll$ = this.scrollSource.asObservable();
  private refToBindedScrollHandler;

  constructor(
    private winRef: WindowRefService,
    private documentRef: DocumentRefService,
  ){
    this.refToBindedScrollHandler = this.scrollHandler.bind(this);
    this.winRef.nativeWindow.addEventListener('scroll', this.refToBindedScrollHandler );    
  }

  ngOnDestroy(){
    this.winRef.nativeWindow.removeEventListener('scroll', this.refToBindedScrollHandler);
  }

  private scrollHandler(event){
    let currentScroll = this.winRef.nativeWindow.scrollY || this.documentRef.nativeDocument.documentElement.scrollTop;
    this.scrollSource.next(currentScroll);
  }

}
