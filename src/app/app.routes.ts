import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';




export const appRoutes: Routes = [
    // { path: 'post/:id',      component: PostComponent },
    {
      path: 'home',
      component: HomeComponent,
      data: { title: 'Enrique Oriol' }
    },
    { path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    { path: 'subscribe', loadChildren: './subscribe-mobile/subscribe-mobile.module#SubscribeMobileModule' },
    { path: '**', component: PageNotFoundComponent },
  ];