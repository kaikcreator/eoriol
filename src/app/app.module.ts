import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookCoursesService } from './services/book-courses.service';
import { BookCardComponent } from './book-card/book-card.component';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogPostsService } from './services/blog-posts.service';
import { ContactComponent } from './contact/contact.component';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { WindowRefService } from './services/window-ref.service';
import { MenuMobileComponent } from './menu-mobile/menu-mobile.component';
import { HeaderComponent } from './header/header.component';
import { SocialIconsBarComponent } from './social-icons-bar/social-icons-bar.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    BookCardComponent,
    BlogCardComponent,
    ContactComponent,
    HamburgerMenuComponent,
    MenuMobileComponent,
    HeaderComponent,
    SocialIconsBarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId:'MySampleProject'}),
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    ScrollToModule.forRoot()
  ],
  providers: [ BookCoursesService, BlogPostsService, WindowRefService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ){
    const platform = isPlatformBrowser(this.platformId) ? 'browser' : 'server';
    console.log("I'm on the ", platform);
  }
 }
