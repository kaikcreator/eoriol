import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MailchimpService } from '../services/mailchimp.service';
import { MailchimpProfileModel, MailchimpSubscribeHttpResponse, MailchimpSubscriptionResults } from '../models/mailchimp.model';

@Component({
  selector: 'app-subscribe-cta',
  templateUrl: './subscribe-cta.component.html',
  styleUrls: ['./subscribe-cta.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        'opacity': '0',
        'transform': 'translateX(10%)'
      })),
      transition('* => *', [
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class SubscribeCtaComponent implements OnInit {

  public open = false;
  public model = new MailchimpProfileModel();
  public botDetector = "";
  public error = "";
  public success = "";
  
  constructor(private mailchimp:MailchimpService) { }

  ngOnInit() {
  }

  subscribe(){
    if(this.botDetector != ""){
      this.error = "Mmm quite suspicious, you look like a bot";
    }
    else if(this.model.email.length > 2 && this.model.name.length > 0){
      this.mailchimp.subscribeMember(this.model).subscribe(
        response =>{
          if(response.result == MailchimpSubscriptionResults.error){
            this.error = response.msg;
          }
          else{
            console.log(response.msg);
            this.success = response.msg;
          }
        }
      )
    }
  }

}
