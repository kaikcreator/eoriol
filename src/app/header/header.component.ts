import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, animateChild } from '@angular/animations';
import { PageNotFoundService } from '../page-not-found/page-not-found.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[
    trigger('ngIfAnimation', [
      transition(':enter, :leave', [
        query('@*', animateChild())
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

  constructor(public pageNotFoundService:PageNotFoundService) { }

  ngOnInit() {
  }

}
