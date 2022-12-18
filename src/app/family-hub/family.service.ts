import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputFamily} from "./dtos/dto-input-family";
import {DtoInputArticle} from "../dtos/dto-input-article";
import {DtoOutputCreateFamily} from "./dtos/dto-output-create-family";
import {DtoOutputDeleteFamily} from "./dtos/dto-output-delete-family";
import {DtoOutputRemoveFamilyArticle} from "./dtos/dto-output-remove-family-article";
import {DtoOutputUpdateFamily} from "./dtos/dto-output-update-family";
import {DtoOutputAddFamilyArticle} from "./dtos/dto-output-add-family-article";

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

  fetchFamiliesOfArticle(idArticle: number):Observable<DtoInputFamily[]>{
    return this._httpClient.get<DtoInputFamily[]>(FamilyService.ENTRY_POINT_FAMILY + `/article/${idArticle}`)
  }

  createFamily(dto: DtoOutputCreateFamily):Observable<DtoInputFamily>{
    return this._httpClient.post<DtoInputFamily>(FamilyService.ENTRY_POINT_FAMILY+"/create", dto)
  }

  deleteFamily(dto: DtoOutputDeleteFamily):Observable<any>{
    return this._httpClient.request<any>('delete', FamilyService.ENTRY_POINT_FAMILY+"/delete", {body: dto})
  }

  removeArticleFromFamily(dto: DtoOutputRemoveFamilyArticle):Observable<any>{
    return this._httpClient.request<any>('delete', FamilyService.ENTRY_POINT_FAMILY+"/removeArticle", {body: dto})
  }

  updateFamily(dto: DtoOutputUpdateFamily):Observable<any>{
    return this._httpClient.put<any>(FamilyService.ENTRY_POINT_FAMILY + "/update", dto)
  }

  addArticleInFamily(dto: DtoOutputAddFamilyArticle):Observable<DtoOutputAddFamilyArticle>{
    return this._httpClient.post<DtoOutputAddFamilyArticle>(FamilyService.ENTRY_POINT_FAMILY + "/addArticle", dto)
  }
}
