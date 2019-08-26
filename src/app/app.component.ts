import { Component, OnInit, OnDestroy, Inject, NgZone, ChangeDetectorRef } from '@angular/core';
import { WindowScrollService } from './services/window-scroll.service';
import { Subscription } from 'rxjs';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { DOCUMENT } from '@angular/common';
import { environment } from 'environments/environment.prod';


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
    private angulartics2GA: Angulartics2GoogleAnalytics,
    private ngZone:NgZone,
    private cdRef:ChangeDetectorRef,
    @Inject(DOCUMENT) private document:any
  ){
    this.angulartics2GA.startTracking();
  }

  ngOnInit(){

    //add GA script. retrieve UA code from environment
    this.setAnalytics();

    /** Scroll event listener, in order to modify subscribe CTA behavior based on scroll */
    this.ngZone.runOutsideAngular(()=>{
      //running scroll subscription outside Angular zone for performance
      this.scrollSubscription = this.windowScroll.scroll$.subscribe((scroll)=>{
        if(scroll > 225){
          if(this.subscribeCTAWhite){
            this.subscribeCTAWhite = false;
            this.cdRef.detectChanges();
          }
        }
        else{
          if(!this.subscribeCTAWhite){
            this.subscribeCTAWhite = true;
            this.cdRef.detectChanges();
          }
        }
      });
    });
  }

  private setAnalytics() {
    const head = this.document.getElementsByTagName('head')[0];
    //initialize google analytics
    const gaScript = this.document.createElement('script');
    gaScript.id = 'ga1-script';
    gaScript.type = 'text/javascript';
    gaScript.innerHTML = `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
    ga('create', '${environment.googleAnalyticsId}', 'auto');`;
    //download asyncronously google analytics file
    const asyncScript = this.document.createElement('script');
    asyncScript.id = 'ga2-script';
    asyncScript.type = 'text/javascript';
    asyncScript.async = true;
    asyncScript.src = 'https://www.google-analytics.com/analytics.js';
    //prevent the scripts from being loaded twice (in case of SSR for example)
    if(!this.document.getElementById('ga1-script')){
      head.appendChild(gaScript);
    }
    if(!this.document.getElementById('ga2-script')){
      head.appendChild(asyncScript);
    }
  }  

  ngOnDestroy(){
    if(this.scrollSubscription){
      this.scrollSubscription.unsubscribe();
      this.scrollSubscription = null;
    }
  }  
}
