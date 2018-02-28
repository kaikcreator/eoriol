import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { PageNotFoundInternalService, PageNotFoundService } from './page-not-found.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../app.routes';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(
            appRoutes('..'),
            {enableTracing: true}
          )
    ],
    declarations: [
        PageNotFoundComponent
    ],
    providers:[
        PageNotFoundInternalService,
        PageNotFoundService
    ],
    exports:[
        PageNotFoundComponent
    ]
})
export class PageNotFoundModule {}