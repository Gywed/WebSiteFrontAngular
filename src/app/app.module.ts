import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserHubComponent } from './user-hub/user-hub.component';
import { UserCreateComponent } from './user-hub/user-create/user-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptorCredentialInterceptor} from "./interceptor-credential.interceptor";
import { UserLoginComponent } from './user-hub/user-login/user-login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserHubComponent,
    UserCreateComponent,
    UserLoginComponent
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
