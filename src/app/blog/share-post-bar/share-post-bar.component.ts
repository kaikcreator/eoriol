import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-share-post-bar',
  templateUrl: './share-post-bar.component.html',
  styleUrls: ['./share-post-bar.component.scss']
})
export class SharePostBarComponent implements OnInit {

  @Input() url:string = "";
  @Input() title:string = "";


  constructor() { 
    }

  ngOnInit() {    
  }

}
