import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputUser} from "../../user-hub/dtos/dto-input-user";
import {DtoOutputDeleteEmployee} from "../dtos/dto-output-delete-employee";
import {LocalService} from "../../local.service";
import {DtoOutputEmployeeFilteringParameters} from "../dtos/dto-output-employee-filtering-parameters";
import {DtoInputCompleteUser} from "../../user-hub/dtos/dto-input-complete-user";
import {DtoOutputUpdateUser} from "../../user-hub/dtos/dto-output-update-user";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @Input() employeesInPage: DtoInputCompleteUser[] = []
  @Input() nbOfPages: number = 0;
  nbPage: number = +(this._localService.getData("nbPage")??1)
  nbElementsByPage: number = +(this._localService.getData("nbEmployeesByPage")??10)
  surname: string = ""
  lastname: string = ""

  @Output()
  deletedEmployee: EventEmitter<DtoOutputDeleteEmployee> = new EventEmitter<DtoOutputDeleteEmployee>()
  @Output() paginationChanged: EventEmitter<DtoOutputEmployeeFilteringParameters> =
    new EventEmitter<DtoOutputEmployeeFilteringParameters>()

  // Flag for modyfing employee
  @Input() updateEmployeeClick = false;
  @Output() updateEmployeeClickChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  updatedEmployee: EventEmitter<DtoOutputUpdateUser> = new EventEmitter<DtoOutputUpdateUser>()

  idToUpdate: number = 0;
  surnameToUpdate: string = "";
  lastnameToUpdate: string = "";
  ageToUpdate: number = 0;
  permissionToUpdate: number = 0;

  searchingByName: boolean = false;

  constructor(private _localService : LocalService) { }

  ngOnInit(): void {
  }

  clickUpdateEmployee(user: DtoInputCompleteUser) {
    this.idToUpdate = user.id;
    this.surnameToUpdate = user.surname;
    this.lastnameToUpdate = user.lastname;
    this.ageToUpdate = user.age;
    this.permissionToUpdate = user.permission;
    this.updateEmployeeClick = true;
    this.updateEmployeeClickChange.next(this.updateEmployeeClick);
  }

  clickBackToList() {
    this.updateEmployeeClick = false;
  }

  emitDelete(employee: DtoInputUser) {
    this.deletedEmployee.next({
      id: employee.id
    })

  }

  emitUpdate(employee: DtoOutputUpdateUser) {
    this.updatedEmployee.next( {
      id: employee.id,
      surname : employee.surname,
      lastname : employee.lastname,
      age : employee.age,
      permission : employee.permission
    })
  }

  emitPaginationChanged() {
    this.searchingByName = this.surname!="" || this.lastname!=""

    this.paginationChanged.next({
      surname: this.surname,
      lastname: this.lastname,
      dtoPagination:{
        nbPage: this.nbPage,
        nbElementsByPage: this.nbElementsByPage
      }
    })
    this._localService.saveData("nbPage", this.nbPage.toString())
    this._localService.saveData("nbEmployeesByPage", this.nbElementsByPage.toString())
  }

  createPageNumberRange(){
    // return new Array(number);
    return new Array(this.nbOfPages).fill(0)
      .map((n, index) => index + 1);
  }

}
