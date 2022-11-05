import { Component, OnInit } from '@angular/core';
import {DtoOutputCreateUser} from "../user-hub/dtos/dto-output-create-user";
import {AdminService} from "./admin.service";

@Component({
  selector: 'app-admin-hub',
  templateUrl: './admin-hub.component.html',
  styleUrls: ['./admin-hub.component.css']
})
export class AdminHubComponent implements OnInit {

  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
  }

  createEmployee(dto: DtoOutputCreateUser) {
    this._adminService.createEmployee(dto).subscribe()
  }
}
