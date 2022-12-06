import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputUser} from "../../user-hub/dtos/dto-input-user";
import {DtoOutputDeleteEmployee} from "../dtos/dto-output-delete-employee";
import {LocalService} from "../../local.service";
import {DtoOutputPaginationParameters} from "../../dtos/dto-output-pagination-parameters";
import {DtoOutputFilterEmployee} from "../dtos/dto-output-filter-employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @Input() employeesInPage: DtoInputUser[] = []
  @Input() nbOfPages: number = 0;
  nbPage: number = +(this._localService.getData("nbPage")??1)
  nbElementsByPage: number = +(this._localService.getData("nbEmployeesByPage")??10)

  @Output()
  deletedEmployee: EventEmitter<DtoOutputDeleteEmployee> = new EventEmitter<DtoOutputDeleteEmployee>()
  @Output() paginationChanged: EventEmitter<DtoOutputPaginationParameters> = new EventEmitter<DtoOutputPaginationParameters>()

  @Output()
  filteredEmployee: EventEmitter<DtoOutputFilterEmployee> = new EventEmitter<DtoOutputFilterEmployee>()

  // Flag for search
  searchingByName = false;

  surnameToSearch: string = "";
  lastnameToSearch: string = "";

  constructor(private _localService : LocalService) { }

  ngOnInit(): void {
  }

  emitDelete(employee: DtoInputUser) {
    this.deletedEmployee.next({
      id: employee.id
    })

  }

  emitPaginationChanged() {
    this.paginationChanged.next({
      nbPage: this.nbPage,
      nbElementsByPage: this.nbElementsByPage
    })
    this._localService.saveData("nbPage", this.nbPage.toString())
    this._localService.saveData("nbEmployeesByPage", this.nbElementsByPage.toString())
  }

  createPageNumberRange(){
    // return new Array(number);
    return new Array(this.nbOfPages).fill(0)
      .map((n, index) => index + 1);
  }

  emitFilter() {
    this.searchingByName = this.surnameToSearch != "" || this.lastnameToSearch != "";

    if (this.searchingByName) {
      this.filteredEmployee.next({
        nbPage: this.nbPage,
        nbElementsByPage: this.nbElementsByPage,
        surname: this.surnameToSearch,
        lastname: this.lastnameToSearch
      })
    } else {
      this.paginationChanged.next( {
        nbPage: this.nbPage,
        nbElementsByPage: this.nbElementsByPage
      })
    }
    this._localService.saveData("nbPage", this.nbPage.toString())
    this._localService.saveData("nbEmployeesByPage", this.nbElementsByPage.toString())
  }
}
