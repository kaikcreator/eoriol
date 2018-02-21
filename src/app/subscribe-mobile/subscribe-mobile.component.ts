import { Component, OnInit } from '@angular/core';
import { MailchimpProfileModel, MailchimpSubscriptionResults } from '../models/mailchimp.model';
import { MailchimpService } from '../services/mailchimp.service';

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

  constructor(private mailchimp:MailchimpService) { }

  ngOnInit() {
  }

  subscribe(){
    this.mailchimp.subscribeMember(this.model).subscribe(
      data =>{
        if(data.result == MailchimpSubscriptionResults.error){
          this.error = data.msg;
        }
        else{
          this.success = data.msg;
        }
      }
    )
  }

}
