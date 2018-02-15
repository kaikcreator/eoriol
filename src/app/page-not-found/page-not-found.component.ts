import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageNotFoundInternalService } from './page-not-found.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {

  constructor(private internalService:PageNotFoundInternalService) { }

  ngOnInit() {
    this.internalService.active = true;
  }

  ngOnDestroy(){
    this.internalService.active = false;
  }

}
