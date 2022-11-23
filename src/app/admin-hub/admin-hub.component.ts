import { Component, OnInit } from '@angular/core';
import {DtoOutputCreateUser} from "../user-hub/dtos/dto-output-create-user";
import {AdminService} from "./admin.service";
import {DtoInputUser} from "../user-hub/dtos/dto-input-user";
import {DtoOutputDeleteEmployee} from "./dtos/dto-output-delete-employee";
import {DtoOutputPaginationParameters} from "../dtos/dto-output-pagination-parameters";
import {LocalService} from "../local.service";
import {DtoOutputCreateArticle} from "../article-hub/dtos/dto-output-create-article";
import {DtoInputArticle} from "../order-hub/dtos/dto-input-article";

@Component({
  selector: 'app-admin-hub',
  templateUrl: './admin-hub.component.html',
  styleUrls: ['./admin-hub.component.css']
})
export class AdminHubComponent implements OnInit {
  listEmpClick = false;
  addEmpClick = false;
  addArtClick = false;

  articles: DtoInputArticle[] = []
  employeesInPage: DtoInputUser[] = []
  nbOfPagesEmployee: number = 0;

  constructor(private _adminService: AdminService, private _localService: LocalService) { }

  ngOnInit(): void {
    this.fetchEmployeePagination({
      nbPage: +(this._localService.getData("nbPage")??1),
      nbElementsByPage: +(this._localService.getData("nbEmployeesByPage")??10)
    })
  }

  clickListEmp() {
    this.resetDisplay();
    this.listEmpClick = true;
  }

  clickAddEmp() {
    this.resetDisplay();
    this.addEmpClick = true;
  }

  clickAddArt() {
    this.resetDisplay();
    this.addArtClick = true;
  }

  resetDisplay() {
    this.addEmpClick = false;
    this.listEmpClick = false;
    this.addArtClick = false;
  }

  fetchEmployeePagination(dto : DtoOutputPaginationParameters){
    this._adminService
      .fetchEmployeePagination(dto)
      .subscribe(employees => {
        this.employeesInPage = employees.pageElements;
        this.nbOfPagesEmployee = employees.nbOfPages
      })
  }

  createEmployee(dto: DtoOutputCreateUser) {
    this._adminService
      .createEmployee(dto)
      .subscribe(employee=>this.employeesInPage.push(employee))
  }

  createArticle(dto: DtoOutputCreateArticle) {
    this._adminService
      .createArticle(dto)
      .subscribe(article=>this.articles.push(article))
  }

  deleteEmployee(dto: DtoOutputDeleteEmployee){
    let employee = this.employeesInPage.filter(e=> e.id==dto.id)
    let index = this.employeesInPage.indexOf(employee[0])
    this._adminService
      .deleteEmployee(dto)
      .subscribe(()=>this.employeesInPage.splice(index, 1))
  }
}
