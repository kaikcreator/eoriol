import { Component, OnInit, OnDestroy } from '@angular/core';
import { WindowScrollService } from './services/window-scroll.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public subscribeCTAWhite:boolean = true;
  public scrollSubscription:Subscription = null;

  constructor(
    private windowScroll: WindowScrollService,
  ){}

  ngOnInit(){
    /** Scroll event listener, in order to modify subscribe CTA behavior based on scroll */
    this.scrollSubscription = this.windowScroll.scroll$.subscribe((scroll)=>{
      if(scroll > 225){
        if(this.subscribeCTAWhite)
          this.subscribeCTAWhite = false;
      }
      else{
        if(!this.subscribeCTAWhite)
          this.subscribeCTAWhite = true;
      }
    })
  }

  ngOnDestroy(){
    if(this.scrollSubscription)
      this.scrollSubscription.unsubscribe();
  }  
}
