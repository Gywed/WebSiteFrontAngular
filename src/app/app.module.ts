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
import { MenubarHubComponent } from './menubar-hub/menubar-hub.component';
import { ArticleCreateComponent } from './admin-hub/article-create/article-create.component';
import { AdminListArticleComponent } from './admin-hub/admin-list-article/admin-list-article.component';
import { AdminUpdateArticleComponent } from './admin-hub/admin-update-article/admin-update-article.component';
import { CategoryHubComponent } from './menubar-hub/category-hub/category-hub.component';
import { AdminUpdateEmployeeComponent } from './admin-hub/admin-update-employee/admin-update-employee.component';
import { OrderListCategoryComponent } from './order-hub/order-list-category/order-list-category.component';
import { ShoppingCartHubComponent } from './menubar-hub/shopping-cart-hub/shopping-cart-hub.component';
import {AppRoutingModule} from "./app-routing.module";
import { OrderListUserComponent } from './order-hub/order-list-user/order-list-user.component';
import { UserCreateOrderComponent } from './user-hub/user-create-order/user-create-order.component';
import { FamilyHubComponent } from './family-hub/family-hub.component';
import { FamiliesListComponent } from './family-hub/families-list/families-list.component';
import { OrderListTodayComponent } from './order-hub/order-list-today/order-list-today.component';
import { ArticleListOfFamiliesComponent } from './family-hub/article-list-of-families/article-list-of-families.component';

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
    OrderFilteredListComponent,
    MenubarHubComponent,
    ArticleCreateComponent,
    AdminListArticleComponent,
    AdminUpdateArticleComponent,
    AdminUpdateEmployeeComponent,
    AdminUpdateArticleComponent,
    CategoryHubComponent,
    OrderListCategoryComponent,
    ShoppingCartHubComponent,
    OrderListUserComponent,
    UserCreateOrderComponent,
    FamilyHubComponent,
    FamiliesListComponent,
    OrderListTodayComponent,
    ArticleListOfFamiliesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
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
