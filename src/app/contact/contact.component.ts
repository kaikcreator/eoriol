import { Component, OnInit } from '@angular/core';
import { ContactModel, ContactTopic } from '../models/contact.model';
import { WordpressService } from '../services/wordpress.service';

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

  constructor(private wordpress:WordpressService) { 
    for(let item in ContactTopic){
      this.topics.push({key:item, value:ContactTopic[item]});
    }
  }

  ngOnInit() {
  }

  submit(){
    console.log(this.model);
    this.wordpress.contact(this.model).subscribe(
      response => {
        this.success = response;
        this.model = new ContactModel();
      },
      err => {
        this.error = err.message;
      }
    );
  }

}
