import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminHubComponent} from "./admin-hub/admin-hub.component";
import {EmployeeListComponent} from "./admin-hub/employee-list/employee-list.component";
import {EmployeeCreateComponent} from "./admin-hub/employee-create/employee-create.component";
import {AdminUpdateEmployeeComponent} from "./admin-hub/admin-update-employee/admin-update-employee.component";
import {AdminListArticleComponent} from "./admin-hub/admin-list-article/admin-list-article.component";
import {ArticleCreateComponent} from "./admin-hub/article-create/article-create.component";
import {AdminUpdateArticleComponent} from "./admin-hub/admin-update-article/admin-update-article.component";

const routes: Routes =[
  {path: "admin", component: AdminHubComponent, children: [
      {path: "employeeList", component: EmployeeListComponent},
      {path: "employeeCreate", component: EmployeeCreateComponent},
      {path: "employeeUpdate", component: AdminUpdateEmployeeComponent},
      {path: "articleList", component:AdminListArticleComponent},
      {path: "articleCreate", component: ArticleCreateComponent},
      {path: "articleUpdate", component: AdminUpdateArticleComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
