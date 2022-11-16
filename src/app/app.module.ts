import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserHubComponent } from './user-hub/user-hub.component';
import { UserCreateComponent } from './user-hub/user-create/user-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptorCredentialInterceptor} from "./interceptor-credential.interceptor";
import { UserLoginComponent } from './user-hub/user-login/user-login.component';
import { AdminHubComponent } from './admin-hub/admin-hub.component';
import { EmployeeCreateComponent } from './admin-hub/employee-create/employee-create.component';
import { EmployeeListComponent } from './admin-hub/employee-list/employee-list.component';
import { ArticleHubComponent } from './article-hub/article-hub.component';

@NgModule({
  declarations: [
    AppComponent,
    UserHubComponent,
    UserCreateComponent,
    UserLoginComponent,
    AdminHubComponent,
    EmployeeCreateComponent,
    EmployeeListComponent,
    ArticleHubComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [
    {
    provide : HTTP_INTERCEPTORS,
    useClass : InterceptorCredentialInterceptor,
    multi : true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
