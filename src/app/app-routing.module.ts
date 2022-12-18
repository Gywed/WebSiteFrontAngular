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
import {CanActivateAdminGuard} from "./can-activate-admin.guard";
import {OrderListTodayComponent} from "./order-hub/order-list-today/order-list-today.component";
import {CanActivateClientGuard} from "./can-activate-client.guard";
import {CanActivateEmployeeGuard} from "./can-activate-employee.guard";
import {UserOrderHistoryComponent} from "./user-hub/user-order-history/user-order-history.component";

const routes: Routes =[
  {path: "", component: ArticleHubComponent},
  {path: "admin", component: AdminHubComponent, children: [
      {path: "employeeList", component: EmployeeListComponent},
      {path: "employeeCreate", component: EmployeeCreateComponent},
      {path: "employeeUpdate", component: AdminUpdateEmployeeComponent},
      {path: "articleList", component:AdminListArticleComponent},
      {path: "articleCreate", component: ArticleCreateComponent},
      {path: "articleUpdate", component: AdminUpdateArticleComponent}
    ]/*,canActivate:[CanActivateAdminGuard],canActivateChild:[CanActivateAdminGuard]*/},
  {path: "order", component: OrderHubComponent, children: [
      {path: "orderFiltered", component: OrderFilteredListComponent/*,canActivate:[CanActivateEmployeeGuard]*/},
      {path: "orderDate", component: OrderListDateComponent/*,canActivate:[CanActivateEmployeeGuard]*/},
      {path: "orderCategory", component: OrderListCategoryComponent/*,canActivate:[CanActivateEmployeeGuard]*/},
      {path: "orderUser", component: OrderListUserComponent/*,canActivate:[CanActivateClientGuard]*/},
      {path: "orderToday", component: OrderListTodayComponent/*,canActivate:[CanActivateEmployeeGuard]*/},
    ]},
  {path:"user-create-order",component:UserCreateOrderComponent},
  {path:"user-order-history",component:UserOrderHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
