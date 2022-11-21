import { Component, OnInit } from '@angular/core';
import {DtoOutputCreateUser} from "../user-hub/dtos/dto-output-create-user";
import {AdminService} from "./admin.service";
import {DtoInputUser} from "../user-hub/dtos/dto-input-user";
import {DtoOutputDeleteEmployee} from "./dtos/dto-output-delete-employee";
import {DtoOutputPaginationParameters} from "../dtos/dto-output-pagination-parameters";
import {LocalService} from "../local.service";

@Component({
  selector: 'app-admin-hub',
  templateUrl: './admin-hub.component.html',
  styleUrls: ['./admin-hub.component.css']
})
export class AdminHubComponent implements OnInit {
  listClick = false;
  addClick = false;

  employees: DtoInputUser[] = []

  constructor(private _adminService: AdminService, private _localService: LocalService) { }

  ngOnInit(): void {
    this.fetchEmployeePagination({
      nbPage: +(this._localService.getData("nbPage")??1),
      nbElementsByPage: +(this._localService.getData("nbEmployeesByPage")??10)
    })
  }

  clickList() {
    this.resetDisplay();
    this.listClick = true;
  }

  clickAdd() {
    this.resetDisplay();
    this.addClick = true;
  }

  resetDisplay() {
    this.addClick = false;
    this.listClick = false;
  }

  fetchEmployeePagination(dto : DtoOutputPaginationParameters){
    this._adminService
      .fetchEmployeePagination(dto)
      .subscribe(employees => this.employees = employees)
  }

  createEmployee(dto: DtoOutputCreateUser) {
    this._adminService
      .createEmployee(dto)
      .subscribe(employee=>this.employees.push(employee))
  }

  deleteEmployee(dto: DtoOutputDeleteEmployee){
    let employee = this.employees.filter(e=> e.id==dto.id)
    let index = this.employees.indexOf(employee[0])
    this._adminService
      .deleteEmployee(dto)
      .subscribe(()=>this.employees.splice(index, 1))
  }
}
