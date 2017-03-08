import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//<<< ------- IMPORT Route PAGE ------- >>>
import { LoginComponent } from '../app/Login/Login.component';
import { TestPageComponent } from '../app/TestPage/TestPage.component';
import { PageNotFoundComponent } from '../app/PageNotFound/PageNotFound.component';


//<<< ------- IMPORT Route PAGE ListManager------- >>>
import { AddNewORGComponent } from '../app/ListManager/AddNewORG/AddNewORG.component';

//<<< ------- IMPORT Route PAGE ListManager------- >>> #POPUP
import { AddNewMemberComponent } from '../app/ListManager/AddNewORG/AddNewMember/AddNewMember.component';
import { AddOldMemberComponent } from '../app/ListManager/AddNewORG/AddOldMember/AddOldMember.component';

 
export const AppRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'testpage', component: TestPageComponent },
    { path: 'pagenotfound', component: PageNotFoundComponent },


    //<<< ------- Route PAGE ListManager------- >>> 
    { path: 'addneworg', component: AddNewORGComponent },
    
    //<<< ------- Route PAGE ListManager------- >>> #POPUP
    { path: '_addnewmember', component: AddNewMemberComponent },
    { path: '_addoldmember', component: AddOldMemberComponent },

    { path: '**', component: PageNotFoundComponent }

];

