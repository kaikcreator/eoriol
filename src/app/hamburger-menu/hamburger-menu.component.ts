import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent implements OnInit {

  constructor() { }

  public open: boolean = false;

  ngOnInit() {
  }

  toogleMenu(){
    this.open = !this.open;
    console.log("toogling menu: ",this.open);
  }

}
