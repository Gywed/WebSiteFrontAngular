import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputFamily} from "./dtos/dto-input-family";
import {DtoInputArticle} from "../dtos/dto-input-article";
import {DtoOutputCreateFamily} from "./dtos/dto-output-create-family";
import {DtoOutputDeleteFamily} from "./dtos/dto-output-delete-family";

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  private static readonly ENTRY_POINT_FAMILY = environment.apiUrl + "/articles/families"

  constructor(private _httpClient: HttpClient) { }

  fetchAll():Observable<DtoInputFamily[]>{
    return this._httpClient.get<DtoInputFamily[]>(FamilyService.ENTRY_POINT_FAMILY)
  }

  fetchArticlesOfFamily(idFamily: number):Observable<DtoInputArticle[]>{
    return this._httpClient.get<DtoInputArticle[]>(FamilyService.ENTRY_POINT_FAMILY + `/${idFamily}`)
  }

  createFamily(dto: DtoOutputCreateFamily):Observable<DtoInputFamily>{
    return this._httpClient.post<DtoInputFamily>(FamilyService.ENTRY_POINT_FAMILY+"/create", dto)
  }

  deleteFamily(dto: DtoOutputDeleteFamily):Observable<DtoInputFamily>{
    return this._httpClient.request<any>('delete', FamilyService.ENTRY_POINT_FAMILY+"/delete", {body: dto})
  }
}
