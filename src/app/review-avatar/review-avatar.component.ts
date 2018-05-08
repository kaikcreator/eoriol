import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review-avatar',
  templateUrl: './review-avatar.component.html',
  styleUrls: ['./review-avatar.component.scss']
})
export class ReviewAvatarComponent implements OnInit {

  constructor() { }

  @Input() public image:string;
  @Input() public name:string;

  ngOnInit() {
  }

}
