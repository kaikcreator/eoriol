import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MailchimpProfileModel, MailchimpSubscribeHttpResponse, MailchimpSubscriptionResults } from '../models/mailchimp.model';
import { environment } from '../../environments/environment';
import { JSStandardEncoder } from './js-standard-encoder';
import { catchError } from 'rxjs/operators';


@Injectable()
export class MailchimpService {

  constructor(private http:HttpClient) { }

  subscribeMember(mailchimpProfile:MailchimpProfileModel):Observable<MailchimpSubscribeHttpResponse>{
  
    const currentDate = new Date().toISOString().split('T')[0];
    let dateArray = currentDate.split('-');
    const reversedDate = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];

    let params = new HttpParams({encoder: new JSStandardEncoder()});
    params = params.append('u', 'e922bf81d430ca3f5c07aea5f');
    params = params.append('id', 'e0c0e39f1c');
    params = params.append("EMAIL", mailchimpProfile.email);
    params = params.append("FNAME", mailchimpProfile.name);
    params = params.append("status", mailchimpProfile.status);
    params = params.append("GDPR", mailchimpProfile.gdpr ? '1':'0');
    params = params.append("GDPRDATE", reversedDate);
    
    let url = `${environment.mailchimpUrl}/subscribe/post-json?`;
    url = url + params.toString();

    let observable = this.http.jsonp<MailchimpSubscribeHttpResponse>(url, 'c');
    observable.pipe(catchError(err => {
      return of(<MailchimpSubscribeHttpResponse>{
        result: MailchimpSubscriptionResults.error,
        msg: err
      });
    }));


    return observable;
  }

}
