import { Component, OnInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { MailchimpProfileModel, MailchimpSubscriptionResults } from '../models/mailchimp.model';
import { MailchimpService } from '../services/mailchimp.service';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-subscribe-mobile',
  templateUrl: './subscribe-mobile.component.html',
  styleUrls: ['./subscribe-mobile.component.scss']
})
export class SubscribeMobileComponent implements OnInit {

  public model = new MailchimpProfileModel();
  public botDetector = "";
  public error = "";
  public success = "";

  constructor( 
    private mailchimp:MailchimpService, 
    private scrollTo:ScrollToService, 
    private element: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ){ }

  ngOnInit() {
    
    if(isPlatformBrowser(this.platformId)){
      this.scrollTo.scrollTo({
        offset:this.element.nativeElement.getBoundingClientRect().top,
        duration: 0
      });
    }
  }

  subscribe(){
    this.mailchimp.subscribeMember(this.model)
    .subscribe(
      data =>{
        if(data.result == MailchimpSubscriptionResults.error){
          this.error = data.msg;
        }
        else{
          this.success = data.msg;
        }
      },
      err => {
        this.error = "Oops! Sorry, something went wrong. Try it later";
      }
    )
  }

}
