import { Injectable, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { WindowRefService, DocumentRefService } from './globals.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Observable } from 'rxjs/Observable';
import { tap, filter, map, share } from 'rxjs/operators';

@Injectable()
export class WindowScrollService {

  public scroll$:Observable<number>;
  private debounceCounter = 0;

  constructor(
    private winRef: WindowRefService,
    private documentRef: DocumentRefService,
    @Inject(PLATFORM_ID) private platformId: Object
  ){
    if(isPlatformBrowser(this.platformId)){
      this.scroll$ = fromEvent(this.winRef.nativeWindow, 'scroll').pipe(
        tap(event => this.debounceCounter++),
        filter(event => this.debounceCounter == 10),
        tap(event => this.debounceCounter = 0),
        map(event =>{
          return this.winRef.nativeWindow.scrollY || this.documentRef.nativeDocument.documentElement.scrollTop;
        }),
        share());
    }
  }

}
