import {Component, Input, OnInit} from '@angular/core';
import {DtoInputUser} from "../../user-hub/dtos/dto-input-user";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @Input() employees: DtoInputUser[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
