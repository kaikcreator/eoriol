import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
 

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  public search = new FormControl();
  @Output() value:EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.search.valueChanges.pipe(
      debounceTime(300),
      filter(text => text.length > 2),
      distinctUntilChanged(),
      tap(text =>{
        this.value.emit(text);
      })
    ).subscribe();
  }

}
