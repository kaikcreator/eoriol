import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

  constructor(private transferState: TransferState) { }

  intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
    if(req.method != 'GET'){
      return next.handle(req);
    }
    const key = makeStateKey<any>(req.urlWithParams);
    const transferredValue = this.transferState.get(key, null);
    console.log("trying to get transferState for: ", key, " result: ", transferredValue);

    if(transferredValue){
      //this syntax means Observable.of(new response)
      console.log("transferred value found, returning cached response");
      return of(new HttpResponse({
        body: transferredValue
      }));
    } 
    else{
      console.log("NO transferred value found, requesting to server");
      return next.handle(req).pipe(
        tap(event => {
          console.log("received event: ", event);
          if( event instanceof HttpResponse){
            console.log("GET request received, let's store transferState to: ", key, event.body);
            this.transferState.set(key, event.body);
          }
        })
      );
    }
  }

}
