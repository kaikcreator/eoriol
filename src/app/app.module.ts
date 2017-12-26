import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeWhiteSectionComponent } from './home-white-section/home-white-section.component';
import { HomeBlackSectionComponent } from './home-black-section/home-black-section.component';
import { BookCoursesService } from './services/book-courses.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    HomeWhiteSectionComponent,
    HomeBlackSectionComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId:'MySampleProject'}),
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [ BookCoursesService],
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
