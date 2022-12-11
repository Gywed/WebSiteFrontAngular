import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputUser} from "../../user-hub/dtos/dto-input-user";
import {DtoOutputDeleteEmployee} from "../dtos/dto-output-delete-employee";
import {LocalService} from "../../local.service";
import {DtoOutputEmployeeFilteringParameters} from "../dtos/dto-output-employee-filtering-parameters";
import {DtoInputCompleteUser} from "../../user-hub/dtos/dto-input-complete-user";
import {DtoOutputUpdateUser} from "../../user-hub/dtos/dto-output-update-user";
import {debounceTime, Subject} from "rxjs";
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";

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
  searchNotifier = new Subject()

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

  constructor(private _localService : LocalService,
              private _eventBus: EventBusService) { }

  ngOnInit(): void {
    this.searchNotifier
      .pipe(debounceTime(1000))
      .subscribe(data=>this.emitPaginationChanged())

    this._eventBus.on(Events.fetchEmployeeInPages).subscribe((data: any) => {
      this.employeesInPage = data.employees
      this.nbOfPages = data.nbOfPages
    })
    this.emitPaginationChanged()
  }

  clickUpdateEmployee(employee: DtoInputCompleteUser) {
    this._eventBus.emit(new EmitEvent(Events.emitEmployee, employee))
  }

  clickBackToList() {
    this.updateEmployeeClick = false;
  }

  emitDelete(employee: DtoInputCompleteUser) {
    this._eventBus.emit(new EmitEvent(Events.deleteEmployee, employee))

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

    this._eventBus.emit(new EmitEvent(Events.updateEmployeeList, {
      surname: this.surname,
      lastname: this.lastname,
      dtoPagination:{
        nbPage: this.nbPage,
        nbElementsByPage: this.nbElementsByPage
      }
    }))

    this._localService.saveData("nbPage", this.nbPage.toString())
    this._localService.saveData("nbEmployeesByPage", this.nbElementsByPage.toString())
  }

  createPageNumberRange(){
    // return new Array(number);
    return new Array(this.nbOfPages).fill(0)
      .map((n, index) => index + 1);
  }

}
