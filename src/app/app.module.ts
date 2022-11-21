import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserHubComponent } from './user-hub/user-hub.component';
import { UserCreateComponent } from './user-hub/user-create/user-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptorCredentialInterceptor} from "./interceptor-credential.interceptor";
import { UserLoginComponent } from './user-hub/user-login/user-login.component';
import { AdminHubComponent } from './admin-hub/admin-hub.component';
import { EmployeeCreateComponent } from './admin-hub/employee-create/employee-create.component';
import { EmployeeListComponent } from './admin-hub/employee-list/employee-list.component';
import { ArticleHubComponent } from './article-hub/article-hub.component';
import { ArticleListComponent } from './article-hub/article-list/article-list.component';
import { OrderHubComponent } from './order-hub/order-hub.component';
import { OrderListDateComponent } from './order-hub/order-list-date/order-list-date.component';
import { BannerHubComponent } from './banner-hub/banner-hub.component';
import { OrderFilteredListComponent } from './order-hub/order-filtered-list/order-filtered-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserHubComponent,
    UserCreateComponent,
    UserLoginComponent,
    AdminHubComponent,
    EmployeeCreateComponent,
    EmployeeListComponent,
    ArticleHubComponent,
    ArticleListComponent,
    OrderHubComponent,
    OrderListDateComponent,
    BannerHubComponent,
    OrderFilteredListComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule
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
