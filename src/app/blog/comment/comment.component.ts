import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { CommentModel } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(private element:ElementRef) { }

  @Input() id:number;
  @Input() content:string;
  @Input() author:string;
  @Input() date:string;
  @Input() avatar:string;
  @Input() replies:CommentModel[];

  @Output() onReply:EventEmitter<{id:number, element:ElementRef}> = new EventEmitter<{id:number, element:ElementRef}>();

  ngOnInit() {
  }

  public reply(){
    this.onReply.emit({id:this.id, element:this.element});
  }

  public replyChild(event){
    this.onReply.emit(event);
  }

}
