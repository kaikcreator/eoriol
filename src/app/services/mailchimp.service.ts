import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MailchimpProfileModel, MailchimpSubscribeHttpResponse } from '../models/mailchimp.model';
import { environment } from '../../environments/environment';

@Injectable()
export class MailchimpService {

  constructor(private http:HttpClient) { }

  subscribeMember(mailchimpProfile:MailchimpProfileModel):Observable<MailchimpSubscribeHttpResponse>{
  
    let params = new HttpParams();
    params = params.append('u', 'e922bf81d430ca3f5c07aea5f');
    params = params.append('id', 'e0c0e39f1c');
    params = params.append("EMAIL", mailchimpProfile.email);
    params = params.append("FNAME", mailchimpProfile.name);
    params = params.append("status", mailchimpProfile.status);
    
    let url = `${environment.mailchimpUrl}/subscribe/post-json?`;
    url = url + params.toString();


    return this.http.jsonp<MailchimpSubscribeHttpResponse>(url, 'c');
  }

}
