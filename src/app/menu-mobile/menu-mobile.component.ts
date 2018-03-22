import { Component, OnInit, Output, EventEmitter, Renderer2 } from '@angular/core';
import { trigger, state, style, animate, transition, query, animateChild, stagger } from '@angular/animations';
import { DocumentRefService } from '../services/globals.service';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.scss'],
  animations:[
    trigger('fadeSlideInOut', [
      state('void', style({
        'opacity': '0',
        'transform': 'translateY(-100%)'
      })),
      transition(':enter', [
        animate('200ms ease-in'),
        query('@fadeInOut', stagger(200, [
          animateChild()
        ]))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({
          'transform':'translateY(0)',
          'opacity': '0'
        }))
      ])
    ]),       
    trigger('fadeInOut', [
      state('void', style({
        'opacity': '0',
      })),
      transition('* => *', [
        animate('800ms ease-in-out')
      ])
    ])
  ]
})
export class MenuMobileComponent implements OnInit {

  @Output() onClose = new EventEmitter<void>();

  constructor(private renderer:Renderer2, private documentRef:DocumentRefService) { }

  ngOnInit() {
    this.setNoScrollToBody(true);
  }

  ngOnDestroy(){
    this.setNoScrollToBody(false);
  }

  close(){
    this.onClose.emit();
  }

  private setNoScrollToBody(val:boolean){
    if(val){
      this.renderer.addClass(this.documentRef.nativeDocument.body, 'no-scroll');
    }
    else{
      this.renderer.removeClass(this.documentRef.nativeDocument.body, 'no-scroll');
    }
  }  

}
