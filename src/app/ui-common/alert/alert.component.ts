import { Component, OnInit, Input } from '@angular/core';
/* import { trigger, state, style, animate, transition } from '@angular/animations';
 */
export enum AlertComponentType{
  SUCCESS= 'success',
  ERROR= 'error'
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
/*   animations: [
    trigger('fadeInOut', [
      state('void', style({
        'opacity': '0',
      })),
      transition('* => *', [
        animate('200ms ease-in-out')
      ])
    ])] */     
})
export class AlertComponent implements OnInit {

  constructor() { }

  public alertTypes = AlertComponentType;

  @Input() public title:string;
  @Input() public message:string;
  @Input() public type:AlertComponentType;

  ngOnInit() {
  }

}
