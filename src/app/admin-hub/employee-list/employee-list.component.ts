import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputUser} from "../../user-hub/dtos/dto-input-user";
import {DtoOutputDeleteEmployee} from "../dtos/dto-output-delete-employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @Input() employees: DtoInputUser[] = []

  @Output()
  deletedEmployee: EventEmitter<DtoOutputDeleteEmployee> = new EventEmitter<DtoOutputDeleteEmployee>()

  constructor() { }

  ngOnInit(): void {
  }

  emitDelete(employee: DtoInputUser) {
    this.deletedEmployee.next({
      id: employee.id
    })

  }
}
