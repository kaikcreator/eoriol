import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeMobileComponent } from './subscribe-mobile.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: SubscribeMobileComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [SubscribeMobileComponent]
})
export class SubscribeMobileModule { }
