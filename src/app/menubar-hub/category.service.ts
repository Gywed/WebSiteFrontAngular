import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputCategory} from "./category-hub/dtos/DtoInputCategory";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private static readonly ENTRY_POINT = environment.apiUrl + "/categories";


  constructor(private _httpClient : HttpClient) { }

  fetchAllCategories():Observable<DtoInputCategory[]>{
    return this._httpClient.get<DtoInputCategory[]>(`${CategoryService.ENTRY_POINT}`);
  }

}
