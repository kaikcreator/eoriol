import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';




export function appRoutes(relPath='.'): Routes{
  return [
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
    { path: 'subscribe', loadChildren: `${relPath}/subscribe-mobile/subscribe-mobile.module#SubscribeMobileModule` },
    { path: 'blog', loadChildren: `${relPath}/blog/blog.module#BlogModule` },
    { path: '**', component: PageNotFoundComponent },
  ];
}