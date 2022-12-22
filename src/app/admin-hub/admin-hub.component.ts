import {Component, OnInit} from '@angular/core';
import {DtoOutputCreateUser} from "../user-hub/dtos/dto-output-create-user";
import {AdminService} from "./admin.service";
import {DtoOutputDeleteEmployee} from "./dtos/dto-output-delete-employee";
import {LocalService} from "../local.service";
import {DtoOutputCreateArticle} from "../article-hub/dtos/dto-output-create-article";
import {DtoInputArticle} from "../dtos/dto-input-article";
import {DtoOutputDeleteArticle} from "./dtos/dto-output-delete-article";
import {DtoOutputUpdateArticle} from "../article-hub/dtos/dto-output-update-article";
import {DtoOutputEmployeeFilteringParameters} from "./dtos/dto-output-employee-filtering-parameters";
import {DtoOutputUpdateUser} from "../user-hub/dtos/dto-output-update-user";
import {DtoInputCompleteUser} from "../user-hub/dtos/dto-input-complete-user";
import {EmitEvent, EventBusService, Events} from "../event-bus.service";
import {DtoInputUser} from "../user-hub/dtos/dto-input-user";

@Component({
  selector: 'app-admin-hub',
  templateUrl: './admin-hub.component.html',
  styleUrls: ['./admin-hub.component.css']
})
export class AdminHubComponent implements OnInit {
  articlesInPage: DtoInputArticle[] = []
  employeesInPage: DtoInputCompleteUser[] = []
  nbOfPagesEmployee: number = 0;

  constructor(private _adminService: AdminService,
              private _localService: LocalService,
              private _eventBus: EventBusService) { }

  ngOnInit(): void {
    //employee events
    this._eventBus.on(Events.updateEmployeeList).subscribe((data: DtoOutputEmployeeFilteringParameters) => this.fetchEmployeePagination(data))
    this._eventBus.on(Events.deleteEmployee).subscribe((data: DtoInputUser) => this.deleteEmployee(data))
    this._eventBus.on(Events.createEmployee).subscribe((data: DtoOutputCreateUser) => this.createEmployee(data))
    this._eventBus.on(Events.employeeUpdate).subscribe((data: DtoOutputUpdateUser) => this.updateEmployee(data))

    //article events
    this._eventBus.on(Events.updateArticleList).subscribe((data: string) => this.fetchArticles(data))
    this._eventBus.on(Events.deleteArticle).subscribe((data: DtoInputArticle) => this.deleteArticle(data))
    this._eventBus.on(Events.createArticle).subscribe((data: DtoOutputCreateArticle) => this.createArticle(data))
    this._eventBus.on(Events.articleUpdate).subscribe((data: DtoOutputUpdateArticle) => this.updateArticle(data))

    //categorie events
    this._eventBus.on(Events.fetchCategories).subscribe(() => this.fetchAllCategories())

    //brand events
    this._eventBus.on(Events.fetchBrand).subscribe(() => this.fetchAllBrands())
  }

  fetchEmployeePagination(dto : DtoOutputEmployeeFilteringParameters){
    this._adminService
      .fetchEmployeePagination(dto)
      .subscribe(employees => {
        this.employeesInPage = employees.pageElements;
        this.nbOfPagesEmployee = employees.nbOfPages
        this._eventBus.emit(new EmitEvent(Events.fetchEmployeeInPages, {
          employees: this.employeesInPage, nbOfPages: this.nbOfPagesEmployee
        }))
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

  updateEmployee(dto: DtoOutputUpdateUser){
    this._adminService
      .updateEmployee(dto)
      .subscribe(employee=>
        this.employeesInPage.forEach((emp) => {
          if(emp.id == dto.id) {
            this.employeesInPage[this.employeesInPage.indexOf(emp)].surname = dto.surname;
            this.employeesInPage[this.employeesInPage.indexOf(emp)].lastname = dto.lastname;
            this.employeesInPage[this.employeesInPage.indexOf(emp)].birthdate = dto.birthdate;
            this.employeesInPage[this.employeesInPage.indexOf(emp)].permission = dto.permission;
          }
        }))
  }

  createArticle(dto: DtoOutputCreateArticle) {
    this._adminService
      .createArticle(dto)
      .subscribe(article=>this.articlesInPage.push(article))
  }

  fetchArticles(filter: string){
    if (filter == "") {
      this._adminService.fetchAllArticle().subscribe(listOfArticles=> {
        this.articlesInPage = listOfArticles
        this._eventBus.emit(new EmitEvent(Events.fetchArticle, {
          articles: listOfArticles
        }))
      })
    } else {
      this._adminService.fetchFilteredArticle(filter).subscribe(listOfArticles=> {
        this.articlesInPage = listOfArticles
        this._eventBus.emit(new EmitEvent(Events.fetchArticle, {
          articles: listOfArticles
        }))
      })
    }
  }

  fetchAllCategories(){
    this._adminService.fetchAllCategories().subscribe(listOfCategories=> {
      this._eventBus.emit(new EmitEvent(Events.emitFetchCategories, {
        categories: listOfCategories
      }))
    })
  }

  fetchAllBrands(){
    this._adminService.fetchAllBrands().subscribe(listOfBrands=> {
      this._eventBus.emit(new EmitEvent(Events.emitfetchBranch, {
        brands: listOfBrands
      }))
    })
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
                  this.articlesInPage[this.articlesInPage.indexOf(art)] = {
                    nametag : dto.nametag,
                    price : dto.price,
                    pricingType : dto.pricingType,
                    stock : dto.stock,
                    id : dto.id,
                    brand : dto.brand,
                    category : dto.category,
                    imagePath : dto.imagePath
                  };
              }
          }))
  }
}
