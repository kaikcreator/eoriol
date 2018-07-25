import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { Angulartics2Module} from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';

import { PageNotFoundModule } from './page-not-found/page-not-found.module';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { BookCoursesService } from './services/book-courses.service';
import { BookCardComponent } from './book-card/book-card.component';
import { BlogPostsService } from './services/blog-posts.service';
import { ContactComponent } from './contact/contact.component';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { WindowRefService } from './services/globals.service';
import { MenuMobileComponent } from './menu-mobile/menu-mobile.component';
import { HeaderComponent } from './header/header.component';
import { SocialIconsBarComponent } from './social-icons-bar/social-icons-bar.component';
import { SubscribeCtaComponent } from './subscribe-cta/subscribe-cta.component';
import { WordpressService } from './services/wordpress.service';
import { MailchimpService } from './services/mailchimp.service';
import { ActionButtonComponent } from './action-button/action-button.component';
import { environment } from '../environments/environment';
import { SubscribeSectionComponent } from './subscribe-section/subscribe-section.component';
import { LQImgPlaceholderDirective } from './directives/lqimg-placeholder.directive';
import { UniversalInterceptor } from './interceptors/universal-interceptor.service';
import { WindowScrollService } from './services/window-scroll.service';
import { ReviewComponent } from './review/review.component';
import { ReviewRatingComponent } from './review-rating/review-rating.component';
import { UiCommonModule } from './ui-common/ui-common.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookCardComponent,
    ContactComponent,
    HamburgerMenuComponent,
    MenuMobileComponent,
    HeaderComponent,
    SocialIconsBarComponent,
    SubscribeCtaComponent,
    ActionButtonComponent,
    SubscribeSectionComponent,
    LQImgPlaceholderDirective,
    ReviewComponent,
    ReviewRatingComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId:'EoriolFront'}),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserTransferStateModule,
    RouterModule.forRoot(
      appRoutes(),
      {
        enableTracing: !environment.production,
        //initialNavigation: 'enabled'
      }
    ),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    ScrollToModule.forRoot(),
    PageNotFoundModule,
    HttpClientJsonpModule,
    FormsModule,
    UiCommonModule,
    NgxJsonLdModule
  ],
  providers: [ 
    BookCoursesService, 
    BlogPostsService, 
    WindowRefService,
    WordpressService,
    MailchimpService,
    WindowScrollService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      multi: true,
}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ){
    //const platform = isPlatformBrowser(this.platformId) ? 'browser' : 'server';
  }
 }
