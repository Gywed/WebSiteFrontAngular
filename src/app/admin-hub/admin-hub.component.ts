import { Component, OnInit } from '@angular/core';
import {DtoOutputCreateUser} from "../user-hub/dtos/dto-output-create-user";
import {AdminService} from "./admin.service";
import {DtoInputUser} from "../user-hub/dtos/dto-input-user";
import {DtoOutputDeleteEmployee} from "./dtos/dto-output-delete-employee";
import {DtoOutputPaginationParameters} from "../dtos/dto-output-pagination-parameters";
import {LocalService} from "../local.service";
import {DtoOutputCreateArticle} from "../article-hub/dtos/dto-output-create-article";
import {DtoInputArticle} from "../article-hub/dtos/dto-input-article";
import {DtoOutputDeleteArticle} from "./dtos/dto-output-delete-article";
import {DtoOutputUpdateArticle} from "../article-hub/dtos/dto-output-update-article";
import {DtoOutputFilterArticle} from "./dtos/dto-output-filter-article";
import {DtoOutputFilterEmployee} from "./dtos/dto-output-filter-employee";

@Component({
  selector: 'app-admin-hub',
  templateUrl: './admin-hub.component.html',
  styleUrls: ['./admin-hub.component.css']
})
export class AdminHubComponent implements OnInit {
  // Flags for first banner
  artClick = false;
  empClick = false;

  // Flags for second banner
  listEmpClick = false;
  addEmpClick = false;
  addArtClick = false;
  listArtClick = false;

  // Flags of windows
  updateClick = false;

  articlesInPage: DtoInputArticle[] = []
  employeesInPage: DtoInputUser[] = []
  nbOfPagesEmployee: number = 0;

  constructor(private _adminService: AdminService, private _localService: LocalService) { }

  ngOnInit(): void {
    this.fetchEmployeePagination({
      nbPage: +(this._localService.getData("nbPage")??1),
      nbElementsByPage: +(this._localService.getData("nbEmployeesByPage")??10)
    })
    this.fetchAllArticles()
  }

  clickArt() {
    this.resetBanner();
    this.artClick = true;
  }

  clickEmp() {
    this.resetBanner();
    this.empClick = true;
  }

  clickListEmp() {
    this.resetWindow();
    this.listEmpClick = true;
  }

  clickAddEmp() {
    this.resetWindow();
    this.addEmpClick = true;
  }

  clickAddArt() {
    this.resetWindow();
    this.addArtClick = true;
  }

  clickListArt() {
    this.resetWindow();
    this.listArtClick = true;
  }

  resetWindow() {
    this.addEmpClick = false;
    this.listEmpClick = false;
    this.addArtClick = false;
    this.listArtClick = false;
    this.updateClick = false;
  }

  resetBanner() {
    this.resetWindow();
    this.artClick = false;
    this.empClick = false;
  }

  fetchEmployeePagination(dto : DtoOutputPaginationParameters){
    this._adminService
      .fetchEmployeePagination(dto)
      .subscribe(employees => {
        this.employeesInPage = employees.pageElements;
        this.nbOfPagesEmployee = employees.nbOfPages
      })
  }

  fetchEmployeeByNamePagination(dto : DtoOutputFilterEmployee){
    this._adminService
      .fetchEmployeeByNamePagination(dto)
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

  deleteEmployee(dto: DtoOutputDeleteEmployee){
    let employee = this.employeesInPage.filter(e=> e.id==dto.id)
    let index = this.employeesInPage.indexOf(employee[0])
    this._adminService
      .deleteEmployee(dto)
      .subscribe(()=>this.employeesInPage.splice(index, 1))
  }

  createArticle(dto: DtoOutputCreateArticle) {
    this._adminService
      .createArticle(dto)
      .subscribe(article=>this.articlesInPage.push(article))
  }

  fetchAllArticles(){
    this._adminService.fetchAllArticle().subscribe(articlesInPage=> this.articlesInPage = articlesInPage)
  }

  fetchFilteredArticles(dto: DtoOutputFilterArticle){
    this._adminService.fetchFilteredArticle(dto).subscribe(articlesInPage=> this.articlesInPage = articlesInPage)
  }

  deleteArticle(dto: DtoOutputDeleteArticle){
    let article = this.articlesInPage.filter(e=> e.id==dto.id)
    let index = this.articlesInPage.indexOf(article[0])
    this._adminService
      .deleteArticle(dto)
      .subscribe(()=>this.articlesInPage.splice(index, 1))
  }

  updateArticle(dto: DtoOutputUpdateArticle){
    this._adminService
      .updateArticle(dto)
      .subscribe(article=>
          this.articlesInPage.forEach((art) => {
              if(art.id == dto.id) {
                  this.articlesInPage[this.articlesInPage.indexOf(art)] = dto;
              }
          }))
  }
}
