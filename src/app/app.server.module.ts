import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
 
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { Routes, RouterModule, Router } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';

const routes: Routes = [ { path: 'shell', component: AppShellComponent }, ...appRoutes()];
 
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    // Add universal-only providers here
  ],
  bootstrap: [ AppComponent ],
  declarations: [AppShellComponent],
})
export class AppServerModule {
  constructor(private router:Router){
    this.router.resetConfig(routes);
  }
}