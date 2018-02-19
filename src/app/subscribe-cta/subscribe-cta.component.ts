import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  
  constructor() { }

  ngOnInit() {
  }

}
