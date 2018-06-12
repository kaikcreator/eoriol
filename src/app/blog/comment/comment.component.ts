import { Component, OnInit, Input } from '@angular/core';
import { CommentModel } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor() { }

  @Input() content:string;
  @Input() author:string;
  @Input() date:string;
  @Input() avatar:string;
  @Input() replies:CommentModel[];

  ngOnInit() {
  }

}
