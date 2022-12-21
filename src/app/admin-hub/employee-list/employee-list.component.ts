import {Component, OnInit} from '@angular/core';
import {LocalService} from "../../local.service";
import {DtoInputCompleteUser} from "../../user-hub/dtos/dto-input-complete-user";
import {debounceTime, Subject} from "rxjs";
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeesInPage: DtoInputCompleteUser[] = []
  nbOfPages: number = 0;
  nbPage: number = +(this._localService.getData("nbPage")??1)
  nbElementsByPage: number = +(this._localService.getData("nbEmployeesByPage")??10)
  surname: string = ""
  lastname: string = ""
  searchNotifier = new Subject()

  // Flag for modyfing employee
  updateEmployeeClick = false;

  searchingByName: boolean = false;

  constructor(private _localService : LocalService,
              private _eventBus: EventBusService) { }

  ngOnInit(): void {
    this.searchNotifier
      .pipe(debounceTime(100))
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

  emitDelete(employee: DtoInputCompleteUser) {
    this._eventBus.emit(new EmitEvent(Events.deleteEmployee, employee))
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

  getAge(birthdate: string) {
    let bDate = new Date(birthdate)
    return Math.floor((Math.abs(Date.now() - bDate.getTime()) / (1000 * 3600 * 24))/365.25);
  }
}
