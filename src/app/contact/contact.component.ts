import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactModel, ContactTopic } from '../models/contact.model';
import { WordpressService } from '../services/wordpress.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public topics:[{key:string,value:string}] =<any>[];
  public model:ContactModel = new ContactModel();
  public success:string = "";
  public error:string ="";
  @ViewChild('form') form: NgForm;

  constructor(private wordpress:WordpressService) { 
    for(let item in ContactTopic){
      this.topics.push({key:item, value:ContactTopic[item]});
    }
  }

  ngOnInit() {
  }

  submit(){
    this.wordpress.contact(this.model).subscribe(
      response => {
        this.success = response;
        setTimeout(()=>{this.success="";}, 3500);
        this.model = new ContactModel();
        this.form.reset();
      },
      err => {
        this.error = err.message;
        setTimeout(()=>{this.success="";}, 3500);
      }
    );
  }

}
