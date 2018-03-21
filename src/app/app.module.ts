import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { PageNotFoundModule } from './page-not-found/page-not-found.module';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HomeComponent } from './home/home.component';
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
import { SubscribeCtaComponent } from './subscribe-cta/subscribe-cta.component';
import { WordpressService } from './services/wordpress.service';
import { MailchimpService } from './services/mailchimp.service';
import { ActionButtonComponent } from './action-button/action-button.component';
import { environment } from '../environments/environment';
import { SubscribeSectionComponent } from './subscribe-section/subscribe-section.component';
import { LQImgPlaceholderDirective } from './lqimg-placeholder.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookCardComponent,
    BlogCardComponent,
    ContactComponent,
    HamburgerMenuComponent,
    MenuMobileComponent,
    HeaderComponent,
    SocialIconsBarComponent,
    SubscribeCtaComponent,
    ActionButtonComponent,
    SubscribeSectionComponent,
    LQImgPlaceholderDirective
  ],
  imports: [
    BrowserModule.withServerTransition({appId:'MySampleProject'}),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes(),
      {
        enableTracing: !environment.production,
        // initialNavigation: 'enabled'
      }
    ),
    ScrollToModule.forRoot(),
    PageNotFoundModule,
    HttpClientJsonpModule,
    FormsModule
  ],
  providers: [ 
    BookCoursesService, 
    BlogPostsService, 
    WindowRefService,
    WordpressService,
    MailchimpService
    ],
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
