import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputFamily} from "./dtos/dto-input-family";
import {DtoInputArticle} from "../dtos/dto-input-article";

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
}
