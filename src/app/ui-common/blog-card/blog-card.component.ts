import { Component, OnInit, Input, HostListener } from '@angular/core';
import { WindowRefService } from '../../services/globals.service';
import { Router } from '@angular/router';
import { PostModel } from '../../models/post.model';

@Component({
  selector: 'app-blog-card',
  host: {'class': 'card card-content', "[attr.tabindex]": "0"},
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

  @Input() item:PostModel;

  @HostListener('click', ['$event.target'])
  onClick(target){
    if(this.item.path)
      this.router.navigate([this.item.path]);
    else
    this.winRef.nativeWindow.open(this.item.link);
  }
  
  constructor(private winRef: WindowRefService, private router: Router) { 
  }

  ngOnInit() {
    
  }

}
