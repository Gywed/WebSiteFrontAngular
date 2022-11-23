import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DtoOutputCreateUser} from "../user-hub/dtos/dto-output-create-user";
import {Observable} from "rxjs";
import {DtoInputUser} from "../user-hub/dtos/dto-input-user";
import {DtoOutputDeleteEmployee} from "./dtos/dto-output-delete-employee";
import {DtoOutputPaginationParameters} from "../dtos/dto-output-pagination-parameters";
import {DtoOutputCreateArticle} from "../article-hub/dtos/dto-output-create-article";
import {DtoInputArticle} from "../order-hub/dtos/dto-input-article";
import {DtoInputPaginationFiltering} from "../dtos/dto-input-pagination-filtering";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private static readonly ENTRY_POINT = environment.apiUrl + "/users";

  constructor(private _httpClient: HttpClient) { }

  createArticle(dto: DtoOutputCreateArticle): Observable<DtoInputArticle>{
    return this._httpClient.post<DtoInputArticle>(AdminService.ENTRY_POINT + "/articles", dto)
  }

  createEmployee(dto: DtoOutputCreateUser): Observable<DtoInputUser>{
    return this._httpClient.post<DtoInputUser>(AdminService.ENTRY_POINT + "/employee", dto)
  }

  fetchEmployeePagination(dto: DtoOutputPaginationParameters): Observable<DtoInputPaginationFiltering<DtoInputUser>>{
    return this._httpClient.get<DtoInputPaginationFiltering<DtoInputUser>>(
      `${AdminService.ENTRY_POINT}/employee?nbPage=${dto.nbPage}&nbElementsByPage=${dto.nbElementsByPage}`)
  }

  deleteEmployee(dto: DtoOutputDeleteEmployee): Observable<any>{
    return this._httpClient.request<any>('delete', AdminService.ENTRY_POINT, {body: dto})
  }
}
