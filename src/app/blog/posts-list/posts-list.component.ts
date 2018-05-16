import { Component, OnInit, ElementRef, PLATFORM_ID, Inject, ViewChild } from '@angular/core';
import { BlogPostsService } from '../../services/blog-posts.service';
import { isPlatformBrowser } from '@angular/common';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { SearchBoxComponent } from '../../ui-common/search-box/search-box.component';
import { switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  @ViewChild(SearchBoxComponent) searchBox:SearchBoxComponent;
  public postsList:any[] = null;


  constructor(
    private blogPosts: BlogPostsService,
    private element: ElementRef,
    private scrollTo:ScrollToService,
    @Inject(PLATFORM_ID) private platformId: Object) { }


  ngOnInit() {
    //scroll top
    if(isPlatformBrowser(this.platformId)){
      this.scrollTo.scrollTo({
        offset:this.element.nativeElement.getBoundingClientRect().top,
        duration: 0
      });
    }

    //get first page of items
    this.getMoreItems();    

    //subscribe to search-box and perform async search with latest value
    this.searchBox.value.pipe(
      switchMap(value => this.search(value)),
    ).subscribe(items => {
      this.postsList = items;
    });
  }


  getMoreItems(){
    let offset = this.postsList ? this.postsList.length : 0;
    this.blogPosts.getItems(offset)
    .subscribe(items => {
      this.postsList = this.postsList ? [...this.postsList, ...items] : items;
    });
  }


  search(value){
    this.blogPosts.search = value;
    this.postsList = null;
    return this.blogPosts.getItems(0);
  }

}
