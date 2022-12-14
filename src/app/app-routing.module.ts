import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminHubComponent} from "./admin-hub/admin-hub.component";
import {EmployeeListComponent} from "./admin-hub/employee-list/employee-list.component";
import {EmployeeCreateComponent} from "./admin-hub/employee-create/employee-create.component";
import {AdminUpdateEmployeeComponent} from "./admin-hub/admin-update-employee/admin-update-employee.component";
import {AdminListArticleComponent} from "./admin-hub/admin-list-article/admin-list-article.component";
import {ArticleCreateComponent} from "./admin-hub/article-create/article-create.component";
import {AdminUpdateArticleComponent} from "./admin-hub/admin-update-article/admin-update-article.component";
import {OrderHubComponent} from "./order-hub/order-hub.component";
import {OrderFilteredListComponent} from "./order-hub/order-filtered-list/order-filtered-list.component";
import {OrderListDateComponent} from "./order-hub/order-list-date/order-list-date.component";
import {OrderListCategoryComponent} from "./order-hub/order-list-category/order-list-category.component";
import {OrderListUserComponent} from "./order-hub/order-list-user/order-list-user.component";
import {UserCreateOrderComponent} from "./user-hub/user-create-order/user-create-order.component";
import {ArticleHubComponent} from "./article-hub/article-hub.component";

const routes: Routes =[
  {path: "", component: ArticleHubComponent},
  {path: "admin", component: AdminHubComponent, children: [
      {path: "employeeList", component: EmployeeListComponent},
      {path: "employeeCreate", component: EmployeeCreateComponent},
      {path: "employeeUpdate", component: AdminUpdateEmployeeComponent},
      {path: "articleList", component:AdminListArticleComponent},
      {path: "articleCreate", component: ArticleCreateComponent},
      {path: "articleUpdate", component: AdminUpdateArticleComponent}
    ]},
  {path: "order", component: OrderHubComponent, children: [
      {path: "orderFiltered", component: OrderFilteredListComponent},
      {path: "orderDate", component: OrderListDateComponent},
      {path: "orderCategory", component: OrderListCategoryComponent},
      {path: "orderUser", component: OrderListUserComponent},
    ]},
  {path:"user-create-order",component:UserCreateOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
