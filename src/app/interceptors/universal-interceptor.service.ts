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

    if(transferredValue){
      //this syntax means Observable.of(new response)
      return of(new HttpResponse({
        body: transferredValue
      }));
    } 
    else{
      return next.handle(req).pipe(
        tap(event => {
          if( event instanceof HttpResponse){
            this.transferState.set(key, event.body);
          }
        })
      );
    }
  }

}
