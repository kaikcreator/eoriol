import { Component, OnInit, Input } from '@angular/core';

export enum AlertComponentType{
  SUCCESS= 'success',
  ERROR= 'error'
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
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
