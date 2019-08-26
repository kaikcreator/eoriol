import { Component, OnInit, ViewChild } from '@angular/core';

import { MailchimpService } from '../services/mailchimp.service';
import { MailchimpProfileModel, MailchimpSubscribeHttpResponse, MailchimpSubscriptionResults } from '../models/mailchimp.model';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-subscribe-section',
  templateUrl: './subscribe-section.component.html',
  styleUrls: ['./subscribe-section.component.scss']
})
export class SubscribeSectionComponent implements OnInit {

  public model = new MailchimpProfileModel();
  public botDetector = "";  
  public error:string = '';
  public success:string = '';
  @ViewChild('email', {static:false}) email: NgModel;

  constructor(private mailchimp:MailchimpService) { }

  ngOnInit() {
  }

  subscribe(){
    if(this.botDetector != ""){
      this.error = "Mmm quite suspicious, you look like a bot";
    }
    else if(!this.email.valid){
      this.error = "Sorry, invalid email";
    }
    else if(this.model.name.length <= 0){
      this.error = "Sorry, missing name";
    }
    else{
      this.mailchimp.subscribeMember(this.model).subscribe(
        response =>{
          if(response.result == MailchimpSubscriptionResults.error){
            this.error = response.msg;
          }
          else{
            this.success = response.msg;
          }
        }
      )
    }
  }

}
