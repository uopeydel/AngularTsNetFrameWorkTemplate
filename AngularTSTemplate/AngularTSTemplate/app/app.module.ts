// ***# restart VSO if Cannot find Module
// << ---  Angular2  --->>>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, RequestOptions, XHRBackend  } from '@angular/http';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { LocalStorageModule ,LocalStorageService } from 'angular-2-local-storage';
import { CookieService } from 'angular2-cookie/services/cookies.service';


// <<< ---  Material 2  --- >>>
import '../node_modules/hammerjs/hammer.js';
import { MaterialModule } from '@angular/material';

// <<< ---  MAIN  --->>>
import { AppComponent } from './app.component';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppRoutes } from '../App/app.routes';
import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF } from '@angular/common';

import { authInterceptorService} from '../App/TESTauth';

// <<< ------- # Pipe # ------- >>>
import * as _pipe from '../App/Pipe/Global.pipe';

// <<< ------- Route PAGE ------- >>>
import { LoginComponent } from '../App/Login/Login.component';
import { TestPageComponent } from '../App/TestPage/TestPage.component';
import { PageNotFoundComponent } from '../App/PageNotFound/PageNotFound.component';

// <<< ------- Route PAGE ListManager------- >>>
import { AddNewORGComponent } from '../App/ListManager/AddNewORG/AddNewORG.component';


// <<< ------- Route PAGE ListManager------- >>> #POPUP
import { AddNewMemberComponent } from '../App/ListManager/AddNewORG/AddNewMember/AddNewMember.component';
import { AddOldMemberComponent } from '../App/ListManager/AddNewORG/AddOldMember/AddOldMember.component';


// <<< ------- Route PAGE ListManager------- >>> #Service
import { AddNewORGService } from '../App/ListManager/AddNewORG/AddNewORG.service';


const APP_PROVIDERS = [
    AddNewORGService
];

const AUTH_PROVIDERS = {
    provide: authInterceptorService,
    useFactory: (backend: XHRBackend, options: RequestOptions ) => {
        return new authInterceptorService(backend, options);
    },
    deps: [XHRBackend, RequestOptions]
};

@NgModule({
    imports: [
        RouterModule.forRoot(AppRoutes, { useHash: true, preloadingStrategy: PreloadAllModules }),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        JsonpModule,
        InfiniteScrollModule,
        LocalStorageModule.withConfig({ prefix: 'kj-app',  storageType: 'localStorage' }),
        //LocalStorageModule.withConfig({ storageType: 'localStorage' }),
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        // <<< ------- # Pipe # ------- >>>
        _pipe.GroupByPipe,
        _pipe.ReversePipe,

        // <<< ------- Route PAGE ------- >>>
        LoginComponent,
        TestPageComponent,
        PageNotFoundComponent,

        // <<< ------- Route PAGE ListManager------- >>>
        AddNewORGComponent,
     

        // <<< ------- Route PAGE ListManager------- >>> popup
        AddNewMemberComponent,
        AddOldMemberComponent,
       
    ],
    bootstrap: [
        AppComponent 
    ],
    providers: [  
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: APP_BASE_HREF, useValue: '!' },
        APP_PROVIDERS, // expose our Services and Providers into Angular's dependency injection 
        AUTH_PROVIDERS //
    ]
})
export class AppModule { }



