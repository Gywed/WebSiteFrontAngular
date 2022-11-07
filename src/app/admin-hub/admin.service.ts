import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DtoOutputCreateUser} from "../user-hub/dtos/dto-output-create-user";
import {Observable} from "rxjs";
import {DtoInputUser} from "../user-hub/dtos/dto-input-user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private static readonly ENTRY_POINT = environment.apiUrl + "/users";

  constructor(private _httpClient: HttpClient) { }

  createEmployee(dto: DtoOutputCreateUser): Observable<DtoInputUser>{
    return this._httpClient.post<DtoInputUser>(AdminService.ENTRY_POINT + "/employee", dto)
  }

  fetchAllEmployees():Observable<DtoInputUser[]>{
    return this._httpClient.get<DtoInputUser[]>(AdminService.ENTRY_POINT+ "/employee")
  }
}