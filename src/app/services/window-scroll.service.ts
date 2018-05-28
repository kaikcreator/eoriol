import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { WindowRefService, DocumentRefService } from './globals.service';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent ,  Observable, empty } from 'rxjs';
import { tap, filter, map, share } from 'rxjs/operators';

const DEBOUNCE_MAX_COUNT = 12;

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
        map(event =>{
          return this.winRef.nativeWindow.scrollY || this.documentRef.nativeDocument.documentElement.scrollTop;
        }),
        filter(scroll => this.debounceCounter >= DEBOUNCE_MAX_COUNT || scroll == 0),
        tap(scroll => this.debounceCounter = 0),        
        share());
    }
    else{
      //in non-browser environments, provide an empty observable so you can safely subscribe to scroll$
      this.scroll$ = empty();
      
    }
  }

}
