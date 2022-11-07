import { Component, OnInit } from '@angular/core';
import {DtoOutputCreateUser} from "../user-hub/dtos/dto-output-create-user";
import {AdminService} from "./admin.service";
import {DtoInputUser} from "../user-hub/dtos/dto-input-user";

@Component({
  selector: 'app-admin-hub',
  templateUrl: './admin-hub.component.html',
  styleUrls: ['./admin-hub.component.css']
})
export class AdminHubComponent implements OnInit {
  LoginClick = false;
  RegisterClick = false;

  employees: DtoInputUser[] = []

  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchAllEmployees();
  }

  createEmployee(dto: DtoOutputCreateUser) {
    this._adminService
      .createEmployee(dto)
      .subscribe(employee=>this.employees.push(employee))
  }

  fetchAllEmployees(){
    this._adminService.fetchAllEmployees().subscribe(employees=> this.employees = employees)
  }

  clickLogin() {
    this.LoginClick = !this.LoginClick;

    if (this.LoginClick) {
      this.RegisterClick = false;
    }
  }

  clickRegister() {
    this.RegisterClick = !this.RegisterClick;

    if (this.RegisterClick) {
      this.LoginClick = false;
    }
  }
}
