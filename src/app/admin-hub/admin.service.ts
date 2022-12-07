import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DtoOutputCreateUser} from "../user-hub/dtos/dto-output-create-user";
import {Observable} from "rxjs";
import {DtoInputUser} from "../user-hub/dtos/dto-input-user";
import {DtoOutputDeleteEmployee} from "./dtos/dto-output-delete-employee";
import {DtoOutputPaginationParameters} from "../dtos/dto-output-pagination-parameters";
import {DtoOutputCreateArticle} from "../article-hub/dtos/dto-output-create-article";
import {DtoInputPaginationFiltering} from "../dtos/dto-input-pagination-filtering";
import {DtoInputArticle} from "../article-hub/dtos/dto-input-article";
import {DtoOutputDeleteArticle} from "./dtos/dto-output-delete-article";
import {DtoOutputUpdateArticle} from "../article-hub/dtos/dto-output-update-article";
import {DtoOutputFilterArticle} from "./dtos/dto-output-filter-article";
import {DtoOutputFilterEmployee} from "./dtos/dto-output-filter-employee";
import {DtoOutputEmployeeFilteringParameters} from "./dtos/dto-output-employee-filtering-parameters";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private static readonly ENTRY_POINT_USER = environment.apiUrl + "/users";
  private static readonly ENTRY_POINT_ARTICLE = environment.apiUrl + "/articles";

  constructor(private _httpClient: HttpClient) { }

  createArticle(dto: DtoOutputCreateArticle): Observable<DtoInputArticle>{
    return this._httpClient.post<DtoInputArticle>(AdminService.ENTRY_POINT_ARTICLE + "/add", dto)
  }

  fetchAllArticle(): Observable<DtoInputArticle[]>{
    return this._httpClient.get<DtoInputArticle[]>(AdminService.ENTRY_POINT_ARTICLE)
  }

  fetchFilteredArticle(dto: DtoOutputFilterArticle): Observable<DtoInputArticle[]>{
    return this._httpClient.get<DtoInputArticle[]>(`${AdminService.ENTRY_POINT_ARTICLE}/${dto.nametag}`)
  }

  deleteArticle(dto: DtoOutputDeleteArticle): Observable<any>{
    return this._httpClient.request<any>('delete', AdminService.ENTRY_POINT_ARTICLE, {body: dto})
  }

  updateArticle(dto: DtoOutputUpdateArticle): Observable<DtoInputArticle>{
    return this._httpClient.put<DtoInputArticle>(AdminService.ENTRY_POINT_ARTICLE + "/update", dto)
  }

  createEmployee(dto: DtoOutputCreateUser): Observable<DtoInputUser>{
    return this._httpClient.post<DtoInputUser>(AdminService.ENTRY_POINT_USER + "/employee", dto)
  }

  fetchEmployeePagination(dto: DtoOutputEmployeeFilteringParameters): Observable<DtoInputPaginationFiltering<DtoInputUser>>{
    return this._httpClient.get<DtoInputPaginationFiltering<DtoInputUser>>(
      `${AdminService.ENTRY_POINT_USER}/employee?nbPage=${dto.dtoPagination.nbPage}&nbElementsByPage=${dto.dtoPagination.nbElementsByPage}
      &surname=${dto.surname}&lastname=${dto.lastname}`)
  }

  deleteEmployee(dto: DtoOutputDeleteEmployee): Observable<any>{
    return this._httpClient.request<any>('delete', AdminService.ENTRY_POINT_USER, {body: dto})
  }
}
