import { Component, OnInit } from '@angular/core';
import { ContactModel, ContactTopic } from '../models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public topics:[{key:string,value:string}] =<any>[];
  public data:ContactModel;

  constructor() { 
    for(let item in ContactTopic){
      this.topics.push({key:item, value:ContactTopic[item]});
    }
  }

  ngOnInit() {
  }

}
