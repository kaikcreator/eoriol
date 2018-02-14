import { Injectable } from '@angular/core';

@Injectable()
export class PageNotFoundInternalService {

  public active:boolean;

}

@Injectable()
export class PageNotFoundService {

  constructor(private internalService: PageNotFoundInternalService){}

  get active(){
    return this.internalService.active;
  }

}
