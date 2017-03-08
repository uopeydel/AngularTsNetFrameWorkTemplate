// ***# restart VSO if Cannot find Module
// << ---  Angular2  --->>>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
// <<< ---  Material 2  --- >>>
import '../node_modules/hammerjs/hammer.js';
import { MaterialModule } from '@angular/material';

// <<< ---  MAIN  --->>>
import { AppComponent } from './app.component';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppRoutes } from '../app/app.routes';

// <<< ------- # Pipe # ------- >>>
import * as _pipe from '../app/Pipe/Global.pipe';

// <<< ------- Route PAGE ------- >>>
import { LoginComponent } from '../app/Login/Login.component';
import { TestPageComponent } from '../app/TestPage/TestPage.component';
import { PageNotFoundComponent } from '../app/PageNotFound/PageNotFound.component';

// <<< ------- Route PAGE ListManager------- >>>
import { AddNewORGComponent } from '../app/ListManager/AddNewORG/AddNewORG.component';


// <<< ------- Route PAGE ListManager------- >>> #POPUP
import { AddNewMemberComponent } from '../app/ListManager/AddNewORG/AddNewMember/AddNewMember.component';
import { AddOldMemberComponent } from '../app/ListManager/AddNewORG/AddOldMember/AddOldMember.component';


// <<< ------- Route PAGE ListManager------- >>> #Service
import { AddNewORGService } from '../app/ListManager/AddNewORG/AddNewORG.service';


const APP_PROVIDERS = [
    AddNewORGService
];

@NgModule({
    imports: [
        RouterModule.forRoot(AppRoutes, { useHash: true, preloadingStrategy: PreloadAllModules }),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        JsonpModule,
        InfiniteScrollModule,
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
    providers: [ // expose our Services and Providers into Angular's dependency injection 
        APP_PROVIDERS
    ]
})
export class AppModule { }



