import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommentModel } from '../../models/comment.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  @ViewChild('form', { static: true }) form: NgForm;
  public submitInProcess = false;

  constructor() { }

  @Output() onSubmit: EventEmitter<CommentModel> = new EventEmitter<CommentModel>();
  public model = new CommentModel();


  ngOnInit() {
  }

  submitForm() {
    this.onSubmit.emit(this.model);
    this.submitInProcess = true;
  }

  clearForm() {
    this.model = new CommentModel('', '', '');
    this.form.reset();
    this.submitInProcess = false;
  }

  cancelSubmit() {
    this.submitInProcess = false;
  }

  setParent(parent: number) {
    this.model.parent = parent;
  }

}
